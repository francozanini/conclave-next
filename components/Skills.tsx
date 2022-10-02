import {Skill, SkillName, SkillType} from "@prisma/client";

import {removeUnderscoreAndCapitalize} from "../utils/RemoveUnderscoreAndCapitalize";
import {trpc} from "../utils/trpc";
import capitalize from "../utils/capitalize";
import {Kindred} from "../pages/kindred/[id]";

import Card from "./Card";
import Trackable from "./Trackable";

interface SkillProps {
  name: SkillName;
  amount: number;
  onChange: (newAmount: number) => any;
  className: string;
}

const Skill = ({className, onChange, name, amount}: SkillProps) => (
  <div className={`flex flex-row justify-between ${className}`}>
    <span className="text-xl">{removeUnderscoreAndCapitalize(name)}</span>
    <Trackable amount={amount} onChange={(newAmount) => onChange(newAmount)} />
  </div>
);

export const Skills = ({id, skills, refetch}: Kindred & {skills: Skill[]; refetch: Function}) => {
  const changeSkill = trpc.useMutation("kindred.change-skill", {onSuccess: () => refetch()});

  const skillsByType = [
    skills.filter((skill) => skill.type === SkillType.PHYSICAL),
    skills.filter((skill) => skill.type === SkillType.SOCIAL),
    skills.filter((skill) => skill.type === SkillType.MENTAL),
  ];

  return (
    <Card className={"min-w-md lg:max-w-fit"}>
      <h1 className="text-center text-4xl">Skills</h1>
      <div className={"flex flex-col lg:flex-row"}>
        {skillsByType.map((skills, i) => (
          <div
            key={skills[i].type}
            className="border-b p-4 border-solid border-opacity-5 lg:border-b-0 lg:border-r last:border-b-0 last:border-r-0">
            <h2 className="text-2xl text-center mb-2">{capitalize(skills[i].type)}</h2>
            {skills.map((skill) => (
              <Skill
                key={skill.name}
                amount={skill.points}
                className="mb-1"
                name={skill.name}
                onChange={(newAmount: number) =>
                  changeSkill.mutate({
                    newAmountOfPoints: newAmount,
                    skillToChange: skill.name,
                    kindredId: id,
                  })
                }
              />
            ))}
          </div>
        ))}
      </div>
    </Card>
  );
};
