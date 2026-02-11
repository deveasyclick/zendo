export type WebhookEvent =
  | "chat.started"
  | "message.received"
  | "message.read"
  | "chat.ended"
  | "agent.assigned";

export interface Webhook {
  id: string;
  url: string;
  description?: string;
  events: WebhookEvent[];
  status: "active" | "failed";
  createdAt: string;
}
