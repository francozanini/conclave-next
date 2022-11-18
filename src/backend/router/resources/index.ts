import { authRouter } from '../auth';
import {mergeRouters, router} from '../trpc';

import {chronicleRouter} from './chronicle';
import {kindredRouter} from './kindred';
import {powersRouter} from './powers';

export const appRouter = mergeRouters(
  router({chronicle: chronicleRouter}),
  router({kindred: kindredRouter}),
  router({powers: powersRouter}),
  router({auth: authRouter})
);

export type AppRouter = typeof appRouter;
