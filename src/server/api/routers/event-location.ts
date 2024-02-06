import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { EventLocationSchema } from "prisma/generated/zod";

const idSchema = z.object({ id: z.number() });

export const eventLocationRouter = createTRPCRouter({
  getOne: publicProcedure.input(idSchema).query(({ input, ctx }) => {
    const { id } = input;
    return ctx.db.eventLocation.findUnique({ where: { id } });
  }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.eventLocation.findMany();
  }),
  create: publicProcedure
    .input(EventLocationSchema)
    .mutation(({ input, ctx }) => {
      return ctx.db.eventLocation.create({
        data: EventLocationSchema.parse(input),
      });
    }),
  delete: protectedProcedure.input(idSchema).mutation(({ input, ctx }) => {
    const { id } = input;
    return ctx.db.eventLocation.delete({ where: { id } });
  }),
});
