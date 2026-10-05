import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Button } from '../Button/Button';
import { CodeBlock } from '../CodeBlock/CodeBlock';
import { useCopy } from '../../hooks/useCopy';
import { SourceTree } from './SourceTree';
import type { SourceEntry } from '../../pages/Library/sourceFiles';
import { OverlayRoot } from '../Aria/overlayRoot';
import './PreviewDialog.css';

export interface PreviewDialogProps {
  open: boolean;
  onClose: () => void;
  name: string;
  preview: ReactNode;
  code: string;
  prompt: string;
  lang?: 'tsx' | 'css';
  fill?: boolean;
  landscape?: boolean;
  defaultZoom?: number;
  /** Phone viewport: opens near life-size and auto-fits the stage. */
  tall?: boolean;
  href?: string;
  /** Templates: show the real project files as a file tree in the Code tab. */
  sourceEntries?: SourceEntry[];
  /** Slug of the helper folder shown in the file tree. */
  helper?: string;
}

const FileIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.7.7l3.6 3.6A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" /><path d="M14 2v5a1 1 0 0 0 1 1h5" /><path d="M10 9H8M16 13H8M16 17H8" />
  </svg>
);

type Tab = 'preview' | 'code' | 'prompt';
const ZOOMS = [0.75, 1, 1.5, 2] as const;

export function PreviewDialog({ open, onClose, name, preview, code, prompt, lang = 'tsx', fill = false, landscape = false, defaultZoom = 1.5, tall = false, href, sourceEntries, helper }: PreviewDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const [root, setRoot] = useState<Element>();
  const [tab, setTab] = useState<Tab>('preview');
  const [zoom, setZoom] = useState<number | 'fit'>(tall ? 'fit' : defaultZoom);
  const stageRef = useRef<HTMLDivElement>(null);
  const [fitZoom, setFitZoom] = useState(1);
  // The dialog is up to 2x its original size; zoom steps are relative to the original stage so "100%" looks the same, just larger.
  const [scale, setScale] = useState(1);
  const zoomValue = zoom === 'fit' ? fitZoom : zoom * scale;
  const { copied, copy } = useCopy();

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) { setTab('preview'); d.showModal(); }
    if (!open && d.open) d.close();
  }, [open]);

  useEffect(() => {
    const el = stageRef.current;
    if (!open || tab !== 'preview' || !el) return;
    const measure = () => setScale(Math.min(2, Math.max(1, Math.min(el.clientWidth / 936, el.clientHeight / 520))));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [open, tab]);

  // Phones: fit the 320x660 device to the stage (up to 2x) so it opens near life-size.
  useEffect(() => {
    const el = stageRef.current;
    if (!tall || !open || tab !== 'preview' || !el) return;
    const measure = () => setFitZoom(Math.min(2, Math.max(0.4, Math.min((el.clientHeight - 56) / 660, (el.clientWidth - 56) / 320))));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [tall, open, tab]);

  const text = tab === 'code' ? code : prompt;
  const base = name.replace(/[^a-z0-9]+/gi, '');
  const fileName = tab === 'code' ? `${base}.${lang === 'css' ? 'css' : 'tsx'}` : 'PROMPT.md';

  return (
    <dialog ref={(el) => { ref.current = el; setRoot((cur) => (cur === el || !el ? cur : el)); }} className={`ui-preview-dialog${tall ? " ui-preview-dialog--tall" : ""}`} aria-label={`${name} preview`} onClose={onClose}
      onClick={(e) => { if (e.target === ref.current) onClose(); }}>
      <header className="ui-preview-dialog__header">
        <h2 className="ui-preview-dialog__title">{name}</h2>
        <div className="ui-preview-dialog__tabs" role="tablist">
          {(['preview', 'code', 'prompt'] as const).map((t) => (
            <button key={t} role="tab" aria-selected={tab === t} className="ui-preview-dialog__tab" onClick={() => setTab(t)}>
              {t === 'prompt' ? 'Master prompt' : t[0].toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
        <Button iconOnly variant="ghost" size="sm" aria-label="Close preview" onClick={onClose}>✕</Button>
      </header>

      {tab === 'preview' ? (
        <>
          <div ref={stageRef} className={`ui-preview-dialog__stage${fill ? " ui-preview-dialog__stage--fill" : ""}${tall ? " ui-preview-dialog__stage--tall" : ""}${landscape ? " ui-preview-dialog__stage--landscape" : ""}`}>
            <div className="ui-preview-dialog__zoom" style={fill ? undefined : { zoom: zoomValue }}><OverlayRoot.Provider value={root}>{preview}</OverlayRoot.Provider></div>
          </div>
          <footer className="ui-preview-dialog__footer">
            <div className="ui-preview-dialog__zooms" role="group" aria-label="Zoom" hidden={fill}>
              {tall && (
                <Button size="sm" variant={zoom === 'fit' ? 'secondary' : 'ghost'} aria-pressed={zoom === 'fit'} onClick={() => setZoom('fit')}>Fit</Button>
              )}
              {ZOOMS.map((z) => (
                <Button key={z} size="sm" variant={zoom === z ? 'secondary' : 'ghost'} aria-pressed={zoom === z} onClick={() => setZoom(z)}>
                  {z * 100}%
                </Button>
              ))}
            </div>
            <div className="ui-preview-dialog__actions">
              {href && <a className="ui-button ui-button--secondary ui-button--sm" href={href} target="_blank" rel="noopener noreferrer">Open in new tab ↗</a>}
              <Button size="sm" variant="secondary" onClick={() => copy(prompt, 'prompt')}>{copied === 'prompt' ? 'Copied ✓' : 'Copy prompt'}</Button>
              <Button size="sm" onClick={() => copy(code, 'code')}>{copied === 'code' ? 'Copied ✓' : 'Copy code'}</Button>
            </div>
          </footer>
        </>
      ) : (
        <>
          <div className="ui-preview-dialog__text">
            {tab === 'code' && sourceEntries ? <SourceTree entries={sourceEntries} helper={helper} /> : (
            <div className="ui-files">
              <aside className="ui-files__side" aria-label="Files">
                <div className="ui-files__head"><span>Files</span><span className="ui-files__count">(1)</span></div>
                <div className="ui-files__list">
                  <button type="button" className="ui-files__file" aria-current="true">
                    <FileIcon /><span>{fileName}</span>
                  </button>
                </div>
              </aside>
              <section className="ui-files__main" aria-label={fileName}>
                <div className="ui-files__bar">
                  <span className="ui-files__name"><FileIcon /><span>{fileName}</span></span>
                  <button type="button" className="ui-files__btn" onClick={() => copy(text, tab)}>
                    {copied === tab ? 'Copied ✓' : 'Copy'}
                  </button>
                </div>
                <div className="ui-files__body">
                  {tab === 'code'
                    ? <CodeBlock code={code} lang={lang} />
                    : <pre tabIndex={0}><code>{prompt}</code></pre>}
                </div>
              </section>
            </div>
            )}
          </div>
          <footer className="ui-preview-dialog__footer">
            <span />
            {tab === 'code' && sourceEntries ? null : <Button size="sm" onClick={() => copy(text, tab)}>
              {copied === tab ? 'Copied ✓' : tab === 'code' ? 'Copy code' : 'Copy prompt'}
            </Button>}
          </footer>
        </>
      )}
    </dialog>
  );
}
