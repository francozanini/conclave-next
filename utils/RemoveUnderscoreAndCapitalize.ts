import capitalize from "./capitalize";

export function removeUnderscoreAndCapitalize(str: string): string {
  return str
    .split("_")
    .map((word) => capitalize(word))
    .join(" ");
}
