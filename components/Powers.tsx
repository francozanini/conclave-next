import * as DialogPrimitive from "@radix-ui/react-dialog";

import {removeUnderscoreAndCapitalize} from "../utils/RemoveUnderscoreAndCapitalize";
import capitalize from "../utils/capitalize";
import {formatPoolResources} from "../utils/FormatPoolResources";
import {PowerWithDiscipline} from "../types/PowerWithDiscipline";

interface PowersProps {
  powers: PowerWithDiscipline[];
  className?: string;
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

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogContent = DialogPrimitive.Content;
const DialogClose = DialogPrimitive.Close;
const StyledOverlay = DialogPrimitive.Overlay;

const LearnPowerButton = () => (
  <Dialog>
    <DialogTrigger asChild>
      <button className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
        Learn
      </button>
    </DialogTrigger>
    <DialogContent className="flex items-center justify-center">
      <div className="fixed flex flex-col items-center justify-center w-full max-w-md px-3 py-32 mx-auto text-center transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg md:max-w-3xl lg:max-w-4xl sm:rounded-3xl left-1/2 top-1/2">
        <h2 className="mb-12 text-3xl font-medium font-title md:text-6xl">
          ¿Are you absolutely sure?
        </h2>
        <p className="max-w-md px-2 mx-auto text-xl leading-8 ">
          This action cannot be undone. This will permanently delete your account and remove your
          data from our servers.
        </p>
        <div className="px-6 py-2 mt-8 font-mono text-2xl font-normal leading-6 uppercase tracking-button btn btn-primary ">
          Join us
        </div>
        <span className="font-mono text-sm font-bold">or click outside</span>
      </div>
      <DialogClose asChild>
        <button className="fixed top-0 right-0 flex flex-col items-center justify-center p-3 text-gray-100 duration-500 bg-gray-900 bg-opacity-50 outline-none cursor-pointer lg:p-6 hover:bg-opacity-100 lg:bg-transparent lg:hover:opacity-30">
          <span className="hidden font-mono md:block">esc</span>
        </button>
      </DialogClose>
    </DialogContent>
  </Dialog>
);

export const Powers = ({powers, className = ""}: PowersProps) => (
  <>
    <div className={`grid grid-cols-3 ${className}`}>
      <div />
      <h2 className="text-4xl text-center mb-2">Powers</h2>

      <div className="flex flex-row col-span-1 justify-end">
        <LearnPowerButton />
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
