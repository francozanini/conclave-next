import {Discipline, KnownDiscipline} from "@prisma/client";

export type FullDiscipline = KnownDiscipline & {baseDiscipline: Discipline};
