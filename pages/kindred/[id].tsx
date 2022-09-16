import { useRouter } from "next/router";
import KindredDetails from "../../components/KindredDetails";
import { trpc } from "../../utils/trpc";
import { inferQueryResponse } from "../api/trpc/[trpc]";


export type Kindred = inferQueryResponse<"find-kindred">;

const KindredSheetPage = () => {
  const {id: kindredId} = useRouter().query;
  const {
    isLoading,
    isError,
    data: kindred,
  } = trpc.useQuery(["find-kindred", {kindredId: +kindredId}]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !kindred) {
    return <div>Kindred not found</div>;
  }

  return (
    <section className="mx-2 mt-2">
      <KindredDetails kindred={kindred} />
      <Attributes />
    </section>
  );
};

export default KindredSheetPage;
