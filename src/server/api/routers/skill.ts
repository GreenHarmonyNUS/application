import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { SkillSchema } from "prisma/generated/zod";

const idSchema = z.object({ id: z.number() });
const userIDSchema = z.object({ userId: z.string() });

export const skillRouter = createTRPCRouter({
  getOne: publicProcedure.input(idSchema).query(({ input, ctx }) => {
    const { id } = input;
    return ctx.db.skill.findUnique({ where: { id } });
  }),
  getByUser: publicProcedure.input(userIDSchema).query(({ input, ctx }) => {
    const { userId } = input;
    return ctx.db.skill.findMany({ where: { userId } });
  }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.skill.findMany();
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
