import {UseQueryResult} from "react-query";

import Tracker, {TrackableFromServer} from "../components/Tracker";
import {trpc} from "../utils/trpc";

import {inferQueryResponse} from "./api/trpc/[trpc]";

type KindredFromServer = inferQueryResponse<"find-kindred">[0];

const IndexPage = () => {
  const {
    data: kindred,
    isLoading,
    refetch,
  }: UseQueryResult<KindredFromServer[]> = trpc.useQuery(["find-kindred"]);
  const saveMutation = trpc.useMutation(["save-kindred"]);

  const changeKindredTrackable = (kindredName: string, changedTrackable: TrackableFromServer) => {
    saveMutation.mutate(changedTrackable, {onSuccess: () => refetch()});
  };

  const fetchingNext = saveMutation.isLoading || isLoading;

  return (
    <section className={"flex flex-col flex-wrap justify-center md:flex-row items-center m-2 p-1 "}>
      {kindred &&
        kindred.map(({name, trackables}: KindredFromServer) => (
          <div key={name} className={"bg-gray-800 shadow-md p-6 max-w-sm my-1 md:mx-2 rounded-lg"}>
            <h2 className={"mb-2 text-4xl font-bold capitalized text-center"}>{name}</h2>
            <div className="w-full border-b border-gray-300 mb-2" />
            {trackables.map((trackable) => (
              <Tracker
                key={trackable.name}
                changeTrackable={(changedTrackable: TrackableFromServer) =>
                  changeKindredTrackable(name, changedTrackable)
                }
                trackable={trackable}
              />
            ))}
          </div>
        ))}
    </section>
  );
};

export default IndexPage;
