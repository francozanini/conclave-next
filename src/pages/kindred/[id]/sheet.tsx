import {useRouter} from 'next/router';
import {createContext} from 'react';

import Attributes from '../../../modules/sheet/Attributes';
import KindredDetails from '../../../modules/sheet/KindredDetails';
import {trpc} from '../../../utils/trpcClient';
import {Skills} from '../../../modules/sheet/Skills';
import {Disciplines} from '../../../modules/sheet/Disciplines';
import {Kindred} from '../../../types/Kindred';
import withSessionGuard from '../../../modules/auth/SessionGuard';
import Card from '../../../modules/core/Card';
import {TrackerState} from '../../../types/TrackerState';
import classNames from '../../../utils/classNames';

export const KindredIdContext = createContext<string>('');

function Trackers(props: {
  maxHp: number;
  aggravatedHp: number;
  superficialHp: number;
  willpower: number;
  aggravatedWillpower: number;
  superficialWillpower: number;
  humanity: number;
  hunger: number;
}) {
  const zeroToNine = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const healthTracker: TrackerState[] = [];
  const willPowerTracker = [];
  const humanityTracker: ('empty' | 'fill')[] = [];

  return (
    <Card className="flex flex-col gap-4" maxWidth="2xl">
      <div>
        <div className="text-xl text-center">Health</div>
        <div>
          <div className="flex flex-row gap-1 mt-1">
            {zeroToNine.map(n => (
              <div
                key={n}
                className={classNames(
                  'w-8 h-8 border-2 border-gray-500 rounded-2xl',
                  n < props.maxHp && 'bg-gray-900'
                )}
              />
            ))}
          </div>
          <div className="flex flex-row gap-1 mt-1">
            {zeroToNine.map(n => (
              <div
                key={n}
                className={classNames(
                  'w-8 h-8 border-2 border-gray-500',
                  n < props.maxHp && 'bg-gray-900'
                )}
              />
            ))}
          </div>
        </div>
      </div>
      <div>Willpower: {props.willpower}</div>
      <div>Humanity: {props.humanity}</div>
      <div>Hunger: {props.hunger}</div>
    </Card>
  );
}

const KindredSheetPage = () => {
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
    <section className="m-4 mt-2 grid grid-cols-1 justify-items-center gap-4 ">
      <KindredIdContext.Provider value={kindredId}>
        <KindredDetails
          {...kindred}
          updateKindred={(updatedKindred: Kindred) => {
            trpcContextState.kindred.findById.setData(
              {kindredId: kindred.id},
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
        <Attributes {...kindred} refetch={refetch} />
        <Trackers
          aggravatedHp={kindred.aggravatedHealth}
          aggravatedWillpower={kindred.aggravatedWillpower}
          humanity={kindred.humanity}
          hunger={kindred.hunger}
          maxHp={kindred.resolve + kindred.stamina + 3}
          superficialHp={kindred.superficialHealth}
          superficialWillpower={kindred.superficialWillpower}
          willpower={kindred.composure + kindred.resolve}
        />
        <Skills {...kindred} refetch={refetch} />
        <Disciplines
          disciplines={kindred.disciplines}
          powers={kindred.powers.map(learnedPower => learnedPower.basePower)}
          refetch={refetch}
        />
      </KindredIdContext.Provider>
    </section>
  );
};

export default withSessionGuard(KindredSheetPage);
