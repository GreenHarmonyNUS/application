import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { UserCreateInputSchema } from "prisma/generated/zod";

export const userRouter = createTRPCRouter({
  isRegistered: publicProcedure.input(z.string()).query(({ input, ctx }) => {
    if (!input) return false;
    return ctx.db.user
      .findUniqueOrThrow({ where: { email: input } })
      .then(() => true)
      .catch(() => false);
  }),
  create: publicProcedure
    .input(UserCreateInputSchema)
    .mutation(({ input, ctx }) => {
      return ctx.db.user.create({
        data: UserCreateInputSchema.parse(input),
      });
    }),
});
