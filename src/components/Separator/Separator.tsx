import './Separator.css';

export interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical';
  label?: string;
}

export function Separator({ orientation = 'horizontal', label }: SeparatorProps) {
  if (label && orientation === 'horizontal') {
    return (
      <div role="separator" aria-orientation="horizontal" className="ui-separator ui-separator--labeled">
        <span>{label}</span>
      </div>
    );
  }
  return <div role="separator" aria-orientation={orientation} className={`ui-separator ui-separator--${orientation}`} />;
}
