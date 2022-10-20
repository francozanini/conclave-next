import {removeUnderscoreAndCapitalize} from "../../utils/RemoveUnderscoreAndCapitalize";
import {trpc} from "../../utils/trpc";
import {PowerWithDiscipline} from "../../types/PowerWithDiscipline";
import Card from "../core/Card";
import {FullDiscipline} from "../../types/FullDiscipline";

import Trackable from "./Trackable";
import {Powers} from "./Powers";

interface DisciplinesProps {
  disciplines: FullDiscipline[];
  powers: PowerWithDiscipline[];
  kindredId: number;
  refetch: Function;
}

export const Disciplines = ({disciplines, refetch, kindredId, powers}: DisciplinesProps) => {
  const changePoints = trpc.useMutation("kindred.changeDisciplines", {onSuccess: () => refetch()});

  return (
    <Card className={"min-w-md lg:max-w-fit"}>
      <h1 className={"text-center text-4xl mb-3"}>Disciplines</h1>
      <>
        {disciplines.map((discipline) => (
          <div key={discipline.id} className={`flex flex-row justify-between mb-2`}>
            <span className="text-xl mr-2">
              {removeUnderscoreAndCapitalize(discipline.baseDiscipline.name)}
            </span>
            <Trackable
              amount={discipline.points}
              onChange={(newAmount) =>
                changePoints.mutate({
                  newAmountOfPoints: newAmount,
                  knownDisciplineId: discipline.id,
                  kindredId,
                })
              }
            />
          </div>
        ))}
      </>
      <Powers className={"mt-8"} disciplines={disciplines} powers={powers} />
    </Card>
  );
};