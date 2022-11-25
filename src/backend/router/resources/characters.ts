import {Skill} from '@prisma/client';

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
  )
});
