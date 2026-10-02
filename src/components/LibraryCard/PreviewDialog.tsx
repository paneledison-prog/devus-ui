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
}

type Tab = 'preview' | 'code' | 'prompt';
const ZOOMS = [1, 1.5, 2] as const;

export function PreviewDialog({ open, onClose, name, preview, code, prompt, lang = 'tsx', fill = false }: PreviewDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const [tab, setTab] = useState<Tab>('preview');
  const [zoom, setZoom] = useState<number>(1.5);
  const { copied, copy } = useCopy();

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) { setTab('preview'); d.showModal(); }
    if (!open && d.open) d.close();
  }, [open]);

  const text = tab === 'code' ? code : prompt;

  return (
    <dialog ref={ref} className="ui-preview-dialog" aria-label={`${name} preview`} onClose={onClose}
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
          <div className={`ui-preview-dialog__stage${fill ? " ui-preview-dialog__stage--fill" : ""}`}>
            <div className="ui-preview-dialog__zoom" style={fill ? undefined : { zoom }}>{preview}</div>
          </div>
          <footer className="ui-preview-dialog__footer">
            <div className="ui-preview-dialog__zooms" role="group" aria-label="Zoom" hidden={fill}>
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
