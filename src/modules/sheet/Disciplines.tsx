import {useContext} from 'react';

import removeUnderscoreAndCapitalize from '../../utils/formating/removeUnderscoreAndCapitalize';
import {trpc} from '../../utils/trpcClient';
import {PowerWithDiscipline} from '../../types/PowerWithDiscipline';
import Card from '../core/Card';
import {FullDiscipline} from '../../types/FullDiscipline';
import {KindredIdContext} from '../../pages/kindred/[id]/sheet';

import Trackable from './Trackable';
import {Powers} from './Powers';

interface DisciplinesProps {
  disciplines: FullDiscipline[];
  powers: PowerWithDiscipline[];
  refetch: Function;
}

export const Disciplines = ({
  disciplines,
  refetch,
  powers
}: DisciplinesProps) => {
  const kindredId = +useContext(KindredIdContext);
  const changePoints = trpc.kindred.changeDisciplines.useMutation({
    onSuccess: () => refetch()
  });

  return (
    <Card className={'lg:max-w-fit'}>
      <h1 className={'mb-3 text-center text-4xl'}>Disciplines</h1>
      <>
        {disciplines.map(discipline => (
          <div
            key={discipline.id}
            className={`mb-2 flex flex-row justify-between`}>
            <span className="mr-2 text-xl">
              {removeUnderscoreAndCapitalize(discipline.baseDiscipline.name)}
            </span>
            <Trackable
              amount={discipline.points}
              onChange={newAmount =>
                changePoints.mutate({
                  newAmountOfPoints: newAmount,
                  knownDisciplineId: discipline.id,
                  kindredId
                })
              }
            />
          </div>
        ))}
      </>
      <Powers className={'mt-8'} disciplines={disciplines} powers={powers} />
    </Card>
  );
};
