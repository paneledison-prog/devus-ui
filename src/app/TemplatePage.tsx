import { useEffect, useState } from 'react';
import { libraryItems } from '../pages/Library/libraryItems';
import { slugify } from '../pages/Library/slug';
import './TemplatePage.css';

type Theme = 'light' | 'dark';

function initialTheme(): Theme {
  try {
    const saved = localStorage.getItem('devus-theme');
    if (saved === 'light' || saved === 'dark') return saved;
  } catch { /* storage unavailable */ }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/** Renders one template on its own, full-window, so it can be explored in a separate browser tab. */
export function TemplatePage({ slug }: { slug: string }) {
  const params = new URLSearchParams(window.location.search);
  const bench = params.get('bench') === '1';
  const item = libraryItems.find((i) => (i.category === 'templates' || (bench && i.category === 'app')) && slugify(i.name) === slug);
  const [theme, setTheme] = useState<Theme>(() => {
    if (!bench) return initialTheme();
    const t: Theme = params.get('theme') === 'dark' ? 'dark' : 'light';
    document.documentElement.dataset.theme = t; // set before the children mount: demos read it for their initial theme
    return t;
  });
  const [size, setSize] = useState({ w: window.innerWidth, h: window.innerHeight });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    if (bench) return; // the bench never touches the saved site theme
    try { localStorage.setItem('devus-theme', theme); } catch { /* ignore */ }
  }, [theme]);

  useEffect(() => {
    document.title = `${item ? item.name : 'Template'} · Devus UI`;
    const onResize = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [item]);

  if (bench && item) {
    // Bench view: the design at its natural size in the top-left corner, no chrome. See helper/<slug>/agent/skills/verify-template.
    return (
      <div id="bench-root" style={{ position: 'absolute', top: 0, left: 0, width: item.category === 'templates' ? (item.canvas?.[0] ?? undefined) : undefined, height: item.category === 'templates' ? (item.canvas?.[1] ?? undefined) : undefined, display: 'inline-block' }}>
        {item.preview}
      </div>
    );
  }

  const BAR = 44;
  let body;
  if (!item) {
    body = (
      <div className="tp-missing">
        <h1>Template not found</h1>
        <p>There is no template called “{slug}”.</p>
        <a href="/#templates">Back to the library</a>
      </div>
    );
  } else if (item.standalone) {
    body = <div className="tp-fill">{item.standalone}</div>;
  } else {
    const [cw, ch] = item.canvas ?? [720, 440];
    const scale = Math.max(0.2, Math.min((size.w - 48) / cw, (size.h - BAR - 48) / ch));
    body = (
      <div className="tp-center">
        <div style={{ width: cw * scale, height: ch * scale }}>
          <div style={{ width: cw, height: ch, transform: `scale(${scale})`, transformOrigin: 'top left' }}>{item.preview}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="tp">
      <header className="tp-bar">
        <a className="tp-back" href="/#templates">← Library</a>
        <span className="tp-title">{item?.name ?? 'Template'}</span>
        <button
          type="button" className="tp-theme" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'} title="Toggle site theme"
        >
          {theme === 'dark' ? 'Light' : 'Dark'}
        </button>
      </header>
      <main className="tp-main">{body}</main>
    </div>
  );
}
