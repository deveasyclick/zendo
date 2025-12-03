CREATE TABLE visitors (
    id TEXT PRIMARY KEY,           -- store random visitor token
    ip_address TEXT,
    user_agent TEXT,
    state TEXT,
    country TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE agents (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE conversations (
    id SERIAL PRIMARY KEY,
    visitor_id TEXT,                -- anonymous or unique id
    agent_id BIGINT,                -- assigned agent (nullable)
    status TEXT NOT NULL DEFAULT 'open', -- open/closed
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);


CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    conversation_id INT NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    
    sender_type TEXT NOT NULL,      -- 'visitor' or 'agent'
    sender_id TEXT,                 -- visitor id OR agent user id
    
    content TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
