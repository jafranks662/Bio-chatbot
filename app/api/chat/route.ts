import { openai } from "@ai-sdk/openai";
import { streamText, embed } from "ai";
import { neon } from "@neondatabase/serverless";
import { env } from "@/lib/env";
import { toSql } from "pgvector";

export const runtime = "nodejs";

const sql = neon(env.DATABASE_URL);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("sessionId");

  if (!sessionId) {
    return new Response("Missing sessionId", { status: 400 });
  }

  try {
    const rows = await sql`
      SELECT role, content, created_at
      FROM chat_history
      WHERE session_id = ${sessionId}
      ORDER BY created_at ASC
    `;
    return Response.json(rows);
  } catch (error) {
    console.error("Error fetching history:", error);
    return new Response("Error fetching history", { status: 500 });
  }
}

export async function POST(req: Request) {
  const { messages, sessionId, mode } = await req.json();

  if (!env.OPENAI_API_KEY || !env.DATABASE_URL) {
    return new Response("Missing environment variables", { status: 400 });
  }

  const lastMessage = messages[messages.length - 1];

  const embedding = await embed({
    model: openai.embedding("text-embedding-3-small"),
    input: lastMessage.content,
  });

  const contextRows = await sql`
    SELECT standard, topic, chunk
    FROM content_chunks
    ORDER BY embedding <-> ${toSql(embedding)}::vector
    LIMIT 5
  `;

  const context = contextRows.map((r: any) => r.chunk).join("\n");

  if (!context) {
    return new Response("I don't know.");
  }

  const result = await streamText({
    model: openai("gpt-4-turbo"),
    system: `ROLE: Mississippi Biology Tutor (Grades 9-10; MAAP 2018)

SCOPE
- Use **only** the biology content provided from the database query results.
- If no relevant content is returned, reply: "I don't know."

WORKFLOW
When the user types a topic or standard:
1. The app searches the Neon database for the most relevant content.
2. The matched text is passed to the tutor.
3. Strip formatting to plain text.
4. Chunk by substandard (< =600 tokens per chunk).

MODES

Study mode (default) ->
- Present the first chunk.
- End with a comprehension-check question.
- Wait for the user's reply before sending the next chunk.
- At the end, include a concise summary box of the key points.

Quiz me ->
- Generate one multiple-choice question from the next chunk.
- After the user answers, reveal correct/incorrect with a one-sentence rationale.
- Continue until all chunk questions are complete.
- At the end of the quiz, report:
1. Total questions
2. Correct answers
3. Percentage score
4. Letter grade (A-F scale)
5. List of missed questions with correct answers and brief explanations

Switch modes when the user types "quiz me" or "study mode".`,
    messages: [
      ...messages,
      { role: "system", content: `MODE:${mode}` },
      { role: "system", content: `CONTEXT:\n${context}` },
    ],
    onFinish: async (completion) => {
      if (!sessionId) return;
      try {
        await sql`
          INSERT INTO chat_history (session_id, role, content) VALUES
          (${sessionId}, 'user', ${lastMessage.content}),
          (${sessionId}, 'assistant', ${completion})
        `;
      } catch (error) {
        console.error("Error saving to database:", error);
      }
    },
  });

  return result.toDataStreamResponse();
}
