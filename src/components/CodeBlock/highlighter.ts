import { createHighlighterCore, type HighlighterCore } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';

let instance: Promise<HighlighterCore> | undefined;

/** Lazily creates one shared Shiki highlighter (fine-grained bundle: common languages + github light/dark). */
function getHighlighter() {
  instance ??= createHighlighterCore({
    themes: [import('shiki/themes/github-light.mjs'), import('shiki/themes/github-dark.mjs')],
    langs: [
      import('shiki/langs/tsx.mjs'), import('shiki/langs/css.mjs'), import('shiki/langs/bash.mjs'),
      import('shiki/langs/json.mjs'), import('shiki/langs/javascript.mjs'), import('shiki/langs/typescript.mjs'),
      import('shiki/langs/jsx.mjs'), import('shiki/langs/markdown.mjs'), import('shiki/langs/html.mjs'),
      import('shiki/langs/diff.mjs'), import('shiki/langs/yaml.mjs'), import('shiki/langs/python.mjs'),
      import('shiki/langs/sql.mjs'), import('shiki/langs/xml.mjs'),
    ],
    engine: createJavaScriptRegexEngine(),
  });
  return instance;
}

export type HighlightLang = 'tsx' | 'css' | 'bash' | 'json' | 'javascript' | 'typescript' | 'jsx' | 'markdown' | 'html' | 'diff' | 'yaml' | 'python' | 'sql' | 'xml';

const ALIASES: Record<string, HighlightLang> = {
  tsx: 'tsx', css: 'css', bash: 'bash', sh: 'bash', shell: 'bash', zsh: 'bash', json: 'json', jsonc: 'json',
  js: 'javascript', javascript: 'javascript', mjs: 'javascript', ts: 'typescript', typescript: 'typescript', jsx: 'jsx',
  md: 'markdown', markdown: 'markdown', html: 'html', diff: 'diff', yaml: 'yaml', yml: 'yaml', py: 'python', python: 'python',
  sql: 'sql', xml: 'xml', svg: 'xml',
};

/** Maps a fenced-code info string (for example "ts" or "yml") to a bundled language, or null when it is not bundled. */
export function resolveLang(name: string | undefined): HighlightLang | null {
  return (name && ALIASES[name.toLowerCase()]) || null;
}

/** Returns HTML with dual-theme colors as CSS variables (--shiki-light / --shiki-dark). */
export async function highlight(code: string, lang: HighlightLang = 'tsx'): Promise<string> {
  const hl = await getHighlighter();
  return hl.codeToHtml(code, {
    lang,
    themes: { light: 'github-light', dark: 'github-dark' },
    defaultColor: false,
  });
}
