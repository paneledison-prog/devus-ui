import type { ReactNode } from 'react';
import './Card.css';

export interface CardProps {
  title?: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
}

export function Card({ title, description, footer, children }: CardProps) {
  return (
    <section className="ui-card">
      {title && <h3 className="ui-card__title">{title}</h3>}
      {description && <p className="ui-card__desc">{description}</p>}
      {children}
      {footer && <div className="ui-card__footer">{footer}</div>}
    </section>
  );
}
