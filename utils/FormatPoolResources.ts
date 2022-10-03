import {PoolResource} from "@prisma/client";

export const formatPoolResources = (
  firstResource: PoolResource,
  secondResource: PoolResource,
): string => (firstResource !== "NONE" ? `${firstResource}+${secondResource}` : "");
