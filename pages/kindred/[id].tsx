import {useRouter} from 'next/router';
import {createContext} from 'react';

import Attributes from '../../components/sheet/Attributes';
import KindredDetails from '../../components/sheet/KindredDetails';
import {trpc} from '../../utils/trpc';
import {inferQueryResponse} from '../api/trpc/[trpc]';
import {Skills} from '../../components/sheet/Skills';
import {Disciplines} from '../../components/sheet/Disciplines';

export type Kindred = inferQueryResponse<'kindred.find-by-id'>;

export const KindredIdContext = createContext<string>('');

const KindredSheetPage = () => {
  const trpcContextState = trpc.useContext();
  const kindredId = useRouter().query.id as string;
  const {
    isLoading,
    isError,
    refetch,
    data: kindred,
  } = trpc.useQuery(['kindred.find-by-id', {kindredId: +kindredId}], {
    refetchInterval: 10000,
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
    <section className="m-4 mt-2 grid grid-cols-1 justify-items-center gap-4 ">
      <KindredIdContext.Provider value={kindredId}>
        <KindredDetails
          {...kindred}
          updateKindred={(updatedKindred: Kindred) => {
            trpcContextState.setQueryData(
              ['kindred.find-by-id'],
              (oldKindred) => ({
                ...oldKindred,
                ...updatedKindred,
              })
            );
            trpcContextState.invalidateQueries(['kindred.find-by-id']);
          }}
        />
        <Attributes {...kindred} refetch={refetch} />
        <Skills {...kindred} refetch={refetch} />
        <Disciplines
          disciplines={kindred.disciplines}
          powers={kindred.powers.map((learnedPower) => learnedPower.basePower)}
          refetch={refetch}
        />
      </KindredIdContext.Provider>
    </section>
  );
};

export default KindredSheetPage;
