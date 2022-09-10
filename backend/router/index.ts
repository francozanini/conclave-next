import * as trpc from '@trpc/server';
import { prisma } from '../utils/prisma';

export const appRouter = trpc.router().query('find-kindred', {
    async resolve() {
        return await prisma.kindred.findMany({
            select: { name: true, id: true, trackables: true }
        });
    }
});

export type AppRouter = typeof appRouter;
