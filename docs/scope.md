# Zendo – Staged Implementation Plan

## **Stage 0 — Foundation & Dev Ergonomics**

**Goal:** Make development fast, repeatable, and safe.

### Scope

* Repo structure (backend / widget / dashboard)
* Makefile as single entry point
* Local Postgres setup
* Goose migrations wired
* SQLC generation
* Basic config management (env-based)

### Deliverables

* `make up`, `make migrate-up`, `make reset-db`
* Goose migrations working end-to-end
* SQLC queries compiling
* Local dev can start in < 1 minute

### Exit Criteria

✅ New dev can clone repo and run the backend
✅ DB schema reproducible from migrations only

---

## **Stage 1 — Core Data Model**

**Goal:** Establish correct ownership and persistence.

### Scope

* Tables:

  * `websites`
  * `agents`
  * `visitors`
  * `conversations`
  * `messages`
* Relationships + foreign keys
* Indexes for hot paths
* SQLC queries for core reads/writes

### Deliverables

* Stable schema
* Type-safe Go access layer
* Transactions for:

  * Conversation creation
  * Message insert

### Exit Criteria

✅ Conversations + messages persist correctly
✅ No orphaned records possible

---

## **Stage 2 — Authentication & Identity**

**Goal:** Secure separation between widget, agents, and websites.

### Scope

#### Dashboard Auth

* Agent signup/login
* Password hashing
* JWT access + refresh tokens

#### Widget Identity

* Website `api_key`
* Visitor token (localStorage)
* Visitor auto-create on widget load

### Deliverables

* Auth middleware
* Website ownership checks
* Visitor bootstrap endpoint

### Exit Criteria

✅ Agents only see their website data
✅ Widget cannot spoof another website

---

## **Stage 3 — Realtime Messaging (MVP Core)**

**Goal:** Working live chat between visitor and agent.

### Scope

* Single WebSocket endpoint
* Message types:

  * `message:new`
  * `conversation:open`
  * `conversation:close`
* WS hub in Go
* Persist then broadcast pattern

### Deliverables

* Live messages
* Conversation lifecycle
* Reconnect-safe message history fetch

### Exit Criteria

✅ Messages arrive <200ms locally
✅ Refresh does not lose messages

---

## **Stage 4 — Widget MVP**

**Goal:** Lightweight, embeddable visitor experience.

### Scope

* JS snippet loader
* Widget UI
* Visitor bootstrap
* WebSocket connection
* Message rendering

### Constraints

* Minimal bundle size
* No host-site assumptions

### Deliverables

* `<script>` embed
* Functional chat UI
* LocalStorage-based visitor continuity

### Exit Criteria

✅ Widget loads <100ms
✅ Can chat without dashboard open

---

## **Stage 5 — Dashboard MVP**

**Goal:** Agents can actually do support work.

### Scope

* Login flow
* Conversations list
* Active chat view
* Conversation history
* Close conversation

### Deliverables

* Agent UI
* Realtime message updates
* REST + WS integration

### Exit Criteria

✅ Agent can handle multiple conversations
✅ UI stays in sync with backend state

---

## **Stage 6 — Collaboration Features**

**Goal:** Multi-agent support without chaos.

### Scope

* Agent invitations
* Multiple agents per website
* Presence tracking
* Typing indicators
* Conversation assignment

### Deliverables

* `agent_invites` flow
* Presence events
* Assignment logic

### Exit Criteria

✅ Agents don’t step on each other
✅ Presence feels realtime and reliable

---

## **Stage 7 — Reliability & Scaling**

**Goal:** Prepare for production traffic.

### Scope

* Redis Pub/Sub
* Stateless WebSocket servers
* Rate limiting
* Connection recovery
* Backpressure handling

### Deliverables

* Redis-backed WS fanout
* Horizontal scaling support
* Graceful reconnect logic

### Exit Criteria

✅ Multiple API instances work correctly
✅ No message duplication or loss

---

## **Stage 8 — Product Enhancements**

**Goal:** Improve usability and retention.

### Scope

* Canned responses
* Tags
* Search & filters
* Offline email notifications

### Deliverables

* Agent productivity tools
* Better conversation management

### Exit Criteria

✅ Agents handle conversations faster
✅ Product feels “complete”

---

## **Stage 9 — Hardening & Security**

**Goal:** Be production-safe.

### Scope

* Rate limits (widget + auth)
* API key rotation
* Message sanitization
* Audit fields
* Optional soft deletes

### Exit Criteria

✅ Abuse-resistant
✅ Clear security boundaries

---

## **Mental Model (Simple)**

* **Stages 0–2:** Correctness & safety
* **Stages 3–5:** Usable product
* **Stages 6–7:** Team + scale
* **Stages 8–9:** Polish & trust
