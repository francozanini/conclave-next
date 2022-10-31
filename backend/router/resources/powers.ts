import {z} from 'zod';
import {DisciplineName, PowerName} from '@prisma/client';

import {createRouter} from '../context';
import {prisma} from '../../db/prisma';

export const powersRouter = createRouter()
  .query('learnable-powers', {
    input: z.object({
      disciplines: z.array(
        z.object({
          disciplineName: z.nativeEnum(DisciplineName),
          lvl: z.number().nonnegative(),
        })
      ),
    }),
    resolve: async ({input: {disciplines}}) => {
      const disciplineNames = disciplines.map(
        (discipline) => discipline.disciplineName
      );
      const powers = await prisma.power.findMany({
        where: {discipline: {name: {in: disciplineNames}}},
        include: {discipline: true},
      });

      return powers.filter(
        (power) =>
          power.level <=
          (disciplines.find(
            (discipline) => discipline.disciplineName === power.discipline.name
          )?.lvl ?? 0)
      );
    },
  })
  .mutation('learnOrUnlearn', {
    input: z.object({
      kindredId: z.number().positive(),
      powerName: z.nativeEnum(PowerName),
    }),
    resolve: async ({input}) => {
      const {kindredId, powerName} = input;
      const learnedPower = await prisma.learnedPower.findFirst({
        include: {basePower: true},
        where: {basePower: {name: powerName}, kindredId: kindredId},
      });

      if (learnedPower) {
        await prisma.learnedPower.delete({where: {id: learnedPower.id}});
      } else {
        await prisma.learnedPower.create({
          data: {
            basePower: {connect: {name: powerName}},
            kindred: {connect: {id: kindredId}},
          },
        });
      }
    },
  });
