import removeUnderscoreAndCapitalize from '../../utils/formating/removeUnderscoreAndCapitalize';
import capitalize from '../../utils/formating/capitalize';
import {formatPoolResources} from '../../utils/formating/formatPoolResources';
import {PowerWithDiscipline} from '../../types/PowerWithDiscipline';
import {FullDiscipline} from '../../types/FullDiscipline';

import {LearnPowerButton} from './LearnPowerButton';

interface PowersProps {
  powers: PowerWithDiscipline[];
  className?: string;
  disciplines: FullDiscipline[];
}

interface PowersTableRowProps {
  index: number;
  power: PowerWithDiscipline;
}

const PowersTableRow = ({power, index}: PowersTableRowProps) => {
  const styles =
    index % 2 === 0
      ? 'dark:bg-gray-900 bg-white'
      : 'bg-gray-50 dark:bg-gray-800';

  return (
    <>
      <tr className={`${styles} border-b bg-white dark:border-gray-700`}>
        <th
          className="whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white"
          scope="row">
          {removeUnderscoreAndCapitalize(power.discipline.name)}
        </th>
        <td className="py-4 px-6">{power.level}</td>
        <td className="py-4 px-6">
          {removeUnderscoreAndCapitalize(power.name)}
        </td>
        <td className="py-4 px-6">
          {removeUnderscoreAndCapitalize(power.cost)}
        </td>
        <td className="py-4 px-6">
          {formatPoolResources(
            power.firstPoolResource,
            power.secondPoolResource
          )}
        </td>
        <td className="py-4 px-6">
          {formatPoolResources(
            power.vsFirstPoolResource,
            power.vsSecondPoolResource
          )}
        </td>
        <td className="py-4 px-6">{capitalize(power.duration)}</td>
      </tr>
    </>
  );
};

export const Powers = ({powers, className = '', disciplines}: PowersProps) => (
  <>
    <div className={`grid grid-cols-3 ${className}`}>
      <div />
      <h2 className="mb-2 text-center text-4xl">Powers</h2>

      <div className="col-span-1 flex flex-row justify-end">
        <LearnPowerButton disciplines={disciplines} powers={powers} />
      </div>
    </div>

    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="py-3 px-6" scope="col">
              Discipline
            </th>
            <th className="py-3 px-6" scope="col">
              Lvl
            </th>
            <th className="py-3 px-6" scope="col">
              Name
            </th>
            <th className="py-3 px-6" scope="col">
              Cost
            </th>
            <th className="py-3 px-6" scope="col">
              Dice Pool
            </th>
            <th className="py-3 px-6" scope="col">
              vs Dice Pool
            </th>
            <th className="py-3 px-6" scope="col">
              Duration
            </th>
          </tr>
        </thead>
        <tbody>
          {powers.map((power, index) => (
            <PowersTableRow key={power.id} index={index} power={power} />
          ))}
        </tbody>
      </table>
    </div>
  </>
);
