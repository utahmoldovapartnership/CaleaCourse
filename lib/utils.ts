export function slugify(text: string): string {
  const slug = text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || "item";
}

export function uniqueSlug(base: string, existing: string[]): string {
  let slug = base;
  let n = 2;
  while (existing.includes(slug)) {
    slug = `${base}-${n++}`;
  }
  return slug;
}

export function generateId(prefix = "id"): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}
