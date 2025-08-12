CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE IF NOT EXISTS content_chunks (
  id SERIAL PRIMARY KEY,
  standard TEXT,
  topic TEXT,
  chunk TEXT NOT NULL,
  embedding vector(1536)
);

CREATE INDEX IF NOT EXISTS content_chunks_embedding_idx
ON content_chunks USING ivfflat (embedding vector_l2_ops) WITH (lists = 100);

CREATE TABLE IF NOT EXISTS chat_history (
  id SERIAL PRIMARY KEY,
  session_id TEXT NOT NULL,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
