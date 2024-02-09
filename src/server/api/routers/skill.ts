import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { SkillSchema } from "prisma/generated/zod";
import { TRPCError } from "@trpc/server";

const idSchema = z.object({ id: z.number() });
const userIDSchema = z.object({ userId: z.string() });

export const skillRouter = createTRPCRouter({
  getByUser: protectedProcedure.input(userIDSchema).query(({ input, ctx }) => {
    const { userId } = input;
    if (ctx.session.user.id !== userId) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return ctx.db.skill.findMany({ where: { userId } });
  }),
  create: protectedProcedure.input(SkillSchema).mutation(({ input, ctx }) => {
    return ctx.db.skill.create({
      data: SkillSchema.parse(input),
    });
  }),
  delete: protectedProcedure.input(idSchema).mutation(({ input, ctx }) => {
    const { id } = input;
    return ctx.db.skill.delete({ where: { id } });
  }),
});
