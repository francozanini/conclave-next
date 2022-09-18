import {useRouter} from "next/router";

import Attributes from "../../components/Attributes";
import KindredDetails from "../../components/KindredDetails";
import {trpc} from "../../utils/trpc";
import {inferQueryResponse} from "../api/trpc/[trpc]";
import {Skills} from "../../components/Skills";
import {Disciplines} from "../../components/Disciplines";

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
    <section className="justify-items-center mt-2 m-4 grid grid-cols-1 gap-4 ">
      <KindredDetails {...kindred} />
      <Attributes {...kindred} refetch={refetch} />
      <Skills {...kindred} refetch={refetch} />
      <Disciplines disciplines={kindred.disciplines} kindredId={kindred.id} refetch={refetch} />
    </section>
  );
};

export default KindredSheetPage;
