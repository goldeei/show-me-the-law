import { Redis } from "ioredis";
import { env } from "./env.js";

// required by BullMQ's blocking connections — without this, ioredis gives
// up retrying a blocked command before BullMQ's own retry/backoff logic
// ever gets a chance to run
export const connection = new Redis(env.REDIS_URL, {
  maxRetriesPerRequest: null,
});

connection.on("connect", () => {
  console.log("worker: connected to Redis/Valkey");
});

// No queues registered yet. The first real one goes here:
// - summary:{entityType}:{entityId}:{sourceHash} — 03-base-2-eli5-summaries.md §5
// - pending-bills discovery/refresh — 04-base-3-pending-bills.md §7
