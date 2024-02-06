import type { Event, EventLocation, EventTag } from "prisma/generated/zod";

export interface EventResponse extends Event {
  location: EventLocation;
  tags: EventTag[];
}
