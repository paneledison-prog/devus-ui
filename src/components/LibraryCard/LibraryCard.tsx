import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Button } from '../Button/Button';
import { useCopy } from '../../hooks/useCopy';
import { PreviewDialog } from './PreviewDialog';
import './LibraryCard.css';

export interface LibraryCardProps {
  name: string;
  variants: number;
  /** Live component preview shown on the tile. */
  preview: ReactNode;
  /** Source snippet copied by "Copy code". */
  code: string;
  /** Master prompt copied by "Copy prompt". */
  prompt: string;
  /** Language for the code tab. */
  lang?: 'tsx' | 'css';
  /** Preview fills the whole tile (backgrounds). */
  fill?: boolean;
  /** 4:5 portrait frame with 36px radius and a white border. */
  portrait?: boolean;
  /** Shrinks large previews inside the tile only. */
  tileZoom?: number;
  /** Initial zoom of the large preview. */
  defaultZoom?: number;
  /** Portrait tile for phone viewports. */
  tall?: boolean;
  /** Optional controlled state for the large preview. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function LibraryCard({ name, variants, preview, code, prompt, lang, fill, portrait, tileZoom, defaultZoom, tall, open: openProp, onOpenChange }: LibraryCardProps) {
  const [localOpen, setLocalOpen] = useState(false);
  const open = openProp ?? localOpen;
  const setOpen = (next: boolean) => {
    if (openProp === undefined) setLocalOpen(next);
    onOpenChange?.(next);
  };
  const { copied, copy } = useCopy();

  // Phone tiles: scale the phone (320x660, classic iPhone ratio) to ~96% of the tile height, like a store listing.
  const tileRef = useRef<HTMLDivElement>(null);
  const [fitZoom, setFitZoom] = useState<number | undefined>(undefined);
  useEffect(() => {
    const el = tileRef.current;
    if (!tall || !el) return;
    const measure = () => setFitZoom(Math.min((el.clientHeight * 0.96) / 660, (el.clientWidth * 0.8) / 320));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [tall]);

  return (
    <article className="ui-library-card">
      <div ref={tileRef} className={`ui-library-card__preview${fill ? " ui-library-card__preview--fill" : ""}${tall ? " ui-library-card__preview--tall" : ""}${portrait ? " ui-library-card__preview--portrait" : ""}`}>
        <button type="button" className="ui-library-card__open" aria-label={`Open ${name} in large preview`} onClick={() => setOpen(true)} />
        <div className="ui-library-card__content" style={tall && fitZoom ? { zoom: fitZoom } : tileZoom ? { zoom: tileZoom } : undefined}>{preview}</div>
        <div className="ui-library-card__actions">
          <Button size="sm" variant="secondary" onClick={() => copy(prompt, 'prompt')}>{copied === 'prompt' ? 'Copied ✓' : 'Prompt'}</Button>
          <Button size="sm" variant="secondary" onClick={() => copy(code, 'code')}>{copied === 'code' ? 'Copied ✓' : 'Code'}</Button>
          <Button size="sm" iconOnly variant="secondary" aria-label={`Expand ${name}`} onClick={() => setOpen(true)}>⤢</Button>
        </div>
      </div>
      <div>
        <h3 className="ui-library-card__name">{name}</h3>
        <p className="ui-library-card__meta">{variants} {variants === 1 ? 'variant' : 'variants'}</p>
      </div>
      <PreviewDialog open={open} onClose={() => setOpen(false)} name={name} preview={preview} code={code} prompt={prompt} lang={lang} fill={fill} portrait={portrait} defaultZoom={defaultZoom} tall={tall} />
    </article>
  );
}
