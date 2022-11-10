import {initTRPC, TRPCError} from '@trpc/server';

import {Context} from './context';

const t = initTRPC.context<Context>().create({});

/**
 * We recommend only exporting the functionality that we
 * use so we can enforce which base procedures should be used
 **/
export const router = t.router;

export const mergeRouters = t.mergeRouters;

export const publicProcedure = t.procedure;

const isAuthed = t.middleware(({ctx, next}) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({code: 'UNAUTHORIZED'});
  }

  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: {...ctx.session, user: ctx.session.user}
    }
  });
});

/**
 * Protected procedure
 **/
export const protectedProcedure = t.procedure.use(isAuthed);
