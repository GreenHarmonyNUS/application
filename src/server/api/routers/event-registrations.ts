import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const eventRegistrationsRouter = createTRPCRouter({
  getEventsByUser: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ input, ctx }) => {
      const { userId: participant } = input;

      if (!participant) return [];
      if (ctx.session.user.id != participant) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      return ctx.db.eventRegistrations
        .findMany({
          where: { participant },
          include: { event: { include: { location: true, tags: true } } },
        })
        .then((data) => data.map(({ event }) => event));
    }),
  isRegistered: protectedProcedure
    .input(z.object({ eventId: z.number(), userId: z.string() }))
    .query(async ({ input, ctx }) => {
      const { eventId, userId: participant } = input;

      if (!participant) return [];
      if (ctx.session.user.id != participant) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      return ctx.db.eventRegistrations
        .findUniqueOrThrow({
          where: {
            eventId_participant: { eventId, participant },
          },
        })
        .then(() => true)
        .catch(() => false);
    }),
});
