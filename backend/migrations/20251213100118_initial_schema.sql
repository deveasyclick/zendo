-- +goose Up
-- +goose StatementBegin
SELECT 'up SQL query';
-- +goose StatementEnd
CREATE TABLE websites (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  host TEXT,
  api_key TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- created on page load once they can be identified
CREATE TABLE visitors (
    id TEXT PRIMARY KEY,           -- store random visitor token
    ip_address TEXT,
    user_agent TEXT,
    state TEXT,
    country TEXT,
    website_id INT NULL REFERENCES websites(id),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE agents (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    website_id INT NULL REFERENCES websites(id),
    role TEXT NOT NULL DEFAULT 'agent',          --
    invited BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- agent_invites (for owner inviting in-house agents)
CREATE TABLE agent_invites (
  id SERIAL PRIMARY KEY,
  website_id INT NOT NULL REFERENCES websites(id),
  email TEXT NOT NULL,
  invited_by INT NOT NULL REFERENCES agents(id),
  token TEXT NOT NULL UNIQUE,
  accepted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE conversations (
    id SERIAL PRIMARY KEY,
    visitor_id TEXT,                -- anonymous or unique id
    agent_id BIGINT,                -- assigned agent (nullable)
    status TEXT NOT NULL DEFAULT 'open', -- open/closed
    website_id INT NULL REFERENCES websites(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);


CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    conversation_id INT NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    sender_type TEXT NOT NULL,      -- 'visitor' or 'agent'
    sender_id TEXT,                 -- visitor id OR agent user id
    content TEXT NOT NULL,
    website_id INT NULL REFERENCES websites(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);


-- +goose Down
-- +goose StatementBegin
SELECT 'down SQL query';
-- +goose StatementEnd
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS conversations;
DROP TABLE IF EXISTS visitors;
DROP TABLE IF EXISTS agent_invites;
DROP TABLE IF EXISTS agents;
DROP TABLE IF EXISTS websites;