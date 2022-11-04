import {Discipline, Power} from '@prisma/client';

export type PowerWithDiscipline = Power & {discipline: Discipline};
