import * as DialogPrimitive from "@radix-ui/react-dialog";

import {removeUnderscoreAndCapitalize} from "../../utils/RemoveUnderscoreAndCapitalize";
import capitalize from "../../utils/capitalize";
import {formatPoolResources} from "../../utils/FormatPoolResources";
import {PowerWithDiscipline} from "../../types/PowerWithDiscipline";
import {uniqueBy} from "../../utils/uniques";
import {trpc} from "../../utils/trpc";
import {FullDiscipline} from "../../types/FullDiscipline";
import {CloseButton} from "../core/CloseButton";

import {PowerCard} from "./PowerCard";

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
        <td className="py-4 px-6">{removeUnderscoreAndCapitalize(power.cost)}</td>
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

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogContent = DialogPrimitive.Content;
const DialogClose = DialogPrimitive.Close;
const StyledOverlay = DialogPrimitive.Overlay;

const LearnPowerButton = ({
  powers,
  disciplines,
}: {
  powers: PowerWithDiscipline[];
  disciplines: FullDiscipline[];
}) => {
  const payloadDisciplines = uniqueBy(
    disciplines
      .map((discipline) => ({
        disciplineName: discipline.baseDiscipline.name,
        lvl: discipline.points,
      }))
      .sort((p1, p2) => p2.lvl - p1.lvl),
    (power) => power.disciplineName,
  );

  const {data: learnablePowers, isLoading} = trpc.useQuery([
    "powers.learnable-powers",
    {
      disciplines: payloadDisciplines,
    },
  ]);

  if (isLoading || !learnablePowers) {
    return <div>sad</div>;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
          Learn
        </button>
      </DialogTrigger>
      <DialogContent className="flex items-center justify-center">
        <div
          aria-hidden="true"
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
          id="defaultModal">
          <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Powers</h3>
                <DialogClose asChild>
                  <CloseButton />
                </DialogClose>
              </div>
              <div className="p-6 space-y-6">
                <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                  <div className="space-y-3">
                    {learnablePowers.map((lp) => (
                      <PowerCard key={lp.id} {...lp} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                <button
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  data-modal-toggle="defaultModal"
                  type="button">
                  I accept
                </button>
                <button
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  data-modal-toggle="defaultModal"
                  type="button">
                  Decline
                </button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const Powers = ({powers, className = "", disciplines}: PowersProps) => (
  <>
    <div className={`grid grid-cols-3 ${className}`}>
      <div />
      <h2 className="text-4xl text-center mb-2">Powers</h2>

      <div className="flex flex-row col-span-1 justify-end">
        <LearnPowerButton disciplines={disciplines} powers={powers} />
      </div>
    </div>

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
