-- name: CreateAgent :one
INSERT INTO agents(email,clerk_id,name,invited, role)
VALUES ($1,$2,$3,$4,$5)
RETURNING *;


-- name: FindByEmail :one
SELECT *
FROM agents
WHERE email = $1
LIMIT 1;
