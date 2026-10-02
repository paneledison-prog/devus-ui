import { useEffect, useState } from 'react';
import { Button } from '../components/Button/Button';
import { Logo } from '../components/Logo/Logo';
import { SearchDialog } from '../components/Search/SearchDialog';
import { LibraryPage } from '../pages/Library/LibraryPage';
import { libraryItems, libraryCategories, type LibraryItem } from '../pages/Library/libraryItems';
import './App.css';

const STORYBOOK_URL = 'https://storybook.devus.space';
type Theme = 'light' | 'dark';

function initialTheme(): Theme {
  try {
    const saved = localStorage.getItem('devus-theme');
    if (saved === 'light' || saved === 'dark') return saved;
  } catch { /* storage unavailable */ }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);

export function App() {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('devus-theme', theme); } catch { /* ignore */ }
  }, [theme]);

  // Ctrl/Cmd + K opens search from anywhere.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const selectResult = (item: LibraryItem) => {
    setSearchOpen(false);
    document.getElementById(item.category)?.scrollIntoView({ block: 'start' });
    setActiveItem(item.name);
  };

  return (
    <>
      <header className="site-header">
        <div className="site-header__inner">
          <a className="site-logo" href="/" aria-label="Devus UI home">
            <Logo size={30} />
            Devus UI
          </a>
          <nav className="site-nav" aria-label="Main">
            {libraryCategories.map((c) => <a key={c.id} href={`#${c.id}`}>{c.label}</a>)}
            <a href={STORYBOOK_URL} target="_blank" rel="noreferrer">Storybook</a>
          </nav>
          <Button
            variant="secondary" size="sm" className="site-search-btn" aria-label="Search components"
            aria-keyshortcuts={isMac ? 'Meta+K' : 'Control+K'} onClick={() => setSearchOpen(true)}
            startContent={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
              </svg>
            }
          >
            <span className="site-search-btn__label">Search</span>
            <kbd className="site-search-btn__kbd">{isMac ? '⌘K' : 'Ctrl K'}</kbd>
          </Button>
          <Button
            variant="ghost" size="sm" iconOnly title="Toggle theme"
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
              <path d="M12 3l0 18" />
              <path d="M12 9l4.65 -4.65" />
              <path d="M12 14.3l7.37 -7.37" />
              <path d="M12 19.6l8.85 -8.85" />
            </svg>
          </Button>
        </div>
      </header>

      <main>
        <section className="hero">
          <p className="hero__eyebrow">Open component library</p>
          <h1 className="hero__title">Build interfaces faster with Devus UI</h1>
          <p className="hero__lead">
            Accessible React components built on a consistent set of design tokens. Preview every component,
            then copy it as code or as a master prompt.
          </p>
          <div className="hero__actions">
            <a href="#components"><Button size="lg">Browse components</Button></a>
            <a href={STORYBOOK_URL} target="_blank" rel="noreferrer"><Button size="lg" variant="secondary">Open Storybook</Button></a>
          </div>
        </section>

        {libraryCategories.map((c) => (
          <LibraryPage
            key={c.id} id={c.id} category={c.id} title={c.label} subtitle={c.subtitle}
            activeItem={activeItem} onActiveItemChange={setActiveItem}
          />
        ))}
      </main>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} items={libraryItems} onSelect={selectResult} />

      <footer className="site-footer">
        <span>© {new Date().getFullYear()} Devus UI</span>
        <a href="https://devus.space">devus.space</a>
      </footer>
    </>
  );
}
