/** "AI workspace demo" -> "ai-workspace-demo" */
export function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

/** Standalone URL that renders one template full-window (opens well in a new browser tab). */
export function templateUrl(name: string): string {
  return `/?template=${slugify(name)}`;
}
