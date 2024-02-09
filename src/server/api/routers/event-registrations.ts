import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { EventRegistrationsSchema } from "prisma/generated/zod";

const idSchema = z.object({ eventId: z.number(), participant: z.string() });

export const eventRegistrationsRouter = createTRPCRouter({
  getOne: protectedProcedure.input(idSchema).query(({ input, ctx }) => {
    const { eventId, participant } = input;
    return ctx.db.eventRegistrations.findUnique({
      where: { eventId_participant: { eventId, participant } },
    });
  }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.eventRegistrations.findMany();
  }),
  getEventsByUser: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ input, ctx }) => {
      const { userId: participant } = input;
      if (!participant) return [];
      return ctx.db.eventRegistrations
        .findMany({
          where: { participant },
          include: { event: { include: { location: true, tags: true } } },
        })
        .then((data) => data.map(({ event }) => event));
    }),
  create: protectedProcedure
    .input(EventRegistrationsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.db.eventRegistrations.create({
        data: EventRegistrationsSchema.parse(input),
      });
    }),
  delete: protectedProcedure.input(idSchema).mutation(({ input, ctx }) => {
    const { eventId, participant } = input;
    return ctx.db.eventRegistrations.delete({
      where: { eventId_participant: { eventId, participant } },
    });
  }),
});
