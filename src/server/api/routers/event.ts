import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { EventCreateInputSchema } from "prisma/generated/zod";
import OpenAI from "openai";

const idSchema = z.object({ id: z.number() });
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
  getSuggested: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input, ctx }) => {
      const { userId } = input;
      if (!userId) return [];
      const registeredEvents = await ctx.db.eventRegistrations.findMany({
        where: { participant: userId },
        select: { eventId: true },
      });
      return ctx.db.event.findMany({
        where: {
          NOT: {
            eventLocationId: {
              in: registeredEvents.map(({ eventId }) => eventId),
            },
          },
        },
        include: { location: true, tags: true },
      });
    }),
  create: protectedProcedure
    .input(EventCreateInputSchema)
    .mutation(async ({ input, ctx }) => {
      await ctx.db.$connect();
      const createdEvent = await ctx.db.event.create({
        data: EventCreateInputSchema.parse(input),
      });
      const { id: eventId } = createdEvent;
      const { name: eventName, details: eventDetails } = input;
      const hashtags = await openai.chat.completions
        .create({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: `Generate 3 unique tags related to the following event:\nTitle: ${eventName}\nDetails: ${eventDetails}.\nReturn the data without # and in a JSON array with \"hashtags\" as the key.`,
            },
          ],
          temperature: 1,
          max_tokens: 256,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        })
        .then(({ choices }) => choices)
        .then((choices) => {
          if (!choices || choices.length === 0) throw new Error();
          const { content } = choices[0]?.message ?? {
            content: "",
          };
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          return JSON.parse(content!).hashtags as Array<string>;
        })
        .catch((err) => {
          console.error(err);
          return ["#volunteering", "#environment", "#together"];
        });
      await ctx.db.eventTag.createMany({
        data: hashtags.map((name) => ({ name, eventId })),
      });
    }),
  delete: protectedProcedure.input(idSchema).mutation(({ input, ctx }) => {
    const { id } = input;
    // verify user role
    return ctx.db.event.delete({ where: { id } });
  }),
});
