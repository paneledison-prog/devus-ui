import { useState } from 'react';
import { LibraryCard } from '../../components/LibraryCard/LibraryCard';
import { libraryItems } from './libraryItems';
import './LibraryPage.css';

export interface LibraryPageProps {
  id?: string;
  title?: string;
  subtitle?: string;
  /** Name of the component whose large preview is open (controlled). */
  activeItem?: string | null;
  onActiveItemChange?: (name: string | null) => void;
}

export function LibraryPage({
  id,
  title = 'Devus UI',
  subtitle = 'Browse every Devus UI component. Click a tile for a large preview, or copy its code or master prompt.',
  activeItem,
  onActiveItemChange,
}: LibraryPageProps) {
  const [local, setLocal] = useState<string | null>(null);
  const controlled = onActiveItemChange !== undefined;
  const active = controlled ? (activeItem ?? null) : local;
  const setActive = controlled ? onActiveItemChange : setLocal;

  return (
    <section id={id} className="ui-library">
      <header className="ui-library__header">
        <h2 className="ui-library__title">{title}</h2>
        <p className="ui-library__subtitle">{subtitle}</p>
      </header>
      <div className="ui-library__grid">
        {libraryItems.map((item) => (
          <LibraryCard
            key={item.name}
            {...item}
            open={active === item.name}
            onOpenChange={(o) => setActive(o ? item.name : null)}
          />
        ))}
      </div>
    </section>
  );
}
