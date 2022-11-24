import '../styles/global.css';
import {withTRPC} from '@trpc/next';
import {type AppType} from 'next/dist/shared/lib/utils';
import {SessionProvider} from 'next-auth/react';
import {Session} from 'next-auth/core/types';

import Layout from '../modules/core/Layout';
import {AppRouter} from '../backend/router/resources';

const MyApp: AppType<{session: Session | null | undefined}> = ({
  Component,
  pageProps: {session, ...pageProps}
}) => {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
};

export default withTRPC<AppRouter>({
  config({ctx}) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : 'http://localhost:3000/api/trpc';

    return {
      url
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: true
})(MyApp);
