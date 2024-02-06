import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { EventSchema } from "prisma/generated/zod";
import type { Event } from "prisma/generated/zod";

const idSchema = z.object({ id: z.number() });

export const eventRouter = createTRPCRouter({
  getOne: publicProcedure.input(idSchema).query(({ input, ctx }) => {
    const { id } = input;
    return ctx.db.event.findUnique({ where: { id } });
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
  create: protectedProcedure.input(EventSchema).mutation(({ input, ctx }) => {
    return ctx.db.event.create({
      data: EventSchema.parse(input),
    });
  }),
  delete: protectedProcedure.input(idSchema).mutation(({ input, ctx }) => {
    const { id } = input;
    // verify user role
    return ctx.db.event.delete({ where: { id } });
  }),
});
