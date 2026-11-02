// Hides personal strings from naive crawlers: browsers decode the entities,
// but the raw HTML never contains the plain address. Not a guarantee against
// JS-rendering crawlers — pair with noindex/robots where it matters.
export function obfuscate(text: string) {
  return text.replace(/@/g, '&#64;').replace(/\./g, '&#46;');
}
