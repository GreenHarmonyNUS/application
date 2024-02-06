import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { EventTagSchema } from "prisma/generated/zod";

const idSchema = z.object({ id: z.number(), name: z.string() });

export const eventTagRouter = createTRPCRouter({
  getOne: publicProcedure.input(idSchema).query(({ input, ctx }) => {
    const { id: eventId, name } = input;
    return ctx.db.eventTag.findUnique({
      where: { eventId_name: { eventId, name } },
    });
  }),
  getByEvent: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input, ctx }) => {
      const { id } = input;
      return ctx.db.eventTag.findMany({ where: { eventId: id } });
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.eventTag.findMany();
  }),
  create: protectedProcedure
    .input(EventTagSchema)
    .mutation(({ input, ctx }) => {
      return ctx.db.eventTag.create({
        data: EventTagSchema.parse(input),
      });
    }),
  delete: protectedProcedure.input(idSchema).mutation(({ input, ctx }) => {
    const { id: eventId, name } = input;
    return ctx.db.eventTag.delete({
      where: { eventId_name: { eventId, name } },
    });
  }),
});
