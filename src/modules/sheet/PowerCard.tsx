import {useState} from 'react';

import {PowerWithDiscipline} from '../../types/PowerWithDiscipline';
import removeUnderscoreAndCapitalize from '../../utils/formating/removeUnderscoreAndCapitalize';
import Button from '../core/Button';
import {trpc} from '../../utils/trpcClient';

interface PowerCardProps {
  alreadyLearnt: boolean;
  kindredId: number;
}

function useToggle(defaultValue: boolean = false): [boolean, () => void] {
  const [isToggled, setToggled] = useState(defaultValue);
  return [isToggled, () => (isToggled ? setToggled(false) : setToggled(true))];
}

export function PowerCard({
  name,
  discipline,
  alreadyLearnt,
  kindredId
}: PowerCardProps & PowerWithDiscipline) {
  const [optimisticAlreadyLearnt, optimisticallyToggleIsAlreadyLearnt] =
    useToggle(alreadyLearnt);
  const toggleLearned = trpc.powers.learnOrUnlearn.useMutation({
    onMutate: () => optimisticallyToggleIsAlreadyLearnt()
  });

  return (
    <div className="group w-full flex justify-between rounded-lg p-3 text-base font-bold hover:shadow dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
      <div className="flex flex-col">
        <span className="pb-1">{removeUnderscoreAndCapitalize(name)}</span>
        <span className="mr-2 w-fit rounded bg-red-800 px-2.5 py-0.5 text-xs font-semibold">
          {removeUnderscoreAndCapitalize(discipline.name)}
        </span>
      </div>
      <div className="flex flex-row">
        <Button
          className="py-0.5 px-3"
          onClick={() =>
            toggleLearned.mutate({kindredId: +kindredId, powerName: name})
          }>
          {optimisticAlreadyLearnt ? 'X' : 'Learn'}
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
