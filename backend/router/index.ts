import {chronicleRouter} from "./resources/chronicle";
import {createRouter} from "./context";
import {kindredRouter} from "./resources/kindred";

export const appRouter = createRouter()
  .merge("chronicle.", chronicleRouter)
  .merge("kindred.", kindredRouter);

export type AppRouter = typeof appRouter;
