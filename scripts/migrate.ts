import { neon } from '@neondatabase/serverless';
import fs from 'fs';

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error('DATABASE_URL is not set');
  process.exit(1);
}

const sql = neon(databaseUrl);

async function migrate() {
  const schema = fs.readFileSync('schema.sql', 'utf8');
  await sql(schema);
  console.log('Migration complete');
}

migrate().catch((err) => {
  console.error('Migration failed', err);
  process.exit(1);
});
