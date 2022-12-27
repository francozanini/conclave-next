import * as Tabs from '@radix-ui/react-tabs';
import {useRouter} from 'next/router';
import {ClanName, Skill, SkillType} from '@prisma/client';
import {useMemo} from 'react';

import KindredDetails from '../../../modules/sheet/KindredDetails';
import {Kindred} from '../../../types/Kindred';
import {trpc} from '../../../utils/trpcClient';
import withSessionGuard from '../../../modules/auth/SessionGuard';
import removeUnderscoreAndCapitalize from '../../../utils/formating/removeUnderscoreAndCapitalize';
import Card from '../../../modules/core/Card';
import {AttributeName} from '../../../types/AttributeName';
import capitalize from '../../../utils/formating/capitalize';
import {FullDiscipline} from '../../../types/FullDiscipline';
import {PowerWithDiscipline} from '../../../types/PowerWithDiscipline';

const Attributes = ({
  strength,
  dexterity,
  stamina,
  charisma,
  composure,
  manipulation,
  resolve,
  intelligence,
  wits,
  id,
  refetch
}: Kindred & {refetch: Function}) => {
  const changeAttribute = trpc.kindred.changeAttribute.useMutation({
    onSettled: () => refetch()
  });
  const attributes = useMemo(
    () => [
      [
        {amount: strength, name: AttributeName.strength, type: 'physical'},
        {amount: dexterity, name: AttributeName.dexterity, type: 'physical'},
        {amount: stamina, name: AttributeName.stamina, type: 'physical'}
      ],
      [
        {amount: charisma, name: AttributeName.charisma, type: 'social'},
        {
          amount: manipulation,
          name: AttributeName.manipulation,
          type: 'social'
        },
        {amount: composure, name: AttributeName.composure, type: 'social'}
      ],
      [
        {
          amount: intelligence,
          name: AttributeName.intelligence,
          type: 'mental'
        },
        {amount: wits, name: AttributeName.wits, type: 'mental'},
        {amount: resolve, name: AttributeName.resolve, type: 'mental'}
      ]
    ],
    [
      strength,
      dexterity,
      stamina,
      charisma,
      manipulation,
      composure,
      intelligence,
      wits,
      resolve
    ]
  );

  return (
    <>
      <h2 className="text-center text-6xl mb-1">Attributes</h2>
      <Card maxWidth="4xl">
        <div className="flex md:flex-row gap-12 flex-col justify-around">
          {attributes.map((attrs, i) => (
            <div key={attrs[i].type}>
              <h2 className="mb-2 text-center text-2xl capitalize">
                {attrs[i].type}
              </h2>
              {attrs.map(attr => (
                <PointBuyer
                  key={attr.name}
                  label={attr.name}
                  points={attr.amount}
                  onBuy={() =>
                    changeAttribute.mutate({
                      newAmountOfPoints: Math.min(attr.amount + 1, 5),
                      attributeToChange: attr.name,
                      kindredId: id
                    })
                  }
                  onSell={() =>
                    changeAttribute.mutate({
                      newAmountOfPoints: Math.max(attr.amount - 1, 0),
                      attributeToChange: attr.name,
                      kindredId: id
                    })
                  }
                />
              ))}
            </div>
          ))}
        </div>
      </Card>
    </>
  );
};

function PointBuyer({
  onBuy,
  onSell,
  label,
  points
}: {
  label: string;
  points: number;
  onBuy: () => void;
  onSell: () => void;
}) {
  return (
    <div className="justify-between flex flex-row gap-2">
      <span className="w-36 text-xl capitalize">{label}</span>
      <div className="flex flex-row gap-2">
        <button className="rounded-full w-6 h-6  bg-red-800" onClick={onSell}>
          -
        </button>
        <span>{points}/5</span>
        <button className="rounded-full w-6 h-6  bg-red-800" onClick={onBuy}>
          +
        </button>
      </div>
    </div>
  );
}

export const Skills = ({
  id,
  skills,
  refetch
}: Kindred & {skills: Skill[]; refetch: Function}) => {
  const changeSkill = trpc.kindred.changeSkill.useMutation({
    onSuccess: () => refetch()
  });

  const skillsByType = [
    skills
      .filter(skill => skill.type === SkillType.PHYSICAL)
      .sort((a, b) => a.name.localeCompare(b.name)),
    skills
      .filter(skill => skill.type === SkillType.SOCIAL)
      .sort((a, b) => a.name.localeCompare(b.name)),
    skills
      .filter(skill => skill.type === SkillType.MENTAL)
      .sort((a, b) => a.name.localeCompare(b.name))
  ];

  return (
    <>
      <h2 className="text-center text-6xl mb-1">Skills</h2>
      <Card maxWidth="4xl">
        <div className="flex md:flex-row gap-12 flex-col justify-around">
          {skillsByType.map((skills, i) => (
            <div key={skills[i].type}>
              <h2 className="mb-2 text-center text-4xl capitalize">
                {capitalize(skills[i].type)}
              </h2>
              {skills.map(skill => (
                <PointBuyer
                  key={skill.name}
                  label={removeUnderscoreAndCapitalize(skill.name)}
                  points={skill.points}
                  onBuy={() =>
                    changeSkill.mutate({
                      newAmountOfPoints: Math.max(skill.points - 1, 0),
                      skillToChange: skill.name,
                      kindredId: id
                    })
                  }
                  onSell={() =>
                    changeSkill.mutate({
                      newAmountOfPoints: Math.min(skill.points + 1, 5),
                      skillToChange: skill.name,
                      kindredId: id
                    })
                  }
                />
              ))}
            </div>
          ))}
        </div>
      </Card>
    </>
  );
};
interface DisciplinesProps {
  kindredId: number;
  disciplines: FullDiscipline[];
  powers: PowerWithDiscipline[];
  refetch: Function;
}

