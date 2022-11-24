import * as DialogPrimitive from '@radix-ui/react-dialog';
import {useState} from 'react';

import {PowerWithDiscipline} from '../../types/PowerWithDiscipline';
import {FullDiscipline} from '../../types/FullDiscipline';
import {trpc} from '../../utils/trpcClient';
import {CloseButton} from '../core/CloseButton';
import {includesBy} from '../../utils/arrays/includesBy';

import {PowerCard} from './PowerCard';

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogContent = DialogPrimitive.Content;
const DialogClose = DialogPrimitive.Close;

export const LearnPowerButton = ({
  powers,
  disciplines
}: {
  powers: PowerWithDiscipline[];
  disciplines: FullDiscipline[];
}) => {
  const [isOpen, setIsOpen] = useState(false);

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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="mr-2 mb-2 rounded-lg border border-gray-200 bg-white py-2.5 px-5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
          Learn
        </button>
      </DialogTrigger>
      <DialogContent className="flex items-center justify-center ">
        <div
          aria-hidden="true"
          className="fixed inset-x-0 top-0 z-50 w-full overflow-y-auto overflow-x-hidden md:inset-0 md:h-full"
          id="defaultModal">
          <div className="relative h-full w-full max-w-2xl p-4 md:h-auto mx-auto">
            <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
              <div className="flex items-start justify-between rounded-t border-b p-4 dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Powers
                </h3>
                <DialogClose asChild>
                  <CloseButton close={() => setIsOpen(false)} />
                </DialogClose>
              </div>
              <div className="space-y-6 p-6">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <div className="space-y-3">
                    {learnablePowers.map(lp => (
                      <PowerCard
                        key={lp.id}
                        {...lp}
                        alreadyLearnt={includesBy(
                          power => power.name === lp.name,
                          powers
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
