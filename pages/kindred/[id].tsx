import {useRouter} from "next/router";

import Attributes from "../../components/Attributes";
import KindredDetails from "../../components/KindredDetails";
import {trpc} from "../../utils/trpc";
import {inferQueryResponse} from "../api/trpc/[trpc]";
import {Skills} from "../../components/Skills";
import {Disciplines} from "../../components/Disciplines";

export type Kindred = inferQueryResponse<"kindred.find-by-id">;

const KindredSheetPage = () => {
  const trpcContextState = trpc.useContext();
  const {id: kindredId} = useRouter().query;
  const {
    isLoading,
    isError,
    refetch,
    data: kindred,
  } = trpc.useQuery(["kindred.find-by-id", {kindredId: +kindredId}], {
    refetchInterval: 5000,
    refetchOnReconnect: false,
    refetchOnWindowFocus: true,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !kindred) {
    return <div>Kindred not found</div>;
  }

  return (
    <section className="justify-items-center mt-2 m-4 grid grid-cols-1 gap-4 ">
      <KindredDetails
        {...kindred}
        updateKindred={(updatedKindred: Kindred) => {
          trpcContextState.setQueryData(["kindred.find-by-id"], (oldKindred) => ({
            ...oldKindred,
            ...updatedKindred,
          }));
          trpcContextState.invalidateQueries(["kindred.find-by-id"]);
        }}
      />
      <Attributes {...kindred} refetch={refetch} />
      <Skills {...kindred} refetch={refetch} />
      <Disciplines
        disciplines={kindred.disciplines}
        kindredId={kindred.id}
        powers={kindred.powers.map((learnedPower) => learnedPower.basePower)}
        refetch={refetch}
      />
    </section>
  );
};

export default KindredSheetPage;
