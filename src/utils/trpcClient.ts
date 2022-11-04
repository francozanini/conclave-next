import {createTRPCReact} from '@trpc/react-query';

import {AppRouter} from '../backend/router/trpc';

export const trpc = createTRPCReact<AppRouter>();
