import {UseQueryResult} from "react-query";

import Incrementable from "../components/Incremental";
import {withTrackerSymbols} from "../components/Tracker";
import TrackerCell from "../components/TrackerCell";
import {trpc} from "../utils/trpc";

import {inferQueryResponse} from "./api/trpc/[trpc]";

type Chronicle = inferQueryResponse<"find-chronicle">;
type Kindred = inferQueryResponse<"find-kindred">;

const IndexPage = () => {
  const {
    data: chronicle,
    isLoading,
    refetch,
  }: UseQueryResult<Chronicle> = trpc.useQuery(["find-chronicle", {chronicleId: 1}]);

  return (
    chronicle && (
      <section>
        <h1 className={"text-8xl text-center"}>{chronicle.name}</h1>
        <div className={"flex flex-col flex-wrap justify-center md:flex-row items-center m-2 p-1 "}>
          {chronicle.kindred.map(
            ({
              name,
              aggravatedHealth,
              superficialHealth,
              damagedHumanity,
              humanity,
              superficialWillpower,
              aggravatedWillpower,
              stamina,
              composure,
              resolution,
              hunger,
              experience,
            }: Kindred) => (
              <div
                key={name}
                className={"bg-gray-800 shadow-md p-6 max-w-sm my-1 md:mx-2 rounded-lg"}>
                <h2 className={"mb-2 text-4xl font-bold capitalized text-center"}>{name}</h2>
                <div className="w-full border-b border-gray-300 mb-2" />
                <div className="flex flex-col">
                  <div>{experience} points of experience</div>
                  <div>{hunger} hunger</div>
                  <Incrementable
                    currentAmount={hunger}
                    decrease={() => console.log(hunger)}
                    increase={() => console.log(hunger)}
                    label={"hunger"}
                  />
                  <Tracker
                    aggravated={aggravatedHealth}
                    max={stamina + 3}
                    name="health"
                    superficial={superficialHealth}
                  />
                  <Tracker
                    aggravated={aggravatedWillpower}
                    max={composure + resolution}
                    name="willpower"
                    superficial={superficialWillpower}
                  />
                </div>
              </div>
            ),
          )}
        </div>
      </section>
    )
  );
};

const Tracker = ({
  name,
  aggravated,
  superficial,
  max,
}: {
  name: string;
  aggravated: number;
  superficial: number;
  max: number;
}) => {
  return (
    <div className={"flex justify-around "}>
      <h3 className={"capitalize text-xl"}>{name}</h3>
      <div className={"flex"}>
        {withTrackerSymbols({aggravated, superficial, max}).map((track, index) => {
          return <TrackerCell key={index} i={index} state={track} />;
        })}
      </div>
    </div>
  );
};

export default IndexPage;
