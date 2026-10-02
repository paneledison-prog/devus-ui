import { LibraryCard } from '../../components/LibraryCard/LibraryCard';
import { libraryItems } from './libraryItems';
import './LibraryPage.css';

export function LibraryPage() {
  return (
    <main className="ui-library">
      <header className="ui-library__header">
        <h1 className="ui-library__title">Devus UI</h1>
        <p className="ui-library__subtitle">
          Browse every Devus UI component. Click a tile for a large preview, or copy its code or master prompt.
        </p>
      </header>
      <div className="ui-library__grid">
        {libraryItems.map((item) => <LibraryCard key={item.name} {...item} />)}
      </div>
    </main>
  );
}
