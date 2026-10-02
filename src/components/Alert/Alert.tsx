import type { ReactNode } from 'react';
import './Alert.css';

export interface AlertProps {
  status?: 'default' | 'success' | 'warning' | 'danger';
  title: ReactNode;
  children?: ReactNode;
}

export function Alert({ status = 'default', title, children }: AlertProps) {
  return (
    <div role={status === 'danger' ? 'alert' : 'status'} className={`ui-alert ui-alert--${status}`}>
      <span className="ui-alert__dot" aria-hidden />
      <div>
        <div className="ui-alert__title">{title}</div>
        {children && <div className="ui-alert__desc">{children}</div>}
      </div>
    </div>
  );
}
