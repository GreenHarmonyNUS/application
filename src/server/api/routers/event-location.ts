import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const eventLocationRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.eventLocation.findMany();
  }),
});
