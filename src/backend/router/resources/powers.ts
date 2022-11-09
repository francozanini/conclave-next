import {z} from 'zod';
import {DisciplineName, PowerName} from '@prisma/client';

import {prisma} from '../../db/prisma';
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
    .query(async ({input: {disciplines}}) => {
      const disciplineNames = disciplines.map(
        discipline => discipline.disciplineName
      );
      const powers = await prisma.power.findMany({
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
    .mutation(async ({input}) => {
      const {kindredId, powerName} = input;
      const learnedPower = await prisma.learnedPower.findFirst({
        include: {basePower: true},
        where: {basePower: {name: powerName}, kindredId: kindredId}
      });

      if (learnedPower) {
        await prisma.learnedPower.delete({where: {id: learnedPower.id}});
      } else {
        await prisma.learnedPower.create({
          data: {
            basePower: {connect: {name: powerName}},
            kindred: {connect: {id: kindredId}}
          }
        });
      }
    })
});
