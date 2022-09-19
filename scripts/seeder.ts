import {ClanName, DisciplineName, Skill} from "@prisma/client";

import {prisma} from "../backend/db/prisma";
import {defaultSkills} from "../utils/Skills";

const initialData = [
  {
    name: "Boris Dragunov",
    ambition: "",
    desire: "",
    experience: 3,
    strength: 4,
    dexterity: 3,
    stamina: 2,
    charisma: 3,
    manipulation: 1,
    composure: 3,
    intelligence: 2,
    wits: 2,
    resolve: 2,

    clan: {
      name: ClanName.BRUJAH,
    },

    aggravatedHealth: 0,
    superficialHealth: 0,

    aggravatedWillpower: 0,
    superficialWillpower: 0,

    humanity: 6,
    damagedHumanity: 0,

    hunger: 0,
  },
];

const clans: any[] = [
  {name: ClanName.BANU_HAQIM},
  {name: ClanName.BRUJAH},
  {name: ClanName.CAITIFF},
  {name: ClanName.GANGREL},
  {name: ClanName.HECATA},
  {name: ClanName.LASOMBRA},
  {name: ClanName.MALKAVIAN},
  {name: ClanName.NOSFERATU},
  {name: ClanName.RAVNOS},
  {name: ClanName.SALUBRI},
  {name: ClanName.THE_MINISTRY},
  {name: ClanName.TOREADOR},
  {name: ClanName.TREMERE},
  {name: ClanName.TZIMISCE},
  {name: ClanName.VENTRUE},
];

const disciplines = [
  {
    name: DisciplineName.ANIMALISM,
    clans: [
      {name: ClanName.RAVNOS},
      {name: ClanName.GANGREL},
      {name: ClanName.NOSFERATU},
      {name: ClanName.TZIMISCE},
    ],
  },
  {
    name: DisciplineName.AUSPEX,
    clans: [
      {name: ClanName.HECATA},
      {name: ClanName.MALKAVIAN},
      {name: ClanName.TREMERE},
      {name: ClanName.TOREADOR},
    ],
  },
  {
    name: DisciplineName.BLOOD_SORCERY,
    clans: [{name: ClanName.BANU_HAQIM}, {name: ClanName.TREMERE}],
  },
  {
    name: DisciplineName.CELERITY,
    clans: [{name: ClanName.BANU_HAQIM}, {name: ClanName.BRUJAH}, {name: ClanName.TOREADOR}],
  },
  {
    name: DisciplineName.DOMINATE,
    clans: [{name: ClanName.LASOMBRA}, {name: ClanName.TREMERE}, {name: ClanName.VENTRUE}],
  },
  {
    name: DisciplineName.FORTITUDE,
    clans: [{name: ClanName.GANGREL}, {name: ClanName.HECATA}, {name: ClanName.VENTRUE}],
  },
  {
    name: DisciplineName.OBFUSCATE,
    clans: [
      {name: ClanName.BANU_HAQIM},
      {name: ClanName.THE_MINISTRY},
      {name: ClanName.MALKAVIAN},
      {name: ClanName.NOSFERATU},
      {name: ClanName.RAVNOS},
    ],
  },
  {name: DisciplineName.OBLIVION, clans: [{name: ClanName.HECATA}, {name: ClanName.LASOMBRA}]},
  {
    name: DisciplineName.POTENCE,
    clans: [{name: ClanName.BRUJAH}, {name: ClanName.LASOMBRA}, {name: ClanName.NOSFERATU}],
  },
  {
    name: DisciplineName.PRESENCE,
    clans: [
      {name: ClanName.BRUJAH},
      {name: ClanName.THE_MINISTRY},
      {name: ClanName.RAVNOS},
      {name: ClanName.TOREADOR},
      {name: ClanName.VENTRUE},
    ],
  },
  {
    name: DisciplineName.PROTEAN,
    clans: [{name: ClanName.GANGREL}, {name: ClanName.THE_MINISTRY}, {name: ClanName.TZIMISCE}],
  },
];

const seedKindred = async () => {
  await prisma.clan.createMany({data: [...clans], skipDuplicates: true});

  for (const discipline of disciplines) {
    await prisma.discipline.create({data: {...discipline, clans: {connect: discipline.clans}}});
  }

  await prisma.chronicle.create({
    data: {
      name: "test",
      kindred: {
        create: initialData.map((kin) => ({
          ...kin,
          clan: {
            connect: kin.clan,
          },
          skills: {
            createMany: {data: [...defaultSkills] as Skill[]},
          },
        })),
      },
    },
  });
};

seedKindred();
