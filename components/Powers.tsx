import {Discipline, Power} from "@prisma/client";

import {removeUnderscoreAndCapitalize} from "../utils/RemoveUnderscoreAndCapitalize";
import capitalize from "../utils/capitalize";
import {formatPoolResources} from "../utils/FormatPoolResources";

type PowerWithDiscipline = Power & {discipline: Discipline};

interface PowersProps {
  powers: PowerWithDiscipline[];
}

interface PowersTableRowProps {
  index: number;
  power: PowerWithDiscipline;
}

const PowersTableRow = ({power, index}: PowersTableRowProps) => {
  const styles = index % 2 === 0 ? "dark:bg-gray-900 bg-white" : "bg-gray-50 dark:bg-gray-800";

  return (
    <>
      <tr className={`${styles} bg-white border-b dark:border-gray-700`}>
        <th
          className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          scope="row">
          {removeUnderscoreAndCapitalize(power.discipline.name)}
        </th>
        <td className="py-4 px-6">{power.level}</td>
        <td className="py-4 px-6">{removeUnderscoreAndCapitalize(power.name)}</td>
        <td className="py-4 px-6">{power.cost}</td>
        <td className="py-4 px-6">
          {formatPoolResources(power.firstPoolResource, power.secondPoolResource)}
        </td>
        <td className="py-4 px-6">
          {formatPoolResources(power.vsFirstPoolResource, power.vsSecondPoolResource)}
        </td>
        <td className="py-4 px-6">{capitalize(power.duration)}</td>
      </tr>
    </>
  );
};

export const Powers = ({powers}: PowersProps) => (
  <>
    <h2 className={"text-4xl text-center mb-2"}>Powers</h2>
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
