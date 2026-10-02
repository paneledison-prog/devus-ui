import { useEffect, useState } from 'react';
import { highlight } from './highlighter';
import './CodeBlock.css';

export interface CodeBlockProps {
  code: string;
  lang?: 'tsx' | 'css' | 'bash';
}

/** Syntax-highlighted code (Shiki). Shows plain text until the highlighter is ready. */
export function CodeBlock({ code, lang = 'tsx' }: CodeBlockProps) {
  const [html, setHtml] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setHtml(null);
    highlight(code, lang).then((h) => { if (!cancelled) setHtml(h); }).catch(() => {});
    return () => { cancelled = true; };
  }, [code, lang]);

  if (html) {
    // Shiki escapes the source; output is generated from our own static snippets.
    return <div className="ui-code" tabIndex={0} dangerouslySetInnerHTML={{ __html: html }} />;
  }
  return <div className="ui-code" tabIndex={0}><pre><code>{code}</code></pre></div>;
}
