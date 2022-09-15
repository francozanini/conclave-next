import { ClanName } from "@prisma/client";
import * as trpc from "@trpc/server";
import { z } from "zod";
import { prisma } from "../utils/prisma";


export const appRouter = trpc
  .router()
  .query("find-chronicle", {
    input: z.object({
      chronicleId: z.number().positive(),
    }),
    resolve: async ({input}) => {
      const chronicle = prisma.chronicle.findUnique({
        where: {id: input.chronicleId},
        include: {kindred: {orderBy: {id: "desc"}}},
      });

      if (!chronicle) {
        throw Error(`Chronicle ${input.chronicleId} not found`);
      }

      return await chronicle;
    },
  })
  .query("find-kindred", {
    input: z.object({
      kindredId: z.number().positive(),
    }),
    resolve: async ({input}) => {
      const retrievedKindred = await prisma.kindred.findUnique({
        where: {id: input.kindredId},
        include: {clan: true},
      });

      if (!retrievedKindred) {
        throw Error(`kindred ${input.kindredId} not found`);
      }

      return retrievedKindred;
    },
  })
  .mutation("update-kindred-details", {
    input: z.object({
      kindredId: z.number().positive(),
      ambition: z.string().optional(),
      name: z.string().optional(),
      desire: z.string().optional(),
    }),
    resolve: async ({input}) => {
      const result = await prisma.kindred.update({
        where: {id: input.kindredId},
        data: {
          name: input.name || undefined,
          ambition: input.ambition || undefined,
          desire: input.desire || undefined,
        },
      });

      return result;
    },
  })
  .mutation("pick-clan", {
    input: z.object({
      kindredId: z.number().positive(),
      chosenClan: z.nativeEnum(ClanName),
    }),
    resolve: async ({input}) => {
      await prisma.kindred.update({
        where: {id: input.kindredId},
        data: {
          clan: {connect: {name: input.chosenClan}},
        },
      });
    },
  });

export type AppRouter = typeof appRouter;
