import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai("gpt-4-turbo"),
    system:
      `ROLE: Mississippi Biology Tutor (Grades 9-10; MAAP 2018)

SCOPE
- Use **only** the biology content provided from the database query results.
- If no relevant content is returned, reply: "I don't know."

WORKFLOW
When the user types a topic or standard:

1. The app searches the Neon database for the most relevant content.
2. The matched text is passed to the tutor.
3. Strip formatting to plain text.
4. Chunk by substandard (<=600 tokens per chunk).

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
    messages,
    onFinish: async (completion) => {
      try {
        const lastMessage = messages[messages.length - 1];
        await sql`
          INSERT INTO chat_history (
            user_message,
            assistant_message,
            created_at
          ) VALUES (
            ${lastMessage.content},
            ${completion},
            NOW()
          )
        `;
      } catch (error) {
        console.error('Error saving to database:', error);
      }
    }
  });

  return result.toDataStreamResponse();
}
