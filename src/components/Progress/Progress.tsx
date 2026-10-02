import './Progress.css';

export interface ProgressProps {
  /** 0 to 100. */
  value: number;
  label?: string;
}

export function Progress({ value, label }: ProgressProps) {
  const v = Math.min(100, Math.max(0, value));
  return (
    <div className="ui-progress">
      {label && (
        <div className="ui-progress__head"><span>{label}</span><span>{Math.round(v)}%</span></div>
      )}
      <div className="ui-progress__track" role="progressbar" aria-valuenow={v} aria-valuemin={0} aria-valuemax={100} aria-label={label ?? 'Progress'}>
        <div className="ui-progress__bar" style={{ width: `${v}%` }} />
      </div>
    </div>
  );
}
