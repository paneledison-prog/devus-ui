import { useId, useState, type ReactNode } from 'react';
import { Button } from '../Button/Button';
import './AiKit.css';

const Check = () => <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7" /></svg>;

/* ---------- Approval card ---------- */
export interface ApprovalOption { id: string; label: string; hint?: string }
export interface ApprovalCardProps {
  title: string;
  options: ApprovalOption[];
  onConfirm?: (id: string) => void;
  onSkip?: () => void;
}
export function ApprovalCard({ title, options, onConfirm, onSkip }: ApprovalCardProps) {
  const name = useId();
  const [value, setValue] = useState(options[0]?.id ?? '');
  const [state, setState] = useState<'open' | 'done' | 'skipped'>('open');
  const picked = options.find((o) => o.id === value);
  return (
    <section className="ai-approval" aria-label="Approval needed" data-state={state}>
      <header className="ai-approval__head"><span className="ai-pill ai-pill--warn">Paused</span><span className="ai-muted">Needs your call before the agent continues.</span></header>
      <fieldset className="ai-approval__body" disabled={state !== 'open'}>
        <legend className="ai-approval__title">{title}</legend>
        {options.map((o) => (
          <label key={o.id} className="ai-option" data-checked={value === o.id}>
            <input type="radio" name={name} value={o.id} checked={value === o.id} onChange={() => setValue(o.id)} />
            <span className="ai-option__dot" aria-hidden="true" />
            <span><span className="ai-option__label">{o.label}</span>{o.hint ? <span className="ai-muted ai-option__hint">{o.hint}</span> : null}</span>
          </label>
        ))}
      </fieldset>
      {state === 'open' ? (
        <footer className="ai-approval__foot">
          <Button size="sm" onClick={() => { setState('done'); onConfirm?.(value); }}>Confirm</Button>
          <Button size="sm" variant="ghost" onClick={() => { setState('skipped'); onSkip?.(); }}>Skip</Button>
        </footer>
      ) : (
        <p className="ai-approval__result" role="status">{state === 'done' ? `Approved: ${picked?.label}` : 'Skipped. The agent will continue without this step.'}</p>
      )}
    </section>
  );
}

/* ---------- Thinking steps ---------- */
export interface ThinkingStep { label: string; detail?: string; seconds?: number; state: 'done' | 'running' | 'todo' }
export function ThinkingSteps({ steps, defaultOpen = true }: { steps: ThinkingStep[]; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  const running = steps.some((s) => s.state === 'running');
  const total = steps.reduce((a, s) => a + (s.seconds ?? 0), 0);
  return (
    <div className="ai-think">
      <button type="button" className="ai-think__toggle" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}>
        {running ? <span className="ai-spin" aria-hidden="true" /> : <span className="ai-tick" aria-hidden="true"><Check /></span>}
        <span>{running ? 'Thinking…' : `Worked for ${total.toFixed(1)}s`}</span>
        <span className="ai-think__chev" aria-hidden="true" data-open={open}>›</span>
      </button>
      {open ? (
        <ol id={id} className="ai-think__list">
          {steps.map((s) => (
            <li key={s.label} data-state={s.state}>
              <span className="ai-think__mark" aria-hidden="true">{s.state === 'done' ? <Check /> : s.state === 'running' ? <span className="ai-spin ai-spin--sm" /> : ''}</span>
              <span className="ai-think__text"><span>{s.label}</span>{s.detail ? <span className="ai-muted">{s.detail}</span> : null}</span>
              {s.seconds != null && s.state === 'done' ? <span className="ai-muted ai-think__time">{s.seconds.toFixed(1)}s</span> : null}
            </li>
          ))}
        </ol>
      ) : null}
    </div>
  );
}

/* ---------- Context meter ---------- */
export interface ContextMeterProps { used: number; total: number; models?: string[]; model?: string; onModelChange?: (m: string) => void }
export function ContextMeter({ used, total, models = ['model-fast', 'model-deep', 'model-mini'], model, onModelChange }: ContextMeterProps) {
  const [m, setM] = useState(model ?? models[0]);
  const pct = Math.min(100, Math.round((used / total) * 100));
  const k = (n: number) => `${Math.round(n / 1000)}K`;
  return (
    <div className="ai-meter">
      <label className="ai-meter__model"><span className="ai-visually-hidden">Model</span>
        <select value={m} onChange={(e) => { setM(e.target.value); onModelChange?.(e.target.value); }}>{models.map((x) => <option key={x}>{x}</option>)}</select>
      </label>
      <div className="ai-meter__ctx" role="meter" aria-label="Context used" aria-valuemin={0} aria-valuemax={total} aria-valuenow={used} aria-valuetext={`${k(used)} of ${k(total)} tokens`}>
        <div className="ai-meter__bar" data-level={pct > 90 ? 'high' : pct > 70 ? 'mid' : 'low'}><i style={{ width: `${pct}%` }} /></div>
        <span className="ai-muted">{k(used)} / {k(total)}</span>
      </div>
    </div>
  );
}

/* ---------- Autonomy picker ---------- */
const LEVELS = [
  { id: 'ask', label: 'Ask first', hint: 'Every action waits for your approval.' },
  { id: 'plan', label: 'Plan, then act', hint: 'Shows a plan once, then runs it without interruptions.' },
  { id: 'auto', label: 'Autonomous', hint: 'Acts on its own and only stops for risky steps.' },
];
export function AutonomyPicker({ defaultValue = 'plan', onChange }: { defaultValue?: string; onChange?: (id: string) => void }) {
  const [v, setV] = useState(defaultValue);
  const labelId = useId();
  const cur = LEVELS.find((l) => l.id === v) ?? LEVELS[1];
  const pick = (id: string) => { setV(id); onChange?.(id); };
  return (
    <div className="ai-auto">
      <div className="ai-auto__label" id={labelId}>Autonomy</div>
      <div className="ai-auto__track" role="radiogroup" aria-labelledby={labelId}>
        {LEVELS.map((l, i) => (
          <button key={l.id} type="button" role="radio" aria-checked={v === l.id} tabIndex={v === l.id ? 0 : -1} className="ai-auto__seg" data-id={l.id}
            onClick={() => pick(l.id)}
            onKeyDown={(e) => {
              if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
              e.preventDefault();
              const n = LEVELS[(i + (e.key === 'ArrowRight' ? 1 : LEVELS.length - 1)) % LEVELS.length];
              pick(n.id);
              (e.currentTarget.parentElement?.querySelector(`[data-id="${n.id}"]`) as HTMLElement | null)?.focus();
            }}>{l.label}</button>
        ))}
      </div>
      <p className="ai-muted" aria-live="polite">{cur.hint}</p>
    </div>
  );
}

/* ---------- Sourced answer ---------- */
export interface Source { id: string; name: string }
export function SourcedAnswer({ children, sources }: { children: ReactNode; sources: Source[] }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <article className="ai-answer">
      <p className="ai-answer__text">{children}</p>
      <div className="ai-answer__sources" role="group" aria-label="Sources">
        <span className="ai-muted">Sources</span>
        {sources.map((s, i) => (
          <button key={s.id} type="button" className="ai-chip" aria-pressed={active === s.id} onClick={() => setActive(active === s.id ? null : s.id)}><span className="ai-chip__n">{i + 1}</span>{s.name}</button>
        ))}
      </div>
    </article>
  );
}
/** Inline citation marker to use inside <SourcedAnswer>. */
export function Cite({ n }: { n: number }) { return <sup className="ai-cite" aria-label={`Source ${n}`}>{n}</sup>; }
