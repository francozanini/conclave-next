import {useRouter} from 'next/router';
import {useAutoAnimate} from '@formkit/auto-animate/react';

import withSessionGuard from '../modules/auth/SessionGuard';
import Button from '../modules/core/Button';
import Card from '../modules/core/Card';
import {trpc} from '../utils/trpcClient';

function CharactersPage() {
  const trpcContext = trpc.useContext();
  const router = useRouter();
  const {data} = trpc.characters.findForUser.useQuery();
  const {mutate: createKindred} = trpc.characters.newCharacter.useMutation({
    onSettled: createdKindred =>
      router.push(`/kindred/${createdKindred?.id}/builder`)
  });
  const {mutate: deleteCharacter} = trpc.characters.deleteCharacter.useMutation(
    {onSuccess: () => trpcContext.characters.findForUser.invalidate()}
  );
  const [parent] = useAutoAnimate<HTMLDivElement>();

  return (
    <section className="max-w-7xl mx-1 lg:mx-4 xl:mx-auto">
      <div className="m-2 justify-between flex">
        <h1 className="text-4xl font-bold uppercase">My Characters</h1>
        <Button
          className="font-bold px-4 py-3 uppercase"
          color="gray"
          onClick={() => createKindred()}>
          Create a Character
        </Button>
      </div>
      <div
        ref={parent}
        className="justify-start flex flex-col lg:flex-row flex-wrap items-center mt-4 gap-4">
        {data?.length === 0 ? (
          <h2 className="text-center">You have no characters</h2>
        ) : (
          data?.map(({id, name}) => (
            <Card
              key={id}
              className="md:max-w-md max-w-2xl xl:max-w-sm flex justify-between">
              <h2 className="text-xl font-medium">
                {name.length > 15 ? name.substring(0, 15) + '...' : name}
              </h2>
              <div>
                <Button
                  borderless
                  className="uppercase font-bold"
                  onClick={() => router.push(`/kindred/${id}`)}>
                  edit
                </Button>
                <Button
                  borderless
                  className="uppercase font-bold"
                  onClick={() => deleteCharacter({kindredId: id})}>
                  delete
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </section>
  );
}

export default withSessionGuard(CharactersPage);
