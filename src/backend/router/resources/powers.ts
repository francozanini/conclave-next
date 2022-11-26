import {z} from 'zod';
import {DisciplineName, PowerName} from '@prisma/client';

import {publicProcedure, router} from '../trpc';

export const powersRouter = router({
  learnablePowers: publicProcedure
    .input(
      z.object({
        disciplines: z.array(
          z.object({
            disciplineName: z.nativeEnum(DisciplineName),
            lvl: z.number().nonnegative()
          })
        )
      })
    )
    .query(async ({input: {disciplines}, ctx}) => {
      const disciplineNames = disciplines.map(
        discipline => discipline.disciplineName
      );
      const powers = await ctx.prisma.power.findMany({
        where: {discipline: {name: {in: disciplineNames}}},
        include: {discipline: true}
      });

      return powers
        .filter(
          power =>
            power.level <=
            (disciplines.find(
              discipline => discipline.disciplineName === power.discipline.name
            )?.lvl ?? 0)
        )
        .sort((p1, p2) => p1.level - p2.level);
    }),
  learnOrUnlearn: publicProcedure
    .input(
      z.object({
        kindredId: z.number().positive(),
        powerName: z.nativeEnum(PowerName)
      })
    )
    .mutation(async ({input, ctx}) => {
      const {kindredId, powerName} = input;
      const learnedPower = await ctx.prisma.learnedPower.findFirst({
        include: {basePower: true},
        where: {basePower: {name: powerName}, kindredId: kindredId}
      });

      if (learnedPower) {
        await ctx.prisma.learnedPower.delete({where: {id: learnedPower.id}});
      } else {
        await ctx.prisma.learnedPower.create({
          data: {
            basePower: {connect: {name: powerName}},
            kindred: {connect: {id: kindredId}}
          }
        });
      }
    })
});
