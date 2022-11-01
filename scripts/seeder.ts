import {ClanName, PowerName, Skill} from '@prisma/client';

import {prisma} from '../backend/db/prisma';
import {defaultSkills} from '../utils/domain/Skills';
import disciplines from '../constants/disciplines';
import clans from '../constants/clans';

const initialData = [
  {
    name: 'Boris Dragunov',
    ambition: '',
    desire: '',
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
      name: 'test',
      kindred: {
        create: initialData.map((kin) => ({
          ...kin,
          clan: {
            connect: kin.clan,
          },
          powers: {
            create: kin.powers.map((power) => ({
              basePower: {connect: power.basePower},
            })),
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
