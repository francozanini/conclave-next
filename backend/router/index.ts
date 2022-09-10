import * as trpc from "@trpc/server";
import {z} from "zod";

import {prisma} from "../utils/prisma";

const trackable = z.object({
  id: z.number().positive(),
  name: z.enum(["hunger", "willpower", "health", "humanity"]),
  max: z.number().min(0),
  aggravatedDamage: z.number().min(0),
  superficialDamage: z.number().min(0),
});

const kindred = z.object({
  id: z.number().positive(),
  name: z.string().min(1),
  trackables: trackable.array().min(4),
});

export const appRouter = trpc
  .router()
  .query("find-kindred", {
    async resolve() {
      return await prisma.kindred.findMany({
        select: {name: true, id: true, trackables: {orderBy: [{id: "desc"}]}},
      });
    },
  })
  .mutation("save-kindred", {
    input: trackable,
    async resolve({input}) {
      const updatedTrackable = await prisma.trackable.update({
        data: input,
        where: {id: input.id},
      });

      return {success: true, kindred: updatedTrackable};
    },
  });

export type AppRouter = typeof appRouter;
