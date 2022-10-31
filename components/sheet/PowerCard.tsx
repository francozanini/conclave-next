import {useContext} from 'react';

import {PowerWithDiscipline} from '../../types/PowerWithDiscipline';
import {removeUnderscoreAndCapitalize} from '../../utils/RemoveUnderscoreAndCapitalize';
import Button from '../core/Button';
import {KindredIdContext} from '../../pages/kindred/[id]';
import {trpc} from '../../utils/trpc';

interface PowerCardProps {
  alreadyLearnt: boolean;
}

export function PowerCard({
  name,
  discipline,
  alreadyLearnt,
}: PowerCardProps & PowerWithDiscipline) {
  const kindredId = useContext(KindredIdContext);
  const toggleLearned = trpc.useMutation(['powers.learnOrUnlearn']);

  return (
    <div className="group flex justify-between rounded-lg p-3 text-base font-bold hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500">
      <div className="flex flex-col">
        <span className="pb-1">{removeUnderscoreAndCapitalize(name)}</span>
        <span className="mr-2 w-fit rounded bg-purple-200 px-2.5 py-0.5 text-xs font-semibold text-purple-900">
          {removeUnderscoreAndCapitalize(discipline.name)}
        </span>
      </div>
      <div className="flex flex-row">
        <Button
          className="py-0.5 px-3"
          onClick={() =>
            toggleLearned.mutate({kindredId: +kindredId, powerName: name})
          }>
          {alreadyLearnt ? 'X' : 'Learn'}
        </Button>
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
