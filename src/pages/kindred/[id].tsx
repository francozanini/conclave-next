import {useRouter} from 'next/router';
import {createContext} from 'react';

import Attributes from '../../modules/sheet/Attributes';
import KindredDetails from '../../modules/sheet/KindredDetails';
import {trpc} from '../../utils/trpcClient';
import {Skills} from '../../modules/sheet/Skills';
import {Disciplines} from '../../modules/sheet/Disciplines';
import {Kindred} from '../../types/Kindred';
import withSessionGuard from '../../modules/auth/SessionGuard';

export const KindredIdContext = createContext<string>('');

const KindredSheetPage = () => {
  const trpcContextState = trpc.useContext();
  const kindredId = useRouter().query.id as string;
  const {
    isLoading,
    isError,
    refetch,
    data: kindred
  } = trpc.kindred.findById.useQuery(
    {kindredId: +kindredId},
    {
      refetchOnReconnect: false,
      refetchOnWindowFocus: true,
      trpc: {}
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !kindred) {
    return <div>Kindred not found</div>;
  }

  return (
    <section className="m-4 mt-2 grid grid-cols-1 justify-items-center gap-4 ">
      <KindredIdContext.Provider value={kindredId}>
        <KindredDetails
          {...kindred}
          updateKindred={(updatedKindred: Kindred) => {
            trpcContextState.kindred.findById.setData(oldKindred => ({
              ...oldKindred,
              ...updatedKindred
            }));
            trpcContextState.kindred.findById.invalidate({
              kindredId: +kindredId
            });
          }}
        />
        <Attributes {...kindred} refetch={refetch} />
        <Skills {...kindred} refetch={refetch} />
        <Disciplines
          disciplines={kindred.disciplines}
          powers={kindred.powers.map(learnedPower => learnedPower.basePower)}
          refetch={refetch}
        />
      </KindredIdContext.Provider>
    </section>
  );
};

export default withSessionGuard(KindredSheetPage);
