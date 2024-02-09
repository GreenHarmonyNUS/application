import { createTRPCRouter } from "~/server/api/trpc";
import { eventRouter } from "./routers/event";
import { eventLocationRouter } from "./routers/event-location";
import { eventRegistrationsRouter } from "./routers/event-registrations";
import { metricsRouter } from "./routers/metric";
import { skillRouter } from "./routers/skill";
import { userRouter } from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  event: eventRouter,
  eventLocation: eventLocationRouter,
  eventRegistrations: eventRegistrationsRouter,
  metric: metricsRouter,
  skill: skillRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
