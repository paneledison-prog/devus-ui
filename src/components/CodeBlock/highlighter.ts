import { createHighlighterCore, type HighlighterCore } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';

let instance: Promise<HighlighterCore> | undefined;

/** Lazily creates one shared Shiki highlighter (fine-grained bundle: tsx + github light/dark). */
function getHighlighter() {
  instance ??= createHighlighterCore({
    themes: [import('shiki/themes/github-light.mjs'), import('shiki/themes/github-dark.mjs')],
    langs: [import('shiki/langs/tsx.mjs'), import('shiki/langs/css.mjs'), import('shiki/langs/bash.mjs')],
    engine: createJavaScriptRegexEngine(),
  });
  return instance;
}

/** Returns HTML with dual-theme colors as CSS variables (--shiki-light / --shiki-dark). */
export async function highlight(code: string, lang: 'tsx' | 'css' | 'bash' = 'tsx'): Promise<string> {
  const hl = await getHighlighter();
  return hl.codeToHtml(code, {
    lang,
    themes: { light: 'github-light', dark: 'github-dark' },
    defaultColor: false,
  });
}
