import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Button } from '../Button/Button';
import { CodeBlock } from '../CodeBlock/CodeBlock';
import { useCopy } from '../../hooks/useCopy';
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
  defaultZoom?: number;
  /** Phone viewport: opens near life-size and auto-fits the stage. */
  tall?: boolean;
}

type Tab = 'preview' | 'code' | 'prompt';
const ZOOMS = [0.75, 1, 1.5, 2] as const;

export function PreviewDialog({ open, onClose, name, preview, code, prompt, lang = 'tsx', fill = false, defaultZoom = 1.5, tall = false }: PreviewDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const [tab, setTab] = useState<Tab>('preview');
  const [zoom, setZoom] = useState<number | 'fit'>(tall ? 'fit' : defaultZoom);
  const stageRef = useRef<HTMLDivElement>(null);
  const [fitZoom, setFitZoom] = useState(1);
  const zoomValue = zoom === 'fit' ? fitZoom : zoom;
  const { copied, copy } = useCopy();

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) { setTab('preview'); d.showModal(); }
    if (!open && d.open) d.close();
  }, [open]);

  // Phones: fit the 284x618 device to the stage (up to 1.2x) so it opens near life-size.
  useEffect(() => {
    const el = stageRef.current;
    if (!tall || !open || tab !== 'preview' || !el) return;
    const measure = () => setFitZoom(Math.min(1.2, Math.max(0.4, Math.min((el.clientHeight - 56) / 618, (el.clientWidth - 56) / 284))));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [tall, open, tab]);

  const text = tab === 'code' ? code : prompt;

  return (
    <dialog ref={ref} className={`ui-preview-dialog${tall ? " ui-preview-dialog--tall" : ""}`} aria-label={`${name} preview`} onClose={onClose}
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
          <div ref={stageRef} className={`ui-preview-dialog__stage${fill ? " ui-preview-dialog__stage--fill" : ""}${tall ? " ui-preview-dialog__stage--tall" : ""}`}>
            <div className="ui-preview-dialog__zoom" style={fill ? undefined : { zoom: zoomValue }}>{preview}</div>
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
              <Button size="sm" variant="secondary" onClick={() => copy(prompt, 'prompt')}>{copied === 'prompt' ? 'Copied ✓' : 'Copy prompt'}</Button>
              <Button size="sm" onClick={() => copy(code, 'code')}>{copied === 'code' ? 'Copied ✓' : 'Copy code'}</Button>
            </div>
          </footer>
        </>
      ) : (
        <>
          <div className="ui-preview-dialog__text">
            {tab === 'code'
              ? <CodeBlock code={code} lang={lang} />
              : <pre tabIndex={0}><code>{prompt}</code></pre>}
          </div>
          <footer className="ui-preview-dialog__footer">
            <span />
            <Button size="sm" onClick={() => copy(text, tab)}>
              {copied === tab ? 'Copied ✓' : tab === 'code' ? 'Copy code' : 'Copy prompt'}
            </Button>
          </footer>
        </>
      )}
    </dialog>
  );
}
