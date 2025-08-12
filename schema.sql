CREATE TABLE chat_history (
  id SERIAL PRIMARY KEY,
  session_id TEXT NOT NULL,
  user_message TEXT NOT NULL,
  assistant_message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE biology_content (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL
);

