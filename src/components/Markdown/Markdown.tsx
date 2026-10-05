import { isValidElement, useRef, type ComponentProps, type MouseEvent, type ReactElement, type ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { remarkAlert } from 'remark-github-blockquote-alert';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { CodeBlock } from '../CodeBlock/CodeBlock';
import { resolveLang } from '../CodeBlock/highlighter';
import './Markdown.css';

/**
 * GitHub-flavored Markdown renderer.
 * Supports: headings with anchors, emphasis, strikethrough, links and autolinks, images, lists (nested, ordered, task lists),
 * tables with alignment, blockquotes, alerts (> [!NOTE] / TIP / IMPORTANT / WARNING / CAUTION), footnotes, horizontal rules,
 * inline code, fenced code with syntax highlighting, and sanitized inline HTML (details/summary, kbd, sub, sup, mark, picture ...).
 * Not supported: LaTeX math, Mermaid diagrams, emoji shortcodes.
 */
const schema = {
  ...defaultSchema,
  tagNames: [...(defaultSchema.tagNames ?? []), 'details', 'summary', 'kbd', 'mark', 'abbr', 'ins', 'picture', 'source', 'svg', 'path', 'figure', 'figcaption'],
  attributes: {
    ...defaultSchema.attributes,
    '*': [...(defaultSchema.attributes?.['*'] ?? []), 'className', 'align', 'title'],
    svg: ['viewBox', 'width', 'height', 'ariaHidden', 'className', 'fill', 'focusable'],
    path: ['d', 'fillRule', 'clipRule'],
    source: ['srcSet', 'media', 'type'],
    details: ['open'],
    img: [...(defaultSchema.attributes?.img ?? []), 'width', 'height', 'loading'],
    abbr: ['title'],
  },
};

function textOf(node: ReactNode): string {
  if (typeof node === 'string') return node;
  if (Array.isArray(node)) return node.map(textOf).join('');
  if (isValidElement(node)) return textOf((node as ReactElement<{ children?: ReactNode }>).props.children);
  return '';
}

function Fence({ children }: { children?: ReactNode }) {
  const child = Array.isArray(children) ? children[0] : children;
  const props = isValidElement(child) ? (child as ReactElement<{ className?: string; children?: ReactNode }>).props : {};
  const info = /language-([\w+-]+)/.exec(props.className ?? '')?.[1];
  const code = textOf(props.children).replace(/\n$/, '');
  const lang = resolveLang(info);
  if (lang) return <div className="gh-md__fence"><CodeBlock code={code} lang={lang} /></div>;
  return <pre className="gh-md__plain" tabIndex={0}><code>{code}</code></pre>;
}

export function Markdown({ source }: { source: string }) {
  const root = useRef<HTMLDivElement>(null);

  const onAnchor = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = decodeURIComponent(href.slice(1));
    const el = root.current?.querySelector<HTMLElement>(`[id="${CSS.escape(id)}"]`);
    el?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  };

  const components: ComponentProps<typeof ReactMarkdown>['components'] = {
    pre: ({ children }) => <Fence>{children}</Fence>,
    a: ({ href, children, node: _node, ...rest }) => {
      void _node;
      if (href?.startsWith('#')) return <a {...rest} href={href} onClick={(e) => onAnchor(e, href)}>{children}</a>;
      return <a {...rest} href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
    },
    table: ({ children }) => <div className="gh-md__table"><table>{children}</table></div>,
    img: ({ node: _node, alt, ...rest }) => { void _node; return <img alt={alt ?? ''} loading="lazy" {...rest} />; },
  };

  return (
    <div className="gh-md" ref={root}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkAlert]}
        rehypePlugins={[
          rehypeRaw,
          [rehypeSanitize, schema],
          rehypeSlug,
          [rehypeAutolinkHeadings, {
            behavior: 'prepend',
            properties: { className: ['gh-md__anchor'], ariaLabel: 'Link to this section' },
            content: { type: 'element', tagName: 'svg', properties: { viewBox: '0 0 16 16', width: 16, height: 16, ariaHidden: 'true' }, children: [{ type: 'element', tagName: 'path', properties: { fill: 'currentColor', d: 'm7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z' }, children: [] }] },
          }],
        ]}
        components={components}
      >
        {source}
      </ReactMarkdown>
    </div>
  );
}
