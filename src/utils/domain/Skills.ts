import {Skill, SkillName, SkillType} from '@prisma/client';

export const defaultSkills: Partial<Skill>[] = [
  // PHYSICAL
  {name: SkillName.ATHLETICS, points: 0, type: SkillType.PHYSICAL},
  {name: SkillName.BRAWL, points: 0, type: SkillType.PHYSICAL},
  {name: SkillName.CRAFT, points: 0, type: SkillType.PHYSICAL},
  {name: SkillName.DRIVE, points: 0, type: SkillType.PHYSICAL},
  {name: SkillName.FIREARMS, points: 0, type: SkillType.PHYSICAL},
  {name: SkillName.MELEE, points: 0, type: SkillType.PHYSICAL},
  {name: SkillName.LARCENY, points: 0, type: SkillType.PHYSICAL},
  {name: SkillName.STEALTH, points: 0, type: SkillType.PHYSICAL},
  {name: SkillName.SURVIVAL, points: 0, type: SkillType.PHYSICAL},
  // SOCIAL
  {name: SkillName.ANIMAL_KEN, points: 0, type: SkillType.SOCIAL},
  {name: SkillName.ETIQUETTE, points: 0, type: SkillType.SOCIAL},
  {name: SkillName.INSIGHT, points: 0, type: SkillType.SOCIAL},
  {name: SkillName.INTIMIDATION, points: 0, type: SkillType.SOCIAL},
  {name: SkillName.LEADERSHIP, points: 0, type: SkillType.SOCIAL},
  {name: SkillName.PERFORMANCE, points: 0, type: SkillType.SOCIAL},
  {name: SkillName.PERSUASION, points: 0, type: SkillType.SOCIAL},
  {name: SkillName.STREETWISE, points: 0, type: SkillType.SOCIAL},
  {name: SkillName.SUBTERFUGE, points: 0, type: SkillType.SOCIAL},
  // MENTAL
  {name: SkillName.ACADEMICS, points: 0, type: SkillType.MENTAL},
  {name: SkillName.AWARENESS, points: 0, type: SkillType.MENTAL},
  {name: SkillName.FINANCE, points: 0, type: SkillType.MENTAL},
  {name: SkillName.INVESTIGATION, points: 0, type: SkillType.MENTAL},
  {name: SkillName.MEDICINE, points: 0, type: SkillType.MENTAL},
  {name: SkillName.OCCULT, points: 0, type: SkillType.MENTAL},
  {name: SkillName.POLITICS, points: 0, type: SkillType.MENTAL},
  {name: SkillName.SCIENCE, points: 0, type: SkillType.MENTAL},
  {name: SkillName.TECHNOLOGY, points: 0, type: SkillType.MENTAL},
];
