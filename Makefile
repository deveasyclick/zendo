.PHONY: dev front back db

# Start all services
dev: db back front
	@echo "All services running."

# Start Dockerized DB + Redis
db:
	docker compose up -d
	@echo "Postgres and Redis are up."

# Start backend locally with live reload
api:
	cd backend && air
	@echo "Go backend running with live reload."

lint: 
	cd backend && golangci-lint run 
	@echo "Go linting running."


# Start frontend apps
front:
	cd frontend && pnpm dev &
	@echo "Frontend apps running."
