import {useRouter} from "next/router";

import {trpc} from "../../utils/trpc";
import {Kindred} from "../../interfaces/Kindred";

const KindredSheetPage = () => {
  const {id: kindredId} = useRouter().query;
  const {isLoading, data: kindred} = trpc.useQuery(["find-kindred", {kindredId: +kindredId}]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!kindred) {
    return <div>Kindred not found</div>;
  }

  return <div>{kindred.name}</div>;
};

export default KindredSheetPage;
