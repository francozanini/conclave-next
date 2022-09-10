import { prisma } from '../backend/utils/prisma';

const initialData = [
    {
        name: 'Boris',
        trackables: {
            createMany: {
                data: [
                    {
                        name: 'humanity',
                        max: 5,
                        aggravatedDamage: 0,
                        superficialDamage: 0
                    },
                    { name: 'hunger', max: 5, aggravatedDamage: 0, superficialDamage: 0 },
                    { name: 'health', max: 5, aggravatedDamage: 0, superficialDamage: 0 },
                    {
                        name: 'willpower',
                        max: 5,
                        aggravatedDamage: 0,
                        superficialDamage: 0
                    }
                ]
            }
        }
    },
    {
        name: 'Julia',
        trackables: {
            createMany: {
                data: [
                    {
                        name: 'humanity',
                        max: 5,
                        aggravatedDamage: 0,
                        superficialDamage: 0
                    },
                    { name: 'hunger', max: 5, aggravatedDamage: 0, superficialDamage: 0 },
                    { name: 'health', max: 5, aggravatedDamage: 0, superficialDamage: 0 },
                    {
                        name: 'willpower',
                        max: 5,
                        aggravatedDamage: 0,
                        superficialDamage: 0
                    }
                ]
            }
        }
    },
    {
        name: 'NaRa',
        trackables: {
            createMany: {
                data: [
                    {
                        name: 'humanity',
                        max: 5,
                        aggravatedDamage: 0,
                        superficialDamage: 0
                    },
                    { name: 'hunger', max: 5, aggravatedDamage: 0, superficialDamage: 0 },
                    { name: 'health', max: 5, aggravatedDamage: 0, superficialDamage: 0 },
                    {
                        name: 'willpower',
                        max: 5,
                        aggravatedDamage: 0,
                        superficialDamage: 0
                    }
                ]
            }
        }
    },
    {
        name: 'Eu Jin',
        trackables: {
            createMany: {
                data: [
                    {
                        name: 'humanity',
                        max: 5,
                        aggravatedDamage: 0,
                        superficialDamage: 0
                    },
                    { name: 'hunger', max: 5, aggravatedDamage: 0, superficialDamage: 0 },
                    { name: 'health', max: 5, aggravatedDamage: 0, superficialDamage: 0 },
                    {
                        name: 'willpower',
                        max: 5,
                        aggravatedDamage: 0,
                        superficialDamage: 0
                    }
                ]
            }
        }
    },
    {
        name: 'Shawn',
        trackables: {
            createMany: {
                data: [
                    {
                        name: 'humanity',
                        max: 5,
                        aggravatedDamage: 0,
                        superficialDamage: 0
                    },
                    { name: 'hunger', max: 5, aggravatedDamage: 0, superficialDamage: 0 },
                    { name: 'health', max: 5, aggravatedDamage: 0, superficialDamage: 0 },
                    {
                        name: 'willpower',
                        max: 5,
                        aggravatedDamage: 0,
                        superficialDamage: 0
                    }
                ]
            }
        }
    }
];

const seedKindred = async () => {
    for (const kindred of initialData) {
        await prisma.kindred.create({ data: kindred });
    }
};

seedKindred();
