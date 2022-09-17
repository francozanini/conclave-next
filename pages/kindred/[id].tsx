import {useRouter} from "next/router";

import Attributes from "../../components/Attributes";
import KindredDetails from "../../components/KindredDetails";
import {trpc} from "../../utils/trpc";
import {inferQueryResponse} from "../api/trpc/[trpc]";
import {Skills} from "../../components/Skills";

export type Kindred = inferQueryResponse<"find-kindred">;

const KindredSheetPage = () => {
  const {id: kindredId} = useRouter().query;
  const {
    isLoading,
    isError,
    refetch,
    data: kindred,
  } = trpc.useQuery(["find-kindred", {kindredId: +kindredId}], {
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !kindred) {
    return <div>Kindred not found</div>;
  }

  return (
    <section className="mx-4 mt-2 flex flex-col gap-2">
      <KindredDetails {...kindred} />
      <Attributes {...kindred} refetch={refetch} />
      <Skills {...kindred} refetch={refetch} />
    </section>
  );
};

export default KindredSheetPage;
