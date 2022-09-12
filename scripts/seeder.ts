import {prisma} from "../backend/utils/prisma";

const initialData = [
  {
    name: "Boris Dragunov",
    experience: 3,
    strength: 0,
    dexterity: 0,
    stamina: 0,
    charisma: 0,
    manipulation: 0,
    composure: 0,
    intelligence: 0,
    wits: 0,
    resolution: 0,

    aggravatedHealth: 0,
    superficialHealth: 0,

    aggravatedWillpower: 0,
    superficialWillpower: 0,

    humanity: 0,
    damagedHumanity: 0,

    hunger: 0,
  },
];

const seedKindred = async () => {
  await prisma.chronicle.create({data: {name: "test", kindred: {create: initialData}}});
};

seedKindred();
