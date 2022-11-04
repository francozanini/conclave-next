import {inferRouterOutputs} from '@trpc/server';

import {AppRouter} from '../backend/router/resources';

export type Kindred = inferRouterOutputs<AppRouter>['kindred']['findById'];
