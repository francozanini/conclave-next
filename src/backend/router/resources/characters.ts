import {Skill} from '@prisma/client';
import {z} from 'zod';

import {defaultSkills} from '../../../constants/skills';
import {protectedProcedure, router} from '../trpc';

export const charactersRouter = router({
  newCharacter: protectedProcedure.mutation(async ({ctx}) => {
    const userId = ctx.session.user.id;

    return await ctx.prisma.kindred.create({
      data: {
        name: 'My Character',
        powers: {},
        disciplines: {},
        player: {connect: {id: userId}},
        clan: {connect: {id: 1}},
        skills: {createMany: {data: defaultSkills as Skill[]}}
      }
    });
  }),
  findForUser: protectedProcedure.query(
    async ({ctx}) =>
      await ctx.prisma.kindred.findMany({
        where: {playerId: ctx.session.user.id}
      })
  ),
  deleteCharacter: protectedProcedure
    .input(z.object({kindredId: z.number().positive()}))
    .mutation(async ({input, ctx}) => {
      const kindredToDelete = await ctx.prisma.kindred.findUnique({
        where: {id: input.kindredId},
        include: {player: true}
      });

      if (kindredToDelete?.player.id === ctx.session.user.id) {
        await ctx.prisma.kindred.delete({
          where: {id: kindredToDelete?.id}
        });
      }
    })
});
