import {z} from "zod";
import {Clan, ClanName, Discipline, KnownDiscipline, SkillName} from "@prisma/client";

import {prisma} from "../../db/prisma";
import {AttributeName} from "../../../types/AttributeName";
import {createRouter} from "../context";

export const kindredRouter = createRouter()
  .query("find-by-id", {
    input: z.object({
      kindredId: z.number().positive(),
    }),
    resolve: async ({input}) => {
      const retrievedKindred = await prisma.kindred.findUnique({
        where: {id: input.kindredId},
        include: {
          clan: true,
          skills: true,
          disciplines: {include: {baseDiscipline: true}},
        },
      });

      if (!retrievedKindred) {
        throw Error(`kindred ${input.kindredId} not found`);
      }

      return retrievedKindred;
    },
  })
  .mutation("update-details", {
    input: z.object({
      kindredId: z.number().positive(),
      ambition: z.string().optional(),
      name: z.string().optional(),
      desire: z.string().optional(),
    }),
    resolve: async ({input}) => {
      return await prisma.kindred.update({
        where: {id: input.kindredId},
        data: {
          name: input.name || undefined,
          ambition: input.ambition || undefined,
          desire: input.desire || undefined,
        },
      });
    },
  })
  .mutation("pick-clan", {
    input: z.object({
      kindredId: z.number().positive(),
      chosenClanName: z.nativeEnum(ClanName),
    }),
    resolve: async ({input}) => {
      const {chosenClanName, kindredId} = input;
      const chosenClan: Clan & {disciplines: Discipline[]} = await prisma.clan.findUniqueOrThrow({
        where: {name: chosenClanName},
        include: {disciplines: true},
      });

      const learntDisciplines: KnownDiscipline[] = chosenClan.disciplines.map(
        (discipline) =>
          ({
            learntFromClan: true,
            baseDisciplineId: discipline.id,
            points: 0,
          } as KnownDiscipline),
      );

      return await prisma.kindred.update({
        where: {id: kindredId},
        data: {
          clan: {connect: {name: chosenClanName}},
          disciplines: {deleteMany: {}, create: learntDisciplines},
        },
        include: {
          disciplines: {include: {baseDiscipline: true}},
          clan: true,
          powers: true,
        },
      });
    },
  })
  .mutation("change-attribute", {
    input: z.object({
      kindredId: z.number().positive(),
      attributeToChange: z.nativeEnum(AttributeName),
      newAmountOfPoints: z.number().min(0).max(5),
    }),
    resolve: async ({input}) => {
      const updtedKindred = await prisma.kindred.update({
        where: {id: input.kindredId},
        data: {[input.attributeToChange]: input.newAmountOfPoints},
      });

      return updtedKindred[input.attributeToChange];
    },
  })
  .mutation("change-skill", {
    input: z.object({
      kindredId: z.number().positive(),
      skillToChange: z.nativeEnum(SkillName),
      newAmountOfPoints: z.number().min(0).max(5),
    }),
    resolve: async ({input}) => {
      const {newAmountOfPoints, kindredId, skillToChange} = input;

      await prisma.kindred.update({
        where: {id: kindredId},
        data: {
          skills: {
            update: {
              where: {
                name_kindredId: {
                  name: skillToChange,
                  kindredId: kindredId,
                },
              },
              data: {points: newAmountOfPoints},
            },
          },
        },
      });
    },
  })
  .mutation("changeDisciplines", {
    input: z.object({
      kindredId: z.number().positive(),
      knownDisciplineId: z.number().positive(),
      newAmountOfPoints: z.number().min(0),
    }),
    resolve: async ({input}) => {
      const {newAmountOfPoints, kindredId, knownDisciplineId} = input;

      await prisma.kindred.update({
        where: {id: kindredId},
        data: {
          disciplines: {
            update: {
              data: {points: newAmountOfPoints},
              where: {id: knownDisciplineId},
            },
          },
        },
      });
    },
  });
