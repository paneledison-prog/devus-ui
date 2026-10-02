import { useEffect, useMemo, useRef, useState } from 'react';
import type { LibraryItem } from '../../pages/Library/libraryItems';
import './SearchDialog.css';

export interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
  items: LibraryItem[];
  /** Called when the user picks a result. */
  onSelect: (item: LibraryItem) => void;
}

const RECENT_KEY = 'devus-recent-searches';
const MAX_RECENT = 6;

function loadRecent(): string[] {
  try {
    const raw = JSON.parse(localStorage.getItem(RECENT_KEY) ?? '[]');
    return Array.isArray(raw) ? raw.filter((x): x is string => typeof x === 'string') : [];
  } catch { return []; }
}

function saveRecent(name: string): string[] {
  const next = [name, ...loadRecent().filter((n) => n !== name)].slice(0, MAX_RECENT);
  try { localStorage.setItem(RECENT_KEY, JSON.stringify(next)); } catch { /* storage unavailable */ }
  return next;
}

function Thumb({ item }: { item: LibraryItem }) {
  return (
    <span className="ui-search__thumb" aria-hidden="true">
      <span className="ui-search__thumb-inner" style={item.fill ? { width: 200, height: 200 } : undefined}>{item.preview}</span>
    </span>
  );
}

export function SearchDialog({ open, onClose, items, onSelect }: SearchDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      setQuery('');
      setActive(0);
      setRecent(loadRecent());
      d.showModal();
      inputRef.current?.focus();
    }
    if (!open && d.open) d.close();
  }, [open]);

  const q = query.trim().toLowerCase();
  const results = useMemo(
    () => (q ? items.filter((i) => `${i.name} ${i.prompt}`.toLowerCase().includes(q)) : []),
    [items, q],
  );
  const recentItems = useMemo(
    () => recent.map((n) => items.find((i) => i.name === n)).filter((i): i is LibraryItem => Boolean(i)),
    [recent, items],
  );

  // What the list below the input currently shows, in order (drives arrow-key navigation).
  const visible = q ? results : [...recentItems, ...items.filter((i) => !recentItems.includes(i))];
  const idx = Math.min(active, Math.max(visible.length - 1, 0));

  const choose = (item: LibraryItem) => {
    setRecent(saveRecent(item.name));
    onSelect(item);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((idx + 1) % Math.max(visible.length, 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((idx - 1 + visible.length) % Math.max(visible.length, 1)); }
    else if (e.key === 'Enter' && visible[idx]) { e.preventDefault(); choose(visible[idx]); }
  };

  const row = (item: LibraryItem, i: number) => (
    <li key={item.name} role="option" id={`search-opt-${item.name}`} aria-selected={i === idx}>
      <button type="button" className="ui-search__row" data-active={i === idx} onMouseEnter={() => setActive(i)} onClick={() => choose(item)}>
        <Thumb item={item} />
        <span className="ui-search__name">{item.name}</span>
        <span className="ui-search__meta">{item.variants} {item.variants === 1 ? 'variant' : 'variants'}</span>
      </button>
    </li>
  );

  return (
    <dialog ref={ref} className="ui-search" aria-label="Search components" onClose={onClose}
      onClick={(e) => { if (e.target === ref.current) onClose(); }}>
      <div className="ui-search__bar">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
        </svg>
        <input
          ref={inputRef} className="ui-search__input" type="search" placeholder="Search components"
          value={query} onChange={(e) => { setQuery(e.target.value); setActive(0); }} onKeyDown={onKeyDown}
          role="combobox" aria-expanded aria-autocomplete="list"
          aria-activedescendant={visible[idx] ? `search-opt-${visible[idx].name}` : undefined}
          autoComplete="off" spellCheck={false}
        />
        <kbd className="ui-search__esc">Esc</kbd>
      </div>

      <div className="ui-search__body">
        {q && results.length === 0 && (
          <p className="ui-search__empty">No components match “{query.trim()}”. Try “button”, “toggle” or “loading”.</p>
        )}

        {!q && recentItems.length > 0 && <h2 className="ui-search__heading">Recent searches</h2>}
        {q && results.length > 0 && <h2 className="ui-search__heading">Results</h2>}

        {!q && recentItems.length > 0 && (
          <ul role="listbox" className="ui-search__list" aria-label="Recent searches">
            {recentItems.map((it, i) => row(it, i))}
          </ul>
        )}

        {!q && (
          <>
            <h2 className="ui-search__heading">{recentItems.length > 0 ? 'All components' : 'Browse components'}</h2>
            <ul role="listbox" className="ui-search__list" aria-label="All components">
              {visible.slice(recentItems.length).map((it, i) => row(it, i + recentItems.length))}
            </ul>
          </>
        )}

        {q && (
          <ul role="listbox" className="ui-search__list" aria-label="Results">
            {results.map((it, i) => row(it, i))}
          </ul>
        )}
      </div>
    </dialog>
  );
}
