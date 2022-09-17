import { SkillName, SkillType } from "@prisma/client";

export const defaultSkills = [
  // PHYSICAL
  {name: SkillName.ATHLETICS, amount: 0, type: SkillType.PHYSICAL},
  {name: SkillName.BRAWL, amount: 0, type: SkillType.PHYSICAL},
  {name: SkillName.CRAFT, amount: 0, type: SkillType.PHYSICAL},
  {name: SkillName.DRIVE, amount: 0, type: SkillType.PHYSICAL},
  {name: SkillName.FIREARMS, amount: 0, type: SkillType.PHYSICAL},
  {name: SkillName.MELEE, amount: 0, type: SkillType.PHYSICAL},
  {name: SkillName.LARCENY, amount: 0, type: SkillType.PHYSICAL},
  {name: SkillName.STEALTH, amount: 0, type: SkillType.PHYSICAL},
  {name: SkillName.SURVIVAL, amount: 0, type: SkillType.PHYSICAL},
  // SOCIAL
  {name: SkillName.ANIMAL_KEN, amount: 0, type: SkillType.SOCIAL},
  {name: SkillName.ETIQUETTE, amount: 0, type: SkillType.SOCIAL},
  {name: SkillName.INSIGHT, amount: 0, type: SkillType.SOCIAL},
  {name: SkillName.INTIMIDATION, amount: 0, type: SkillType.SOCIAL},
  {name: SkillName.LEADERSHIP, amount: 0, type: SkillType.SOCIAL},
  {name: SkillName.PERFORMANCE, amount: 0, type: SkillType.SOCIAL},
  {name: SkillName.PERSUASION, amount: 0, type: SkillType.SOCIAL},
  {name: SkillName.STREETWISE, amount: 0, type: SkillType.SOCIAL},
  {name: SkillName.SUBTERFUGE, amount: 0, type: SkillType.SOCIAL},
  // MENTAL
  {name: SkillName.ACADEMICS, amount: 0, type: SkillType.MENTAL},
  {name: SkillName.AWARENESS, amount: 0, type: SkillType.MENTAL},
  {name: SkillName.FINANCE, amount: 0, type: SkillType.MENTAL},
  {name: SkillName.INVESTIGATION, amount: 0, type: SkillType.MENTAL},
  {name: SkillName.MEDICINE, amount: 0, type: SkillType.MENTAL},
  {name: SkillName.OCCULT, amount: 0, type: SkillType.MENTAL},
  {name: SkillName.POLITICS, amount: 0, type: SkillType.MENTAL},
  {name: SkillName.SCIENCE, amount: 0, type: SkillType.MENTAL},
  {name: SkillName.TECHNOLOGY, amount: 0, type: SkillType.MENTAL},
];
