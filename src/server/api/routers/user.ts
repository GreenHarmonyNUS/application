import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { UserSchema } from "prisma/generated/zod";

const idSchema = z.object({ id: z.string() });

export const userRouter = createTRPCRouter({
  getOne: protectedProcedure.input(idSchema).query(({ input, ctx }) => {
    const { id } = input;
    return ctx.db.user.findUnique({ where: { id } });
  }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.user.findMany();
  }),
  create: publicProcedure.input(UserSchema).mutation(({ input, ctx }) => {
    return ctx.db.user.create({
      data: UserSchema.parse(input),
    });
  }),
  delete: protectedProcedure.input(idSchema).mutation(({ input, ctx }) => {
    const { id } = input;
    return ctx.db.user.delete({ where: { id } });
  }),
});
