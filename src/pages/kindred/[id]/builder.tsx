import * as Tabs from '@radix-ui/react-tabs';
import {useRouter} from 'next/router';
import {ClanName, Skill, SkillType} from '@prisma/client';
import {useMemo} from 'react';
import Image from 'next/image';

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
import {PowerCard} from '../../../modules/sheet/PowerCard';
import {includesBy} from '../../../utils/arrays/includesBy';
import classNames from '../../../utils/classNames';

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
  refetch: Function;
  className?: string;
}

const Disciplines = ({
  disciplines,
  refetch,
  kindredId,
  className = ''
}: DisciplinesProps) => {
  const changePoints = trpc.kindred.changeDisciplines.useMutation({
    onSuccess: () => refetch()
  });

  disciplines.sort((a, b) =>
    a.baseDiscipline.name.localeCompare(b.baseDiscipline.name)
  );

  return (
    <div className={className}>
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
    </div>
  );
};

function Powers({
  kindredId,
  disciplines,
  powers,
  className = ''
}: {
  kindredId: number;
  powers: PowerWithDiscipline[];
  disciplines: FullDiscipline[];
  className?: string;
}) {
  const {data: learnablePowers, isLoading} =
    trpc.powers.learnablePowers.useQuery({
      disciplines: disciplines.map(discipline => ({
        disciplineName: discipline.baseDiscipline.name,
        lvl: discipline.points
      }))
    });

  if (isLoading || !learnablePowers) {
    return <div>sad</div>;
  }
  return (
    <div className={className}>
      <h1 className="text-6xl text-center mb-1">Powers</h1>
      <div className="space-y-6 p-6">
        <div className="space-y-3">
          {learnablePowers.length ? (
            learnablePowers.map(lp => (
              <PowerCard
                key={lp.id}
                kindredId={kindredId}
                {...lp}
                alreadyLearnt={includesBy(
                  power => power.name === lp.name,
                  powers
                )}
              />
            ))
          ) : (
            <p className="text-center">No powers to learn yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function ClanSelection() {
  const clanMutation = trpc.kindred.pickClan.useMutation();
  const clans = Object.values(ClanName);
  return (
    <div className="flex gap-4 flex-row flex-wrap justify-center">
      {clans.map(clan => (
        <Card key={clan} className="max-w-fit">
          <Image
            alt={`Clan ${removeUnderscoreAndCapitalize(clan)}`}
            height={200}
            src={`/clans/clan-${clan.toLowerCase().replace('_', '')}-logo.webp`}
            width={200}
          />
        </Card>
      ))}
    </div>
  );
}

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
        <ClanSelection />
      </TabContent>
      <TabContent value="tab3">
        <div className="flex flex-col gap-4">
          <Attributes {...kindred} refetch={refetch} />
          <Skills {...kindred} refetch={refetch} />
        </div>
      </TabContent>
      <Tabs.Content
        className=" grid grid-cols-6 grid-rows-2 gap-8 justify-items-center mt-4"
        value="tab4">
        <Disciplines
          className={'row-start-1 col-start-2 col-end-6'}
          disciplines={kindred.disciplines}
          kindredId={kindred.id}
          refetch={refetch}
        />
        <Powers
          className={'container row-start-2 col-start-2 col-span-4'}
          disciplines={kindred.disciplines}
          kindredId={kindred.id}
          powers={kindred.powers.map(learnedPower => learnedPower.basePower)}
        />
      </Tabs.Content>
    </Tabs.Root>
  );
}

const TabContent = ({
  value,
  children,
  className = ''
}: {
  value: string;
  children: JSX.Element[] | JSX.Element;
  className?: string;
}) => {
  return (
    <Tabs.Content
      className={classNames(
        'grid grid-cols-1 justify-items-center mt-4',
        className ?? ''
      )}
      value={value}>
      {children}
    </Tabs.Content>
  );
};

export default withSessionGuard(BuilderPage);
