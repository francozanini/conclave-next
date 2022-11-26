import {z} from 'zod';
import {
  Clan,
  ClanName,
  Discipline,
  KnownDiscipline,
  SkillName
} from '@prisma/client';

import {AttributeName} from '../../../types/AttributeName';
import {protectedProcedure, router} from '../trpc';

export const kindredRouter = router({
  findById: protectedProcedure
    .input(z.object({kindredId: z.number().positive()}))
    .query(async ({input, ctx}) => {
      const retrievedKindred = await ctx.prisma.kindred.findUnique({
        where: {id: input.kindredId},
        include: {
          clan: true,
          skills: true,
          disciplines: {include: {baseDiscipline: true}},
          powers: {include: {basePower: {include: {discipline: true}}}}
        }
      });

      if (!retrievedKindred) {
        throw Error(`kindred ${input.kindredId} not found`);
      }

      return retrievedKindred;
    }),
  pickClan: protectedProcedure
    .input(
      z.object({
        kindredId: z.number().positive(),
        chosenClanName: z.nativeEnum(ClanName)
      })
    )
    .mutation(async ({input, ctx}) => {
      const {chosenClanName, kindredId} = input;
      const chosenClan: Clan & {disciplines: Discipline[]} =
        await ctx.prisma.clan.findUniqueOrThrow({
          where: {name: chosenClanName},
          include: {disciplines: true}
        });

      const learntDisciplines: KnownDiscipline[] = chosenClan.disciplines.map(
        discipline =>
          ({
            learntFromClan: true,
            baseDisciplineId: discipline.id,
            points: 0
          } as KnownDiscipline)
      );

      return await ctx.prisma.kindred.update({
        where: {id: kindredId},
        data: {
          clan: {connect: {name: chosenClanName}},
          disciplines: {deleteMany: {}, create: learntDisciplines}
        },
        include: {
          disciplines: {include: {baseDiscipline: true}},
          clan: true,
          powers: true
        }
      });
    }),
  updateDetails: protectedProcedure
    .input(
      z.object({
        kindredId: z.number().positive(),
        ambition: z.string().optional(),
        name: z.string().optional(),
        desire: z.string().optional()
      })
    )
    .mutation(async ({input, ctx}) => {
      return await ctx.prisma.kindred.update({
        where: {id: input.kindredId},
        data: {
          name: input.name || undefined,
          ambition: input.ambition || undefined,
          desire: input.desire || undefined
        }
      });
    }),
  changeAttribute: protectedProcedure
    .input(
      z.object({
        kindredId: z.number().positive(),
        attributeToChange: z.nativeEnum(AttributeName),
        newAmountOfPoints: z.number().min(0).max(5)
      })
    )
    .mutation(async ({input, ctx}) => {
      const updtedKindred = await ctx.prisma.kindred.update({
        where: {id: input.kindredId},
        data: {[input.attributeToChange]: input.newAmountOfPoints}
      });

      return updtedKindred[input.attributeToChange];
    }),
  changeSkill: protectedProcedure
    .input(
      z.object({
        kindredId: z.number().positive(),
        skillToChange: z.nativeEnum(SkillName),
        newAmountOfPoints: z.number().min(0).max(5)
      })
    )
    .mutation(async ({input, ctx}) => {
      const {newAmountOfPoints, kindredId, skillToChange} = input;

      await ctx.prisma.kindred.update({
        where: {id: kindredId},
        data: {
          skills: {
            update: {
              where: {
                name_kindredId: {
                  name: skillToChange,
                  kindredId: kindredId
                }
              },
              data: {points: newAmountOfPoints}
            }
          }
        }
      });
    }),
  changeDisciplines: protectedProcedure
    .input(
      z.object({
        kindredId: z.number().positive(),
        knownDisciplineId: z.number().positive(),
        newAmountOfPoints: z.number().min(0)
      })
    )
    .mutation(async ({input, ctx}) => {
      const {newAmountOfPoints, kindredId, knownDisciplineId} = input;

      await ctx.prisma.kindred.update({
        where: {id: kindredId},
        data: {
          disciplines: {
            update: {
              data: {points: newAmountOfPoints},
              where: {id: knownDisciplineId}
            }
          }
        }
      });
    })
});
