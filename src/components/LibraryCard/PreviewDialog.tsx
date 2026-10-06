import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Button } from '../Button/Button';
import { useCopy } from '../../hooks/useCopy';
import { SourceTree } from './SourceTree';
import { TouchCursor } from './TouchCursor';
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
  fitStage?: boolean;
  /** Phone viewport: opens near life-size and auto-fits the stage. */
  tall?: boolean;
  /** Outer phone height in px (default 660). */
  phoneHeight?: number;
  href?: string;
  /** Templates: show the real project files as a file tree in the Code tab. */
  sourceEntries?: SourceEntry[];
  /** Slug of the helper folder shown in the file tree. */
  helper?: string;
  /** Repository path of the prompt Markdown file. */
  promptPath?: string;
}

type Tab = 'preview' | 'code' | 'prompt';
const ZOOMS = [0.75, 1, 1.5, 2] as const;

export function PreviewDialog({ open, onClose, name, preview, code, prompt, lang = 'tsx', fill = false, landscape = false, defaultZoom = 1.5, tall = false, fitStage = false, phoneHeight = 660, href, sourceEntries, helper, promptPath }: PreviewDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const [root, setRoot] = useState<Element>();
  const [tab, setTab] = useState<Tab>('preview');
  const [zoom, setZoom] = useState<number | 'fit'>(0.75);
  const stageRef = useRef<HTMLDivElement>(null);
  const [fitZoom, setFitZoom] = useState(1);
  // The dialog is up to 2x its original size; zoom steps are relative to the original stage so "100%" looks the same, just larger.
  const [scale, setScale] = useState(1);
  const zoomRef = useRef<HTMLDivElement>(null);
  const [stageFit, setStageFit] = useState(1);
  const zoomValue = fitStage ? stageFit : zoom === 'fit' ? fitZoom : zoom * scale;
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

  // Templates: scale the whole template to the stage so it is always fully visible, with no scrollbars.
  useEffect(() => {
    const el = stageRef.current;
    if (!fitStage || !open || tab !== 'preview' || !el) return;
    const measure = () => {
      const c = zoomRef.current?.firstElementChild as HTMLElement | null;
      if (!c) return;
      // Natural (designed) size, remembered the first time; afterwards the box is stretched to fill the stage.
      const w = Number(c.dataset.nw) || (c.dataset.nw = String(c.offsetWidth || 1), c.offsetWidth || 1);
      const h = Number(c.dataset.nh) || (c.dataset.nh = String(c.offsetHeight || 1), c.offsetHeight || 1);
      const sw = el.clientWidth; const sh = el.clientHeight;
      const z = Math.max(0.2, Math.min(sw / w, sh / h));
      // The template box is stretched to the full stage in both directions, so no part of the viewport stays empty.
      c.style.width = `${sw / z}px`; c.style.height = `${sh / z}px`;
      c.style.margin = '0';
      setStageFit(z);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    if (zoomRef.current?.firstElementChild) ro.observe(zoomRef.current.firstElementChild);
    return () => ro.disconnect();
  }, [fitStage, open, tab]);

  // Phones: fit the 320x660 device to the stage (up to 2x) so it opens near life-size.
  useEffect(() => {
    const el = stageRef.current;
    if (!tall || !open || tab !== 'preview' || !el) return;
    const measure = () => setFitZoom(Math.min(2, Math.max(0.4, Math.min((el.clientHeight - 56) / phoneHeight, (el.clientWidth - 56) / 320))));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [tall, open, tab, phoneHeight]);

  const text = tab === 'code' ? code : prompt;
  const base = name.replace(/[^a-z0-9]+/gi, '');
  const singleCode = useMemo(() => [{ path: `${base}.${lang === 'css' ? 'css' : 'tsx'}`, content: code }], [base, lang, code]);
  const singlePrompt = useMemo(() => [{ path: promptPath ?? 'PROMPT.md', content: prompt }], [promptPath, prompt]);

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
          <div ref={stageRef} className={`ui-preview-dialog__stage${fitStage ? " ui-preview-dialog__stage--fit" : ""}${fill ? " ui-preview-dialog__stage--fill" : ""}${tall ? " ui-preview-dialog__stage--tall" : ""}${landscape ? " ui-preview-dialog__stage--landscape" : ""}`}>
            <div ref={zoomRef} className="ui-preview-dialog__zoom" style={fill ? undefined : { zoom: zoomValue }}><OverlayRoot.Provider value={root}>{preview}</OverlayRoot.Provider></div>
            {tall && <TouchCursor stage={stageRef} />}
          </div>
          <footer className="ui-preview-dialog__footer">
            <div className="ui-preview-dialog__zooms" role="group" aria-label="Zoom" hidden={fill || fitStage}>
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
            {tab === 'code' && sourceEntries
              ? <SourceTree entries={sourceEntries} helper={helper} />
              : <SourceTree files={tab === 'code' ? singleCode : singlePrompt} />}
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
