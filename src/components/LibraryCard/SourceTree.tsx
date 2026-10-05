import { useEffect, useMemo, useState } from 'react';
import { CodeBlock } from '../CodeBlock/CodeBlock';
import { useCopy } from '../../hooks/useCopy';
import { loadSourceFiles, type SourceEntry, type SourceFile } from '../../pages/Library/sourceFiles';

interface Node { name: string; path: string; children: Node[]; file?: SourceFile }

const MAX_HIGHLIGHT = 120_000;

function buildTree(files: SourceFile[]): Node {
  const root: Node = { name: '', path: '', children: [] };
  for (const f of files) {
    let cur = root;
    const parts = f.path.split('/');
    parts.forEach((part, i) => {
      const path = parts.slice(0, i + 1).join('/');
      let next = cur.children.find((c) => c.name === part);
      if (!next) { next = { name: part, path, children: [] }; cur.children.push(next); }
      if (i === parts.length - 1) next.file = f;
      cur = next;
    });
  }
  const sort = (n: Node) => {
    n.children.sort((a, b) => Number(!!a.file) - Number(!!b.file) || a.name.localeCompare(b.name));
    n.children.forEach(sort);
  };
  sort(root);
  return root;
}

const FileIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.7.7l3.6 3.6A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" /><path d="M14 2v5a1 1 0 0 0 1 1h5" />
  </svg>
);
const FolderIcon = ({ open }: { open: boolean }) => (
  <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {open
      ? <path d="m6 14 1.5-2.9A2 2 0 0 1 9.2 10H20a2 2 0 0 1 1.9 2.6l-1.6 5A2 2 0 0 1 18.4 19H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.7.9l.8 1.2a2 2 0 0 0 1.7.9H18a2 2 0 0 1 2 2v2" />
      : <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.7-.9l-.8-1.2A2 2 0 0 0 7.9 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z" />}
  </svg>
);

function Branch({ node, depth, selected, onSelect, closed, toggle }: {
  node: Node; depth: number; selected: string; onSelect: (p: string) => void; closed: Set<string>; toggle: (p: string) => void;
}) {
  if (node.file) {
    return (
      <button type="button" className="ui-files__file" style={{ paddingLeft: 8 + depth * 14 }} aria-current={selected === node.path ? 'true' : undefined} onClick={() => onSelect(node.path)}>
        <FileIcon /><span>{node.name}</span>
      </button>
    );
  }
  const open = !closed.has(node.path);
  return (
    <div role="group" aria-label={node.name}>
      <button type="button" className="ui-files__file ui-files__folder" style={{ paddingLeft: 8 + depth * 14 }} aria-expanded={open} onClick={() => toggle(node.path)}>
        <FolderIcon open={open} /><span>{node.name}</span>
      </button>
      {open && node.children.map((c) => <Branch key={c.path} node={c} depth={depth + 1} selected={selected} onSelect={onSelect} closed={closed} toggle={toggle} />)}
    </div>
  );
}

/** File tree + viewer for a template's real source files. */
export function SourceTree({ entries, helper }: { entries: SourceEntry[]; helper?: string }) {
  const [files, setFiles] = useState<SourceFile[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [selected, setSelected] = useState(entries[0].path);
  const [closed, setClosed] = useState<Set<string>>(new Set());
  const { copied, copy } = useCopy();

  useEffect(() => {
    let cancelled = false;
    loadSourceFiles(entries, helper).then((f) => { if (!cancelled) setFiles(f); }).catch(() => { if (!cancelled) setFailed(true); });
    return () => { cancelled = true; };
  }, [entries, helper]);

  const tree = useMemo(() => (files ? buildTree(files) : null), [files]);
  const current = files?.find((f) => f.path === selected) ?? files?.[0];
  const toggle = (p: string) => setClosed((c) => { const n = new Set(c); if (n.has(p)) n.delete(p); else n.add(p); return n; });

  if (failed) return <div className="ui-files ui-files--msg">Could not load the source files.</div>;
  if (!files || !tree || !current) return <div className="ui-files ui-files--msg">Loading files…</div>;

  const isMd = current.path.endsWith('.md');
  const lang = current.path.endsWith('.css') ? 'css' : 'tsx';
  const lines = current.content.split('\n').length;

  return (
    <div className="ui-files">
      <aside className="ui-files__side" aria-label="Files">
        <div className="ui-files__head"><span>Files</span><span className="ui-files__count">({files.length})</span></div>
        <div className="ui-files__list">
          {tree.children.map((c) => <Branch key={c.path} node={c} depth={0} selected={current.path} onSelect={setSelected} closed={closed} toggle={toggle} />)}
        </div>
      </aside>
      <section className="ui-files__main" aria-label={current.path}>
        <div className="ui-files__bar">
          <span className="ui-files__name"><FileIcon /><span>{current.path}</span></span>
          <span className="ui-files__meta">{lines} lines</span>
          <button type="button" className="ui-files__btn" onClick={() => copy(current.content, current.path)}>{copied === current.path ? 'Copied ✓' : 'Copy'}</button>
        </div>
        <div className="ui-files__body">
          {isMd || current.content.length > MAX_HIGHLIGHT
            ? <pre tabIndex={0} className={isMd ? 'ui-files__md' : undefined}><code>{current.content}</code></pre>
            : <CodeBlock key={current.path} code={current.content} lang={lang} />}
        </div>
      </section>
    </div>
  );
}
