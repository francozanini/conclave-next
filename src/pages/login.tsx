import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Button from '../components/core/Button';
import { trpc } from '../utils/trpcClient';

const LoginPage = () => {
  const { data: sessionData } = useSession();
  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );
  const router = useRouter();
  
  if(sessionData) {
    router.push('/');
  }


  return (
    <main>
      <div className="mt-40 justify-items-center items-center flex flex-col ">
        <h1 className="text-8xl">Conclave</h1>
        <div className="mt-4">
          <Button
            onClick={sessionData ? () => signOut() : () => signIn()}
            color="blue">
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
    </main>
  );
};



export default LoginPage;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData?.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
