import { useEffect, useState } from 'react';
import { Button } from '../components/Button/Button';
import { LibraryPage } from '../pages/Library/LibraryPage';
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

export function App() {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('devus-theme', theme); } catch { /* ignore */ }
  }, [theme]);

  return (
    <>
      <header className="site-header">
        <div className="site-header__inner">
          <a className="site-logo" href="/" aria-label="Devus UI home">
            <span className="site-logo__mark" aria-hidden>D</span>
            Devus UI
          </a>
          <nav className="site-nav" aria-label="Main">
            <a href="#library">Components</a>
            <a href={STORYBOOK_URL} target="_blank" rel="noreferrer">Storybook</a>
          </nav>
          <Button
            variant="ghost" size="sm" iconOnly
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? '☀' : '☾'}
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
            <a href="#library"><Button size="lg">Browse components</Button></a>
            <a href={STORYBOOK_URL} target="_blank" rel="noreferrer"><Button size="lg" variant="secondary">Open Storybook</Button></a>
          </div>
        </section>

        <LibraryPage id="library" title="Components" subtitle="Click a tile for a large preview, or copy its code or master prompt." />
      </main>

      <footer className="site-footer">
        <span>© {new Date().getFullYear()} Devus UI</span>
        <a href="https://devus.space">devus.space</a>
      </footer>
    </>
  );
}
