import {UseQueryResult} from "react-query";

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
                </div>
              </div>
            ),
          )}
        </div>
      </section>
    )
  );
};

export default IndexPage;
