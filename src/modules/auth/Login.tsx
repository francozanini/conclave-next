import {signIn, signOut, useSession} from 'next-auth/react';

import {trpc} from '../../utils/trpcClient';
import Button from '../core/Button';

const Login = () => {
  const {data: sessionData} = useSession();
  const {data: secretMessage} = trpc.auth.getSecretMessage.useQuery(
    undefined, // no input
    {enabled: sessionData?.user !== undefined}
  );

  return (
    <section>
      <div className="mt-40 justify-items-center items-center flex flex-col ">
        <h1 className="text-8xl">Conclave</h1>
        <div className="mt-4">
          <Button
            className="py-3"
            color="blue"
            onClick={sessionData ? () => signOut() : () => signIn()}>
            Continue with Discord
          </Button>
        </div>
        <div>
          <p className="text-center text-2xl text-white">
            {sessionData && <span>Logged in as {sessionData?.user?.name}</span>}
            {secretMessage && <span> - {secretMessage}</span>}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
