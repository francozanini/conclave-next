import {ClanName, DisciplineName, Duration, Power, PowerName, Skill} from "@prisma/client";

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

    powers: [{basePower: {name: PowerName.LETHAL_BODY}}],

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
    powers: [],
  },
  {
    name: DisciplineName.AUSPEX,
    clans: [
      {name: ClanName.HECATA},
      {name: ClanName.MALKAVIAN},
      {name: ClanName.TREMERE},
      {name: ClanName.TOREADOR},
    ],
    powers: [],
  },
  {
    name: DisciplineName.BLOOD_SORCERY,
    clans: [{name: ClanName.BANU_HAQIM}, {name: ClanName.TREMERE}],
    powers: [],
  },
  {
    name: DisciplineName.CELERITY,
    clans: [{name: ClanName.BANU_HAQIM}, {name: ClanName.BRUJAH}, {name: ClanName.TOREADOR}],
    powers: [],
  },
  {
    name: DisciplineName.DOMINATE,
    clans: [{name: ClanName.LASOMBRA}, {name: ClanName.TREMERE}, {name: ClanName.VENTRUE}],
    powers: [{name: PowerName.COMPELL, level: 1, duration: Duration.SCENE}] as Power[],
  },
  {
    name: DisciplineName.FORTITUDE,
    clans: [{name: ClanName.GANGREL}, {name: ClanName.HECATA}, {name: ClanName.VENTRUE}],
    powers: [],
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
    powers: [],
  },
  {
    name: DisciplineName.OBLIVION,
    clans: [{name: ClanName.HECATA}, {name: ClanName.LASOMBRA}],
    powers: [],
  },
  {
    name: DisciplineName.POTENCE,
    clans: [{name: ClanName.BRUJAH}, {name: ClanName.LASOMBRA}, {name: ClanName.NOSFERATU}],
    powers: [{name: PowerName.LETHAL_BODY, level: 1, duration: Duration.PASSIVE}],
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
    powers: [],
  },
  {
    name: DisciplineName.PROTEAN,
    clans: [{name: ClanName.GANGREL}, {name: ClanName.THE_MINISTRY}, {name: ClanName.TZIMISCE}],
    powers: [],
  },
];

const seedKindred = async () => {
  await prisma.clan.createMany({data: [...clans], skipDuplicates: true});

  for (const discipline of disciplines) {
    await prisma.discipline.create({
      data: {
        ...discipline,
        clans: {connect: discipline.clans},
        powers: {create: discipline.powers},
      },
    });
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
          powers: {
            create: kin.powers.map((power) => ({basePower: {connect: power.basePower}})),
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
