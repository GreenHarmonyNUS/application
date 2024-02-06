import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { MetricsSchema } from "prisma/generated/zod";

const idSchema = z.object({ id: z.number() });

export const metricsRouter = createTRPCRouter({
  getOne: publicProcedure.input(idSchema).query(({ input, ctx }) => {
    const { id } = input;
    return ctx.db.metrics.findUnique({ where: { id } });
  }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.metrics.findMany();
  }),
  create: protectedProcedure.input(MetricsSchema).mutation(({ input, ctx }) => {
    return ctx.db.metrics.create({
      data: MetricsSchema.parse(input),
    });
  }),
  delete: protectedProcedure.input(idSchema).mutation(({ input, ctx }) => {
    const { id } = input;
    return ctx.db.metrics.delete({ where: { id } });
  }),
});
