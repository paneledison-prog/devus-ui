import { useEffect, useState } from 'react';
import { highlight, type HighlightLang } from './highlighter';
import './CodeBlock.css';

export interface CodeBlockProps {
  code: string;
  lang?: HighlightLang;
  /** Show a line number gutter. */
  lineNumbers?: boolean;
}

/** Syntax-highlighted code (Shiki). Shows plain text until the highlighter is ready. */
export function CodeBlock({ code, lang = 'tsx', lineNumbers = false }: CodeBlockProps) {
  const [html, setHtml] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setHtml(null);
    highlight(code, lang).then((h) => { if (!cancelled) setHtml(h); }).catch(() => {});
    return () => { cancelled = true; };
  }, [code, lang]);

  if (html) {
    // Shiki escapes the source; output is generated from our own static snippets.
    return <div className={`ui-code${lineNumbers ? ' ui-code--ln' : ''}`} tabIndex={0} dangerouslySetInnerHTML={{ __html: html }} />;
  }
  return <div className={`ui-code${lineNumbers ? ' ui-code--ln' : ''}`} tabIndex={0}><pre><code>{code}</code></pre></div>;
}
