import {initTRPC} from '@trpc/server';

import {Context} from './context';

const t = initTRPC.context<Context>().create({});

/**
 * We recommend only exporting the functionality that we
 * use so we can enforce which base procedures should be used
 **/
export const router = t.router;

export const mergeRouters = t.mergeRouters;

export const publicProcedure = t.procedure;
