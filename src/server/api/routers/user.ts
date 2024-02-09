import { createTRPCRouter, publicProcedure } from "../trpc";
import { UserSchema } from "prisma/generated/zod";

export const userRouter = createTRPCRouter({
  create: publicProcedure.input(UserSchema).mutation(({ input, ctx }) => {
    return ctx.db.user.create({
      data: UserSchema.parse(input),
    });
  }),
});
