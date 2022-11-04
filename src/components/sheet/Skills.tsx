import {Skill, SkillName, SkillType} from '@prisma/client';

import {removeUnderscoreAndCapitalize} from '../../utils/formating/removeUnderscoreAndCapitalize';
import {trpc} from '../../utils/trpcClient';
import capitalize from '../../utils/formating/capitalize';
import Card from '../core/Card';
import {Kindred} from '../../types/Kindred';

import Trackable from './Trackable';

interface SkillProps {
  name: SkillName;
  amount: number;
  onChange: (newAmount: number) => any;
  className: string;
}

const Skill = ({className, onChange, name, amount}: SkillProps) => (
  <div className={`flex flex-row justify-between ${className}`}>
    <span className="mr-2 text-xl">{removeUnderscoreAndCapitalize(name)}</span>
    <Trackable amount={amount} onChange={(newAmount) => onChange(newAmount)} />
  </div>
);

export const Skills = ({
  id,
  skills,
  refetch,
}: Kindred & {skills: Skill[]; refetch: Function}) => {
  const changeSkill = trpc.kindred.changeSkill.useMutation({
    onSuccess: () => refetch(),
  });

  const skillsByType = [
    skills
      .filter((skill) => skill.type === SkillType.PHYSICAL)
      .sort((a, b) => a.name.localeCompare(b.name)),
    skills
      .filter((skill) => skill.type === SkillType.SOCIAL)
      .sort((a, b) => a.name.localeCompare(b.name)),
    skills
      .filter((skill) => skill.type === SkillType.MENTAL)
      .sort((a, b) => a.name.localeCompare(b.name)),
  ];

  return (
    <Card className={'lg:max-w-fit'}>
      <h1 className="text-center text-4xl">Skills</h1>
      <div className={'flex flex-col lg:flex-row'}>
        {skillsByType.map((skills, i) => (
          <div
            key={skills[i].type}
            className="border-b border-solid border-opacity-5 p-4 last:border-b-0 last:border-r-0 lg:border-b-0 lg:border-r">
            <h2 className="mb-2 text-center text-2xl">
              {capitalize(skills[i].type)}
            </h2>
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
