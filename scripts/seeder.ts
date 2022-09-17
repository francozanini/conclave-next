import {ClanName, Skill} from "@prisma/client";

import {prisma} from "../backend/utils/prisma";
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

const seedKindred = async () => {
  await prisma.chronicle.create({
    data: {
      name: "test",
      kindred: {
        create: initialData.map((kin) => ({
          ...kin,
          clan: {
            create: kin.clan,
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
