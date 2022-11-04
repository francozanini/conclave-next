import {z} from 'zod';

import {prisma} from '../../db/prisma';
import {publicProcedure, router} from '../trpc';

export const chronicleRouter = router({
  findChronicle: publicProcedure
    .input(z.object({chronicleId: z.number().positive()}))
    .query(async ({input}) => {
      const chronicle = prisma.chronicle.findUnique({
        where: {id: input.chronicleId},
        include: {kindred: {orderBy: {id: 'desc'}}},
      });

      if (!chronicle) {
        throw Error(`Chronicle ${input.chronicleId} not found`);
      }

      return await chronicle;
    }),
});
