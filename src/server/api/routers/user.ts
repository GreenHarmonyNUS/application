import { createTRPCRouter, publicProcedure } from "../trpc";
import { UserCreateInputSchema } from "prisma/generated/zod";

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(UserCreateInputSchema)
    .mutation(({ input, ctx }) => {
      return ctx.db.user.create({
        data: UserCreateInputSchema.parse(input),
      });
    }),
});
