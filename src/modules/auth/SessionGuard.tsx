import {useSession} from 'next-auth/react';

import Login from './Login';

/* eslint-disable react/display-name */
export default function withSessionGuard<P extends {}>(
  Component: React.ComponentType<P & {}>
) {
  return (props: P) => {
    const {data: session} = useSession();

    if (!session) {
      return <Login />;
    }

    return <Component {...props} />;
  };
}
