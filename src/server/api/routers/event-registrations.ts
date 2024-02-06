import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { EventRegistrationsSchema } from "prisma/generated/zod";

const idSchema = z.object({ eventId: z.number(), participant: z.string() });

export const eventRegistrationsRouter = createTRPCRouter({
  getOne: publicProcedure.input(idSchema).query(({ input, ctx }) => {
    const { eventId, participant } = input;
    return ctx.db.eventRegistrations.findUnique({
      where: { eventId_participant: { eventId, participant } },
    });
  }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.eventRegistrations.findMany();
  }),
  create: publicProcedure
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
