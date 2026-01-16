-- name: CreateWebsite :one

INSERT INTO websites(name, domain, public_key, secret_hash)
values($1,$2,$3,$4)
RETURNING *;