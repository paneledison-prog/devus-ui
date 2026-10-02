import { useState, type ReactNode } from 'react';
import './ImageCompare.css';

export interface ImageCompareProps {
  /** Layers default to built-in gradients so the demo needs no images. */
  before?: ReactNode;
  after?: ReactNode;
  label?: string;
}

/** Before/after slider: a native range input reveals the "after" layer. */
export function ImageCompare({ before, after, label = 'Compare before and after' }: ImageCompareProps) {
  const [pos, setPos] = useState(50);
  return (
    <div className="ui-compare" style={{ ['--pos' as string]: `${pos}%` }}>
      <div className="ui-compare__layer ui-compare__before">{before}<span className="ui-compare__tag">Before</span></div>
      <div className="ui-compare__layer ui-compare__after">{after}<span className="ui-compare__tag ui-compare__tag--right">After</span></div>
      <span className="ui-compare__line" aria-hidden="true" />
      <input type="range" min={0} max={100} value={pos} aria-label={label} onChange={(e) => setPos(Number(e.target.value))} />
    </div>
  );
}
