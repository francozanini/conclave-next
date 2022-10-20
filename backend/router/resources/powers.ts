import {z} from "zod";
import {DisciplineName} from "@prisma/client";

import {createRouter} from "../context";
import {prisma} from "../../db/prisma";

export const powersRouter = createRouter().query("learnable-powers", {
  input: z.object({
    disciplines: z.array(
      z.object({
        disciplineName: z.nativeEnum(DisciplineName),
        lvl: z.number().nonnegative(),
      }),
    ),
  }),
  resolve: async ({input: {disciplines}}) => {
    const disciplineNames = disciplines.map((discipline) => discipline.disciplineName);
    const powers = await prisma.power.findMany({
      where: {discipline: {name: {in: disciplineNames}}},
      include: {discipline: true},
    });

    return powers.filter(
      (power) =>
        power.level <=
        (disciplines.find((discipline) => discipline.disciplineName === power.discipline.name)
          ?.lvl ?? 0),
    );
  },
});
