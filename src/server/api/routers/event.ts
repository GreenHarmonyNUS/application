import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { EventCreateInputSchema } from "prisma/generated/zod";

const idSchema = z.object({ id: z.number() });

export const eventRouter = createTRPCRouter({
  getOne: publicProcedure.input(idSchema).query(({ input, ctx }) => {
    const { id } = input;
    return ctx.db.event.findUnique({
      where: { id },
      include: {
        location: true,
        tags: true,
      },
    });
  }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    const events = await ctx.db.event.findMany({
      include: {
        location: true,
        tags: true,
      },
    });
    return events;
  }),
  getApproved: publicProcedure.query(({ ctx }) => {
    return ctx.db.event.findMany({
      where: { approvalStatus: "APPROVED" },
      include: {
        location: true,
        tags: true,
      },
    });
  }),
  getCancelled: protectedProcedure.query(({ ctx }) => {
    return ctx.db.event.findMany({
      where: { approvalStatus: "CANCELLED" },
      include: {
        location: true,
        tags: true,
      },
    });
  }),
  getPending: publicProcedure.query(({ ctx }) => {
    return ctx.db.event.findMany({
      where: { approvalStatus: "PENDING" },
      include: {
        location: true,
        tags: true,
      },
    });
  }),
  create: protectedProcedure
    .input(EventCreateInputSchema)
    .mutation(async ({ input, ctx }) => {
      await ctx.db.$connect();
      return ctx.db.event.create({
        data: EventCreateInputSchema.parse(input),
      });
    }),
  delete: protectedProcedure.input(idSchema).mutation(({ input, ctx }) => {
    const { id } = input;
    // verify user role
    return ctx.db.event.delete({ where: { id } });
  }),
});
