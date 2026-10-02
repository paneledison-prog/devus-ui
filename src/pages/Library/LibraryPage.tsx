import { LibraryCard } from '../../components/LibraryCard/LibraryCard';
import { libraryItems } from './libraryItems';
import './LibraryPage.css';

export interface LibraryPageProps {
  id?: string;
  title?: string;
  subtitle?: string;
}

export function LibraryPage({
  id,
  title = 'Devus UI',
  subtitle = 'Browse every Devus UI component. Click a tile for a large preview, or copy its code or master prompt.',
}: LibraryPageProps) {
  return (
    <section id={id} className="ui-library">
      <header className="ui-library__header">
        <h2 className="ui-library__title">{title}</h2>
        <p className="ui-library__subtitle">{subtitle}</p>
      </header>
      <div className="ui-library__grid">
        {libraryItems.map((item) => <LibraryCard key={item.name} {...item} />)}
      </div>
    </section>
  );
}
