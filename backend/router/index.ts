import * as trpc from "@trpc/server";
import {z} from "zod";

import {prisma} from "../utils/prisma";

export const appRouter = trpc
  .router()
  .query("find-chronicle", {
    input: z.object({
      chronicleId: z.number().positive(),
    }),
    async resolve({input}) {
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
    async resolve({input}) {
      const retrievedKindred = await prisma.kindred.findUnique({
        where: {id: input.kindredId},
      });

      if (!retrievedKindred) {
        throw Error(`kindred ${input.kindredId} not found`);
      }

      return retrievedKindred;
    },
  });

export type AppRouter = typeof appRouter;
