import capitalize from './capitalize';

export default function removeUnderscoreAndCapitalize(str: string): string {
  return str
    .split('_')
    .map(word => capitalize(word))
    .join(' ');
}
