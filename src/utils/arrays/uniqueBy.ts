export const uniqueBy = <T>(arr: T[], by: (el: T) => any): T[] =>
  arr.reduce(
    (uniques, next) =>
      uniques.includes(by(next)) ? uniques : [...uniques, next],
    [] as T[]
  );
