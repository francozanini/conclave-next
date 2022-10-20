import {chronicleRouter} from "./resources/chronicle";
import {createRouter} from "./context";
import {kindredRouter} from "./resources/kindred";
import {powersRouter} from "./resources/powers";

export const appRouter = createRouter()
  .merge("chronicle.", chronicleRouter)
  .merge("kindred.", kindredRouter)
  .merge("powers.", powersRouter);

export type AppRouter = typeof appRouter;
