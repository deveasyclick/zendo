# Zendo — Schema & System Model

Zendo is a chat support system designed around a small set of core entities that work together to support real-time communication between website visitors and support agents.

At a high level:

> **Websites own visitors.
> Visitors participate in conversations.
> Conversations group messages.
> Agents respond within conversations.**

---

## 1. Website (Top-Level Scope)

A **Website** represents a customer’s web property where the Zendo chat widget is installed.

### Website Schema

| Field       | Type     | Description               |
| ----------- | -------- | ------------------------- |
| `id`        | integer  | Unique website identifier |
| `name`      | string   | Website name              |
| `domain`    | string   | Website domain            |
| `createdAt` | datetime | Creation timestamp        |

### Role in the System

* Websites are the **top-level boundary**
* Every visitor, conversation, and message belongs to exactly one website
* No data crosses website boundaries

---

## 2. Visitor (End User)

A **Visitor** represents an end user browsing a website and interacting with chat.

### Visitor Schema

| Field       | Type     | Description               |
| ----------- | -------- | ------------------------- |
| `id`        | string   | Unique visitor identifier |
| `websiteId` | integer  | Owning website            |
| `createdAt` | datetime | First seen timestamp      |

### How Visitors Fit In

* Visitors are created the first time the chat widget is loaded
* Visitors may exist without conversations
* A visitor can have **multiple conversations over time**, but only one open at a time
* Visitors are scoped to a single website

---

## 3. Agent (Support Staff)

An **Agent** represents a support person responding to visitors.

### Agent Schema

| Field       | Type     | Description        |
| ----------- | -------- | ------------------ |
| `id`        | string   | Agent identifier   |
| `name`      | string   | Display name       |
| `email`     | string   | Contact email      |
| `createdAt` | datetime | Creation timestamp |

### How Agents Fit In

* Agents do not create conversations
* Agents are **assigned** to existing conversations
* Agents send messages within conversations

---

## 4. Conversation (Interaction Container)

A **Conversation** groups messages into a single support interaction.

### Conversation Schema

| Field       | Type            | Description      |
| ----------- | --------------- | ---------------- |
| `id`        | integer         | Conversation ID  |
| `websiteId` | integer         | Website context  |
| `visitorId` | string          | Visitor          |
| `agentId`   | string | null   | Assigned agent   |
| `status`    | enum            | `open`, `closed` |
| `createdAt` | datetime        | Start time       |
| `closedAt`  | datetime | null | Close time       |

### How Conversations Fit In

* Conversations are **visitor-centric**
* They are usually created **implicitly**
* Only one open conversation per visitor per website
* Conversations control whether messages can be added

A conversation exists to answer one question or resolve one issue.

---

## 5. Message (Primary Domain Entity)

A **Message** is the smallest and most important unit in Zendo.

### Message Schema

| Field            | Type          | Description               |
| ---------------- | ------------- | ------------------------- |
| `id`             | integer       | Message ID                |
| `conversationId` | integer       | Parent conversation       |
| `websiteId`      | integer       | Website                   |
| `senderType`     | enum          | `visitor`, `agent`, `bot` |
| `senderId`       | string | null | Sender identity           |
| `content`        | string        | Message text              |
| `createdAt`      | datetime      | Timestamp                 |

### How Messages Fit In

* Messages **always belong to a conversation**
* Messages drive conversation creation
* Messages are immutable
* Messages cannot exist outside conversations

---

## 6. CreateMessageDTO (API Boundary)

This schema defines how clients create messages.

### CreateMessageDTO

| Field            | Type    | Required    | Description                      |
| ---------------- | ------- | ----------- | -------------------------------- |
| `content`        | string  | yes         | Message body                     |
| `websiteId`      | integer | yes         | Website context                  |
| `senderType`     | enum    | yes         | `visitor`, `agent`, `bot`        |
| `visitorId`      | string  | conditional | Required if senderType = visitor |
| `agentId`        | string  | conditional | Required if senderType = agent   |
| `conversationId` | integer | no          | Existing conversation            |

### Purpose

* Decouples API input from database schema
* Allows conversations to be created implicitly
* Enforces sender identity rules

---

## 7. How Everything Fits Together

### Ownership Hierarchy

```
Website
 ├── Visitors
 │     └── Conversations
 │            └── Messages
 └── Agents
```

* Websites own everything
* Visitors participate in conversations
* Conversations group messages
* Agents interact within conversations

---

## 8. Lifecycle Relationships

### Visitor → Conversation

* A visitor may have many conversations
* Only one conversation can be open at a time
* Conversations are created when messages are sent

### Conversation → Message

* Every message belongs to exactly one conversation
* Messages cannot be added to closed conversations
* Deleting a conversation implies deleting its messages

### Agent → Conversation

* Agents are assigned to conversations
* Assignment does not affect message flow
* One agent may handle many conversations

---

## 9. System Invariants (Always True)

* Every message has a websiteId
* Every conversation belongs to one visitor
* No message exists without a conversation
* No message can be added to a closed conversation
* Sender identity matches sender type

These rules ensure data integrity.

---

## 10. Conceptual Model Summary

Zendo follows a **message-first model**:

> Messages cause conversations to exist.
> Conversations give messages context.
> Visitors initiate conversations.
> Agents resolve them.

This keeps the system simple, predictable, and easy to scale.
