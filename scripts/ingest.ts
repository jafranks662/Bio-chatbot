import { neon } from '@neondatabase/serverless';
import { embed } from 'ai';
import { openai } from '@ai-sdk/openai';
import { toSql } from 'pgvector';
import fs from 'fs';

const databaseUrl = process.env.DATABASE_URL;
const apiKey = process.env.OPENAI_API_KEY;
if (!databaseUrl || !apiKey) {
  console.error('Missing env variables');
  process.exit(1);
}

const sql = neon(databaseUrl);

interface Chunk {
  standard: string;
  topic: string;
  chunk: string;
}

async function ingest() {
  const file = fs.readFileSync('data/content.json', 'utf8');
  const items: Chunk[] = JSON.parse(file);
  for (const item of items) {
    const { embedding } = await embed({
      model: openai.embedding('text-embedding-3-small'),
      value: item.chunk,
    });
    await sql`INSERT INTO content_chunks (standard, topic, chunk, embedding) VALUES (
      ${item.standard}, ${item.topic}, ${item.chunk}, ${toSql(embedding)}
    )`;
  }
  console.log(`Ingested ${items.length} records`);
}

ingest().catch((err) => {
  console.error('Ingest failed', err);
  process.exit(1);
});
