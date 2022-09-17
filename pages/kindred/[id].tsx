import {useRouter} from "next/router";
import {SkillName, SkillType} from "@prisma/client";

import Attributes from "../../components/Attributes";
import KindredDetails from "../../components/KindredDetails";
import {trpc} from "../../utils/trpc";
import {inferQueryResponse} from "../api/trpc/[trpc]";
import Card from "../../components/Card";
import capitalize from "../../utils/capitalize";
import Trackable from "../../components/Trackable";
import {removeUnderscoreAndCapitalize} from "../../utils/RemoveUnderscoreAndCapitalize";

export type Kindred = inferQueryResponse<"find-kindred">;

function Skill({
  className,
  onChange,
  name,
  amount,
}: {
  name: SkillName;
  amount: number;
  onChange: (newAmount: number) => any;
  className: string;
}) {
  return (
    <div className={`flex flex-row justify-between ${className}`}>
      <span className="text-xl">{removeUnderscoreAndCapitalize(name)}</span>
      <Trackable amount={amount} onChange={(newAmount) => onChange(newAmount)} />
    </div>
  );
}

function Skills({id, skills}: Kindred) {
  const changeSkill = trpc.useMutation("change-skill");

  const skillsByType = [
    skills.filter((skill) => skill.type === SkillType.PHYSICAL),
    skills.filter((skill) => skill.type === SkillType.SOCIAL),
    skills.filter((skill) => skill.type === SkillType.MENTAL),
  ];

  return (
    <Card>
      <h1 className="text-center text-4xl">Skills</h1>
      <>
        {skillsByType.map((skills, i) => (
          <div
            key={skills[i].type}
            className="border-b p-4 border-solid border-opacity-5 2xl:border-b-0 2xl:border-r last:border-b-0 last:border-r-0">
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
      </>
    </Card>
  );
}

const KindredSheetPage = () => {
  const {id: kindredId} = useRouter().query;
  const {
    isLoading,
    isError,
    data: kindred,
  } = trpc.useQuery(["find-kindred", {kindredId: +kindredId}]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !kindred) {
    return <div>Kindred not found</div>;
  }

  return (
    <section className="mx-4 mt-2 flex flex-col gap-2">
      <KindredDetails {...kindred} />
      <Attributes {...kindred} />
      <Skills {...kindred} />
    </section>
  );
};

export default KindredSheetPage;
