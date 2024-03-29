import {inferProcedureOutput} from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';

import {createContext} from '../../../backend/router/context';
import {appRouter, AppRouter} from '../../../backend/router/resources';

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext
});

export type inferQueryResponse<
  TRouteKey extends keyof AppRouter['_def']['queries']
> = inferProcedureOutput<AppRouter['_def']['queries'][TRouteKey]>;
