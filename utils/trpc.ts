import type {AppRouter} from "../backend/router/index";

import {createReactQueryHooks} from "@trpc/react";

export const trpc = createReactQueryHooks<AppRouter>();
// => { useQuery: ..., useMutation: ...}
