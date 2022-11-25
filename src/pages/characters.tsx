import {useRouter} from 'next/router';

import withSessionGuard from '../modules/auth/SessionGuard';
import Button from '../modules/core/Button';
import Card from '../modules/core/Card';
import {trpc} from '../utils/trpcClient';

function CharactersPage() {
  const router = useRouter();
  const {data} = trpc.characters.findForUser.useQuery();
  const {mutate} = trpc.characters.newCharacter.useMutation({
    onSettled: createdKindred => router.push(`/kindred/${createdKindred?.id}`)
  });

  return (
    <>
      <div className="m-2 justify-between flex">
        <h1 className="text-4xl font-bold uppercase">My Characters</h1>
        <Button
          className="font-bold px-4 py-3 uppercase"
          color="gray"
          onClick={() => mutate()}>
          Create a Character
        </Button>
      </div>
      <div className="justify-between mt-4 gap-4 items-center flex flex-col">
        {data?.map(kindred => (
          <Card key={kindred.id} className="flex justify-between">
            <div>{kindred.name}</div>
            <Button borderless className="uppercase font-bold">
              edit
            </Button>
          </Card>
        ))}
      </div>
    </>
  );
}

export default withSessionGuard(CharactersPage);
