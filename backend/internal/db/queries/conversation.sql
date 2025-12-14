-- name: CreateConversation :one
INSERT INTO conversations (visitor_id)
VALUES ($1)
RETURNING *;

-- name: GetConversation :one
SELECT *
FROM conversations
WHERE id = $1
LIMIT 1;

-- name: FindOpenConversation :one
SELECT *
FROM conversations
WHERE website_id = $1
  AND visitor_id = $2
  AND status = 'open'
ORDER BY created_at DESC
LIMIT 1;

-- name: ListConversationsByStatus :many
SELECT *
FROM conversations
WHERE status = $1
ORDER BY updated_at DESC;

-- name: AssignAgent :one
UPDATE conversations
SET agent_id = $2,
    updated_at = NOW()
WHERE id = $1
RETURNING *;

-- name: UpdateConversationStatus :exec
UPDATE conversations
SET status = $2,
    updated_at = NOW()
WHERE id = $1;

-- name: ListConversationsByVisitor :many
SELECT *
FROM conversations
WHERE visitor_id = $1
ORDER BY created_at DESC;

-- name: CloseConversation :exec
UPDATE conversations
SET status = 'closed',
    updated_at = NOW()
WHERE id = $1;


-- name: FindOpenConversationById :one
SELECT 1
FROM conversations
WHERE id = $1
  AND website_id=$2
  AND status = 'open'
LIMIT 1;

-- name: FindOrCreateOpenConversation :one
INSERT INTO conversations (website_id, visitor_id, status)
VALUES ($1, $2, 'open')
ON CONFLICT (website_id, visitor_id)
WHERE status = 'open'
DO UPDATE SET
  website_id = conversations.website_id
RETURNING id;
