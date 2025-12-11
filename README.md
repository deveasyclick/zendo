# Zendo

**A modern, realtime live chat support platform built with Next.js (frontend) and Go (backend).**

This platform allows businesses to embed a lightweight chat widget on their websites and respond to visitors instantly via a dashboard. It is designed for speed, scalability, and ease of development.

---

## Features

* Realtime messaging between website visitors and agents
* Lightweight, embeddable widget
* Agent dashboard with conversation history
* Presence indicators and typing status
* Multi-agent support
* Conversation persistence with PostgreSQL
* Database migrations with Goose
* Automatic migrations in development
* Scalable architecture (Redis Pub/Sub ready)
* Hot-reload development setup

---

## Tech Stack

| Layer       | Technology                                                 |
| ----------- | ---------------------------------------------------------- |
| Frontend    | Next.js, React, TypeScript, Tailwind CSS                   |
| Backend     | Go, Gorilla WebSocket, PostgreSQL, Goose (migrations)      |
| Dev tooling | Makefile, PNPM workspace, Air (Go hot reload), SQLC, Goose |

---

## Folder Structure

```bash
/zendo
  /frontend
    /apps
      /dashboard   # Agent dashboard
      /widget      # JS snippet for embedding
    /packages
      /ui          # Shared UI components
      /types       # Shared TypeScript types
      /utils       # Utility functions
    package.json
    pnpm-workspace.yaml

  /backend
    /cmd/api
    /internal
    /migrations  # Goose migrations
    /pkg
    .tool-versions
    go.mod

Makefile
```

---

## Getting Started

### Prerequisites

* Node.js >= 22
* PNPM >= 10
* Go >= 1.25
* PostgreSQL

---

### Installation

Clone the repository:

```bash
git clone https://github.com/deveasyclick/zendo.git
cd zendo
```

Install frontend dependencies:

```bash
cd frontend
pnpm install
```

Install backend dependencies:

```bash
cd ../backend
go mod download
```

Install developer tools (SQLC, Goose, Air):

```bash
make tools
```

---

### Development

Start both frontend and backend concurrently using the Makefile:

```bash
make dev
```

This will:

* Start PostgreSQL and Redis via Docker
* Run the Go backend with hot reload
* Apply pending migrations automatically (in non-production)
* Run the Next.js dashboard and widget in dev mode

Open your browser at:

* Dashboard: `http://localhost:3000`
* Widget: served locally for testing (`http://localhost:3001` or embed snippet)

---

### Running Frontend or Backend Separately

**Frontend only:**

```bash
cd frontend
pnpm dev
```

**Backend only:**

```bash
cd backend
make api
```

> `air` is used for Go hot-reload.

---

## Database Migrations

We use [Goose](https://github.com/pressly/goose) for managing SQL migrations.

**Apply migrations:**

```bash
make migrate-up
```

**Rollback last migration:**

```bash
make migrate-down
```

**Check migration status:**

```bash
make migrate-status
```

**Create a new migration:**

```bash
make migrate-new
```

Migrations are located in `/backend/migrations`.

---

## Linting

Run Golang lint checks:

```bash
make lint
```

---

### Swagger Documentation

We use [Swag](https://github.com/swaggo/swag) to generate API documentation.

**Generate Swagger docs:**

```bash
make swagger
```

This will generate:

* `docs/docs.go` – Go code for Swagger
* `docs/swagger.json` – Swagger JSON file
* `docs/swagger.yaml` – Swagger YAML file

---

## Environment Variables

Create `.env` files in the respective folders:

**Frontend (.env.local)**

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

**Backend (.env)**

```env
PORT=8080
DB_URL=postgres://postgres:password@localhost:5432/zendo?sslmode=disable
REDIS_URL=redis://localhost:6379
ENV=development
```

---

## Roadmap

* [x] Realtime messaging
* [x] Dashboard + widget

---

## Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "Add feature"`
4. Push: `git push origin feature/my-feature`
5. Open a Pull Request

---

## License

MIT License © 2025 [Yusuf ADeniyi]

---

## Contact

For questions or support, contact: [ydeniyi@gmail.com](mailto:ydeniyi@gmail.com)