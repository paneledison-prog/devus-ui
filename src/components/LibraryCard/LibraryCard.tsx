import { useState, type ReactNode } from 'react';
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
}

export function LibraryCard({ name, variants, preview, code, prompt }: LibraryCardProps) {
  const [open, setOpen] = useState(false);
  const { copied, copy } = useCopy();

  return (
    <article className="ui-library-card">
      <div className="ui-library-card__preview">
        <button type="button" className="ui-library-card__open" aria-label={`Open ${name} in large preview`} onClick={() => setOpen(true)} />
        <div className="ui-library-card__content">{preview}</div>
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
      <PreviewDialog open={open} onClose={() => setOpen(false)} name={name} preview={preview} code={code} prompt={prompt} />
    </article>
  );
}
