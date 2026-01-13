-- name: CreateVisitor :one
INSERT INTO visitors (ip_address, state, country, website_id, user_agent)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;

-- name: GetVisitor :one
SELECT *
FROM visitors
WHERE id = $1;