const Disciplines = ({
  disciplines,
  refetch,
  powers,
  kindredId
}: DisciplinesProps) => {
  const changePoints = trpc.kindred.changeDisciplines.useMutation({
    onSuccess: () => refetch()
  });

  disciplines.sort((a, b) =>
    a.baseDiscipline.name.localeCompare(b.baseDiscipline.name)
  );

  return (
    <>
      <h1 className="text-6xl text-center mb-1">Disciplines</h1>
      <Card className="w-fit flex flex-col gap-4" maxWidth="8xl">
        {disciplines.map(discipline => (
          <PointBuyer
            key={discipline.baseDiscipline.name}
            label={removeUnderscoreAndCapitalize(
              discipline.baseDiscipline.name
            )}
            points={discipline.points}
            onBuy={() =>
              changePoints.mutate({
                newAmountOfPoints: Math.min(5, discipline.points + 1),
                kindredId,
                knownDisciplineId: discipline.id
              })
            }
            onSell={() =>
              changePoints.mutate({
                newAmountOfPoints: Math.max(0, discipline.points - 1),
                kindredId,
                knownDisciplineId: discipline.id
              })
            }
          />
        ))}
      </Card>
    </>
  );
};

export function BuilderPage() {
  const trpcContextState = trpc.useContext();
  const kindredId = useRouter().query.id as string;
  const {
    isLoading,
    isError,
    refetch,
    data: kindred
  } = trpc.kindred.findById.useQuery(
    {kindredId: +kindredId},
    {
      refetchOnReconnect: false,
      refetchOnWindowFocus: true,
      trpc: {}
    }
  );
  const clanMutation = trpc.kindred.pickClan.useMutation();
  const clans = Object.values(ClanName);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !kindred) {
    return <div>Kindred not found</div>;
  }

  return (
    <Tabs.Root activationMode="manual" className="mt-4" defaultValue="tab1">
      <Tabs.List
        aria-label="Manage your account"
        className="flex flex-wrap justify-center text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
        <Tabs.Trigger className="mr-2" value="tab1">
          <div className="inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg dark:bg-gray-800 dark:text-blue-500">
            Background
          </div>
        </Tabs.Trigger>
        <Tabs.Trigger className="mr-2" value="tab2">
          <div className="inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg dark:bg-gray-800 dark:text-blue-500">
            Clan & Predator
          </div>
        </Tabs.Trigger>
        <Tabs.Trigger className="mr-2" value="tab3">
          <div className="inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg dark:bg-gray-800 dark:text-blue-500">
            {' '}
            Attributes & Skills
          </div>
        </Tabs.Trigger>
        <Tabs.Trigger className="mr-2" value="tab4">
          <div className="inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg dark:bg-gray-800 dark:text-blue-500">
            {' '}
            Disciplines & Powers
          </div>
        </Tabs.Trigger>
        <Tabs.Trigger className="mr-2" value="tab5">
          <div className="inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg dark:bg-gray-800 dark:text-blue-500">
            {' '}
            Advantages & Flaws
          </div>
        </Tabs.Trigger>
        <Tabs.Trigger className="mr-2" value="tab6">
          <div className="inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg dark:bg-gray-800 dark:text-blue-500">
            Touchstones & Convictions
          </div>
        </Tabs.Trigger>
      </Tabs.List>
      <TabContent value="tab1">
        <KindredDetails
          {...kindred}
          updateKindred={(updatedKindred: Kindred) => {
            trpcContextState.kindred.findById.setData(
              {kindredId: updatedKindred.id},
              oldKindred => ({
                ...oldKindred,
                ...updatedKindred
              })
            );
            trpcContextState.kindred.findById.invalidate({
              kindredId: +kindredId
            });
          }}
        />
      </TabContent>
      <TabContent value="tab2">
        <select
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          defaultValue={kindred.clan.name}
          name="clans"
          onChange={e =>
            clanMutation.mutate(
              {
                chosenClanName: e.target.value as ClanName,
                kindredId: kindred.id
              },
              {onSuccess: updatedData => updateKindred(updatedData)}
            )
          }>
          {clans.map(clan => (
            <option key={clan} value={clan}>
              {removeUnderscoreAndCapitalize(clan)}
            </option>
          ))}
        </select>
      </TabContent>
      <TabContent value="tab3">
        <div className="flex flex-col gap-4">
          <Attributes {...kindred} refetch={refetch} />
          <Skills {...kindred} refetch={refetch} />
        </div>
      </TabContent>
      <TabContent value="tab4">
        <div className="flex flex-col gap-4">
          <Disciplines
            disciplines={kindred.disciplines}
            kindredId={kindred.id}
            powers={kindred.powers.map(learnedPower => learnedPower.basePower)}
            refetch={refetch}
          />
        </div>
      </TabContent>
    </Tabs.Root>
  );
}

const TabContent = ({
  value,
  children
}: {
  value: string;
  children: JSX.Element[] | JSX.Element;
}) => {
  return (
    <Tabs.Content
      className="grid grid-cols-1 justify-items-center mt-4"
      value={value}>
      {children}
    </Tabs.Content>
  );
};

export default withSessionGuard(BuilderPage);
