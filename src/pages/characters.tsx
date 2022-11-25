import withSessionGuard from '../modules/auth/SessionGuard';
import Button from '../modules/core/Button';
import {trpc} from '../utils/trpcClient';

function CharactersPage() {
  const {data} = trpc.characters.findForUser.useQuery();
  const {mutate} = trpc.characters.newCharacter.useMutation();

  return (
    <>
      <div className="m-2 justify-between flex">
        <h1 className="text-4xl">My Characters</h1>
        <Button color="gray" onClick={() => mutate()}>
          Create Character
        </Button>
      </div>
      <div>
        {data?.map(kindred => (
          <div key={kindred.id}>{kindred.name}</div>
        ))}
      </div>
    </>
  );
}

export default withSessionGuard(CharactersPage);
