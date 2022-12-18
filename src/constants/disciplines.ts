import {
  ClanName,
  DisciplineName,
  Duration,
  PoolResource,
  Power,
  PowerCost,
  PowerName
} from '@prisma/client';

const disciplines = [
  {
    name: DisciplineName.ANIMALISM,
    clans: [
      {name: ClanName.RAVNOS},
      {name: ClanName.GANGREL},
      {name: ClanName.NOSFERATU},
      {name: ClanName.TZIMISCE}
    ],
    powers: [
      {
        name: PowerName.BOND_FAMULUS,
        firstPoolResource: PoolResource.CHARISMA,
        secondPoolResource: PoolResource.ANIMAL_KIN,
        cost: PowerCost.ROUSE_CHECK,
        level: 1,
        duration: Duration.SCENE
      },
      {
        name: PowerName.SENSE_THE_BEAST,
        firstPoolResource: PoolResource.COMPOSURE,
        secondPoolResource: PoolResource.SUBTERFUGE,
        level: 1,
        cost: PowerCost.ROUSE_CHECK,
        duration: Duration.PASSIVE
      },
      {
        name: PowerName.FERAL_WHISPERS,
        level: 2,
        cost: PowerCost.ROUSE_CHECK,
        firstPoolResource: PoolResource.MANIPULATION,
        secondPoolResource: PoolResource.ANIMALISM,
        duration: Duration.SCENE
      }, //has alternative poolresource
      {
        name: PowerName.ANIMAL_SUCCULENCE,
        cost: PowerCost.FREE,
        level: 3,
        duration: Duration.PASSIVE
      }
    ]
  },
  {
    name: DisciplineName.AUSPEX,
    clans: [
      {name: ClanName.HECATA},
      {name: ClanName.MALKAVIAN},
      {name: ClanName.TREMERE},
      {name: ClanName.TOREADOR}
    ],
    powers: [
      {
        name: PowerName.HEIGHTENED_SENSES,
        cost: PowerCost.FREE,
        firstPoolResource: PoolResource.WITS,
        secondPoolResource: PoolResource.RESOLVE,
        level: 1,
        duration: Duration.DEACTIVATE
      },
      {
        name: PowerName.SENSE_THE_UNSEEN,
        cost: PowerCost.FREE,
        firstPoolResource: PoolResource.WITS,
        secondPoolResource: PoolResource.AUSPEX,
        level: 1,
        duration: Duration.PASSIVE
      }, // tiene costes alternativos
      {
        name: PowerName.PREMONITION,
        cost: PowerCost.FREE_RC,
        firstPoolResource: PoolResource.RESOLVE,
        secondPoolResource: PoolResource.AUSPEX,
        level: 2,
        duration: Duration.PASSIVE
      },
      {
        name: PowerName.SCRY_THE_SOUL,
        cost: PowerCost.ROUSE_CHECK,
        firstPoolResource: PoolResource.INTELLIGENCE,
        secondPoolResource: PoolResource.AUSPEX,
        vsFirstPoolResource: PoolResource.COMPOSURE,
        vsSecondPoolResource: PoolResource.SUBTERFUGE,
        level: 3,
        duration: Duration.TURN
      },
      {
        name: PowerName.SHARE_THE_SENSES,
        cost: PowerCost.ROUSE_CHECK,
        firstPoolResource: PoolResource.RESOLVE,
        secondPoolResource: PoolResource.AUSPEX,
        level: 3,
        duration: Duration.SCENE
      }
    ]
  },
  {
    name: DisciplineName.BLOOD_SORCERY,
    clans: [{name: ClanName.BANU_HAQIM}, {name: ClanName.TREMERE}],
    powers: []
  },
  {
    name: DisciplineName.CELERITY,
    clans: [
      {name: ClanName.BANU_HAQIM},
      {name: ClanName.BRUJAH},
      {name: ClanName.TOREADOR}
    ],
    powers: [
      {
        name: PowerName.CATS_GRACE,
        cost: PowerCost.FREE,
        level: 1,
        duration: Duration.PASSIVE
      },
      {
        name: PowerName.RAPID_REFLEXES,
        cost: PowerCost.FREE,
        level: 1,
        duration: Duration.PASSIVE
      },
      {
        name: PowerName.FLEETNESS,
        cost: PowerCost.ROUSE_CHECK,
        level: 2,
        duration: Duration.SCENE
      },
      {
        name: PowerName.BLINK,
        cost: PowerCost.ROUSE_CHECK,
        firstPoolResource: PoolResource.DEXTERITY,
        secondPoolResource: PoolResource.ATHLETICS,
        level: 3,
        duration: Duration.TURN
      },
      {
        name: PowerName.TRAVERSAL,
        cost: PowerCost.ROUSE_CHECK,
        firstPoolResource: PoolResource.DEXTERITY,
        secondPoolResource: PoolResource.ATHLETICS,
        level: 3,
        duration: Duration.TURN
      }
    ]
  },
  {
    name: DisciplineName.DOMINATE,
    clans: [
      {name: ClanName.LASOMBRA},
      {name: ClanName.TREMERE},
      {name: ClanName.VENTRUE},
      {name: ClanName.TZIMISCE}
    ],
    powers: [
      {
        name: PowerName.CLOUD_MEMORY,
        level: 1,
        cost: PowerCost.FREE,
        firstPoolResource: PoolResource.CHARISMA,
        secondPoolResource: PoolResource.DOMINATE,
        vsFirstPoolResource: PoolResource.WITS,
        vsSecondPoolResource: PoolResource.RESOLVE,
        duration: Duration.INDEFINITELY
      },
      {
        name: PowerName.COMPEL,
        level: 1,
        cost: PowerCost.FREE,
        firstPoolResource: PoolResource.CHARISMA,
        secondPoolResource: PoolResource.DOMINATE,
        vsFirstPoolResource: PoolResource.INTELLIGENCE,
        vsSecondPoolResource: PoolResource.RESOLVE,
        duration: Duration.SCENE
      },
      {
        name: PowerName.MESMERIZE,
        level: 2,
        cost: PowerCost.ROUSE_CHECK,
        firstPoolResource: PoolResource.MANIPULATION,
        secondPoolResource: PoolResource.DOMINATE,
        vsFirstPoolResource: PoolResource.INTELLIGENCE,
        vsSecondPoolResource: PoolResource.RESOLVE,
        duration: Duration.SCENE
      },
      {
        name: PowerName.THE_FORGETFUL_MIND,
        level: 3,
        cost: PowerCost.ROUSE_CHECK,
        firstPoolResource: PoolResource.MANIPULATION,
        secondPoolResource: PoolResource.DOMINATE,
        vsFirstPoolResource: PoolResource.INTELLIGENCE,
        vsSecondPoolResource: PoolResource.RESOLVE,
        duration: Duration.INDEFINITELY
      }
    ] as Power[]
  },
  {
    name: DisciplineName.FORTITUDE,
    clans: [
      {name: ClanName.GANGREL},
      {name: ClanName.HECATA},
      {name: ClanName.VENTRUE}
    ],
    powers: [
      {
        name: PowerName.RESILIENCE,
        cost: PowerCost.FREE,
        level: 1,
        duration: Duration.PASSIVE
      },
      {
        name: PowerName.UNSWAYABLE_MIND,
        cost: PowerCost.FREE,
        level: 1,
        duration: Duration.PASSIVE
      },
      {
        name: PowerName.COMPELL,
        cost: PowerCost.ROUSE_CHECK,
        level: 2,
        duration: Duration.SCENE
      }
    ]
  },
  {
    name: DisciplineName.OBFUSCATE,
    clans: [
      {name: ClanName.BANU_HAQIM},
      {name: ClanName.THE_MINISTRY},
      {name: ClanName.MALKAVIAN},
      {name: ClanName.NOSFERATU},
      {name: ClanName.RAVNOS}
    ],
    powers: []
  },
  {
    name: DisciplineName.OBLIVION,
    clans: [{name: ClanName.HECATA}, {name: ClanName.LASOMBRA}],
    powers: []
  },
  {
    name: DisciplineName.POTENCE,
    clans: [
      {name: ClanName.BRUJAH},
      {name: ClanName.LASOMBRA},
      {name: ClanName.NOSFERATU}
    ],
    powers: [
      {
        name: PowerName.LETHAL_BODY,
        cost: PowerCost.FREE,
        level: 1,
        duration: Duration.PASSIVE
      },
      {
        name: PowerName.SOARING_LEAP,
        cost: PowerCost.FREE,
        level: 1,
        duration: Duration.PASSIVE
      },
      {
        name: PowerName.PROWESS,
        cost: PowerCost.ROUSE_CHECK,
        level: 1,
        duration: Duration.SCENE
      }
    ]
  },
  {
    name: DisciplineName.PRESENCE,
    clans: [
      {name: ClanName.BRUJAH},
      {name: ClanName.THE_MINISTRY},
      {name: ClanName.RAVNOS},
      {name: ClanName.TOREADOR},
      {name: ClanName.VENTRUE}
    ],
    powers: [
      {
        name: PowerName.AWE,
        cost: PowerCost.FREE,
        level: 1,
        firstPoolResource: PoolResource.MANIPULATION,
        secondPoolResource: PoolResource.PRESENCE,
        vsFirstPoolResource: PoolResource.COMPOSURE,
        vsSecondPoolResource: PoolResource.INTELLIGENCE,
        duration: Duration.SCENE
      },
      {
        name: PowerName.DAUNT,
        cost: PowerCost.FREE,
        level: 1,
        duration: Duration.SCENE
      },
      {
        name: PowerName.LINGERING_KISS,
        cost: PowerCost.FREE,
        level: 1,
        duration: Duration.RESISTED
      }
    ]
  },
  {
    name: DisciplineName.PROTEAN,
    clans: [
      {name: ClanName.GANGREL},
      {name: ClanName.THE_MINISTRY},
      {name: ClanName.TZIMISCE}
    ],
    powers: [
      {
        name: PowerName.EYES_OF_THE_BEAST,
        cost: PowerCost.FREE,
        level: 1,
        duration: Duration.DESIRED
      },
      {
        name: PowerName.WEIGHT_OF_THE_FEATHER,
        cost: PowerCost.FREE,
        level: 1,
        firstPoolResource: PoolResource.WITS,
        secondPoolResource: PoolResource.SURVIVAL,
        duration: Duration.DESIRED
      },
      {
        name: PowerName.FERAL_WEAPONS,
        cost: PowerCost.ROUSE_CHECK,
        level: 2,
        duration: Duration.SCENE
      }
    ]
  }
];

export default disciplines;
