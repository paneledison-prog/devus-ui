/**
 * Real source files for the Templates "Code" tab. Files are read from the project itself
 * (Vite raw imports), and the local import graph of each entry is followed so the tree
 * shows everything the template needs.
 */
export interface SourceEntry {
  /** Project path, e.g. "src/components/Crm/Crm.tsx". */
  path: string;
  /** Follow the file's relative imports (default true). */
  follow?: boolean;
}

export interface SourceFile { path: string; content: string }

const loaders = import.meta.glob('/src/**/*.{ts,tsx,css}', { query: '?raw', import: 'default' }) as Record<string, () => Promise<string>>;

const EXTS = ['', '.tsx', '.ts', '.css', '/index.tsx', '/index.ts'];
const IMPORT_RE = /(?:import|export)\s+(?:[^'";]*?\sfrom\s+)?['"](\.{1,2}\/[^'"]+)['"]/g;

function resolve(from: string, spec: string): string | null {
  const parts = from.split('/').slice(0, -1);
  for (const seg of spec.split('/')) {
    if (seg === '.' || seg === '') continue;
    if (seg === '..') parts.pop(); else parts.push(seg);
  }
  const base = parts.join('/');
  for (const ext of EXTS) {
    const key = `${base}${ext}`;
    if (key in loaders && !/\.stories\./.test(key)) return key;
  }
  return null;
}

const cache = new Map<string, Promise<string>>();
const read = (key: string) => {
  let p = cache.get(key);
  if (!p) { p = loaders[key](); cache.set(key, p); }
  return p;
};

export async function loadSourceFiles(entries: SourceEntry[]): Promise<SourceFile[]> {
  const seen = new Map<string, string>();
  const queue = entries.map((e) => ({ key: `/${e.path}`, follow: e.follow !== false }));
  while (queue.length) {
    const { key, follow } = queue.shift()!;
    if (seen.has(key) || !(key in loaders)) continue;
    const content = await read(key);
    seen.set(key, content);
    if (!follow || key.endsWith('.css')) continue;
    for (const m of content.matchAll(IMPORT_RE)) {
      const dep = resolve(key, m[1]);
      if (dep && !seen.has(dep)) queue.push({ key: dep, follow: true });
    }
  }
  return [...seen].map(([key, content]) => ({ path: key.slice(1), content }));
}
