import {z} from 'zod';

import {publicProcedure, router} from '../trpc';

export const chronicleRouter = router({
  findChronicle: publicProcedure
    .input(z.object({chronicleId: z.number().positive()}))
    .query(async ({input, ctx}) => {
      const chronicle = await ctx.prisma.chronicle.findUnique({
        where: {id: input.chronicleId},
        include: {kindred: {orderBy: {id: 'desc'}}}
      });

      if (!chronicle) {
        throw Error(`Chronicle ${input.chronicleId} not found`);
      }

      return chronicle;
    })
});
