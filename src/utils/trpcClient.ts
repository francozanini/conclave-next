import {createTRPCReact} from '@trpc/react-query';

import {AppRouter} from '../backend/router/resources';

export const trpc = createTRPCReact<AppRouter>();
