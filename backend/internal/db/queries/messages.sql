-- name: CreateMessage :one
INSERT INTO messages (conversation_id, sender_type, sender_id, content)
VALUES ($1, $2, $3, $4)
RETURNING *;

-- name: ListMessage :one
SELECT *
FROM messages
WHERE id = $1;

-- name: ListMessagesByConversation :many
SELECT *
FROM messages
WHERE conversation_id = $1
ORDER BY created_at ASC;

-- name: DeleteMessage :exec
DELETE FROM messages
WHERE id = $1;

-- name: CountMessages :one
SELECT COUNT(*)
FROM messages
WHERE conversation_id = $1;
