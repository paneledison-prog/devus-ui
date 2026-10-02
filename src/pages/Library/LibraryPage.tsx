import { useState } from 'react';
import { LibraryCard } from '../../components/LibraryCard/LibraryCard';
import { libraryItems, type LibraryCategory } from './libraryItems';
import { templateUrl } from './slug';
import './LibraryPage.css';

export interface LibraryPageProps {
  id?: string;
  title?: string;
  subtitle?: string;
  /** Show only this category. Omit to show every item. */
  category?: LibraryCategory;
  /** Name of the item whose large preview is open (controlled). */
  activeItem?: string | null;
  onActiveItemChange?: (name: string | null) => void;
}

export function LibraryPage({
  id,
  title = 'Devus UI',
  subtitle = 'Browse every Devus UI component. Click a tile for a large preview, or copy its code or master prompt.',
  category,
  activeItem,
  onActiveItemChange,
}: LibraryPageProps) {
  const [local, setLocal] = useState<string | null>(null);
  const controlled = onActiveItemChange !== undefined;
  const active = controlled ? (activeItem ?? null) : local;
  const setActive = controlled ? onActiveItemChange : setLocal;
  const items = category ? libraryItems.filter((i) => i.category === category) : libraryItems;

  return (
    <section id={id} className="ui-library">
      <header className="ui-library__header">
        <h2 className="ui-library__title">{title}</h2>
        <p className="ui-library__subtitle">{subtitle}</p>
      </header>
      <div className="ui-library__grid" style={category === "app" ? { ["--tile-min" as string]: "380px" } : category === "backgrounds" ? { ["--tile-min" as string]: "340px" } : undefined}>
        {items.map((item) => (
          <LibraryCard
            key={item.name}
            {...item}
            href={item.category === 'templates' ? templateUrl(item.name) : undefined}
            open={active === item.name}
            onOpenChange={(o) => setActive(o ? item.name : null)}
          />
        ))}
      </div>
    </section>
  );
}
