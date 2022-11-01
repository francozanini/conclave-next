export const includesBy = <T>(
  predicate: (el: T) => boolean,
  arr: T[]
): boolean => arr.find(predicate) != null;
