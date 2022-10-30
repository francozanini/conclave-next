import { PowerWithDiscipline } from '../../types/PowerWithDiscipline';
import { removeUnderscoreAndCapitalize } from '../../utils/RemoveUnderscoreAndCapitalize';
import Button from '../core/Button';

export function PowerCard({ name, discipline }: PowerWithDiscipline) {
  return (
    <div className="flex justify-between p-3 text-base font-bold rounded-lg group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
      <div className="flex flex-col">
        <span className="pb-1">{removeUnderscoreAndCapitalize(name)}</span>
        <span className="w-fit text-xs font-semibold mr-2 px-2.5 py-0.5 rounded bg-purple-200 text-purple-900">
          {removeUnderscoreAndCapitalize(discipline.name)}
        </span>
      </div>
      <div className="flex flex-row">
        <Button className="py-0.5 px-3">Learn</Button>
        <svg
          className="w-6 h-6"
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
