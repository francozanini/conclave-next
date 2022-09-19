import * as trpc from "@trpc/server";
import {z} from "zod";

import {prisma} from "../../db/prisma";

export const chronicleRouter = trpc.router().query("find-chronicle", {
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
});
