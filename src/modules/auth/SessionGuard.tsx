import {useSession} from 'next-auth/react';

import Login from './Login';

export default function withSessionGuard<P extends {}>(
  Component: React.ComponentType<P & {}>
) {
  const WithSessionGuard = (props: P): JSX.Element => {
    const {data: session} = useSession();

    if (!session) {
      return <Login />;
    }

    return <Component {...props} />;
  };

  return WithSessionGuard;
}
