import { useEffect, useMemo, useRef, useState } from 'react';
import { I, ic, Root, ThemeSwitch, useDemoTheme, useOutside, useToast, type Theme } from './shared';
import './Beacon.css';

/* ---------- Data (all fictional) ---------- */
interface Co { id: number; name: string; sector: string; stage: string; funding: number; growth: number; hq: string; founded: number; staff: number; color: string; investors: string[]; people: string[]; blurb: string; rounds: number[]; signals: string[]; tab: 'featured' | 'new' }
const CO: Co[] = [
  { id: 1, name: 'Orbit Freight', sector: 'Logistics', stage: 'Series B', funding: 84, growth: 38, hq: 'Rotterdam', founded: 2019, staff: 210, color: '#3b6fe0', investors: ['Northgate Capital', 'Linden Ventures'], people: ['Mara Voss', 'Jonas Keel'], blurb: 'Route planning for mid-size freight carriers, with live capacity matching.', rounds: [2, 9, 24, 49], signals: ['Hired 14 engineers in 90 days', 'Opened a Hamburg office', 'Enterprise pricing page published'], tab: 'featured' },
  { id: 2, name: 'Quill Health', sector: 'Health tech', stage: 'Series A', funding: 31, growth: 52, hq: 'Austin', founded: 2021, staff: 78, color: '#0f9f8a', investors: ['Linden Ventures', 'Harbor Fund'], people: ['Dr. Ines Ward', 'Theo Marsh'], blurb: 'Clinical note drafting that fits inside existing records software.', rounds: [1.5, 6, 23.5], signals: ['Two hospital pilots converted', 'New chief medical officer', 'SOC 2 report posted'], tab: 'featured' },
  { id: 3, name: 'Fathom Data', sector: 'Data infrastructure', stage: 'Series C', funding: 162, growth: 21, hq: 'London', founded: 2017, staff: 540, color: '#7a56d6', investors: ['Northgate Capital', 'Meridian Partners', 'Ash & Co'], people: ['Priya Raman', 'Lukas Hendry'], blurb: 'A warehouse-native pipeline layer for analytics teams.', rounds: [3, 12, 40, 107], signals: ['Revenue partner program launched', 'Hiring slowed for two quarters', 'Added a Singapore region'], tab: 'featured' },
  { id: 4, name: 'Sable Energy', sector: 'Climate', stage: 'Seed', funding: 9, growth: 64, hq: 'Oslo', founded: 2023, staff: 24, color: '#d9822b', investors: ['Harbor Fund'], people: ['Elin Dahl', 'Rune Aas'], blurb: 'Grid-scale battery scheduling for small utilities.', rounds: [2, 7], signals: ['First utility contract signed', 'Founder joined an advisory panel'], tab: 'new' },
  { id: 5, name: 'Marrow Labs', sector: 'Biotech', stage: 'Series A', funding: 46, growth: 29, hq: 'Boston', founded: 2020, staff: 96, color: '#d6477f', investors: ['Ash & Co', 'Meridian Partners'], people: ['Dr. Sana Okoye', 'Ben Whitlock'], blurb: 'Cell-therapy manufacturing software with batch traceability.', rounds: [4, 12, 30], signals: ['Phase 1 site partnership', 'Patent granted'], tab: 'featured' },
  { id: 6, name: 'Tern Mobility', sector: 'Mobility', stage: 'Seed', funding: 12, growth: 47, hq: 'Berlin', founded: 2023, staff: 31, color: '#1d8fc4', investors: ['Linden Ventures'], people: ['Kasper Lind', 'Amara Fox'], blurb: 'Fleet charging orchestration for city delivery vans.', rounds: [2.5, 9.5], signals: ['Pilot with two courier fleets', 'Hiring a head of sales'], tab: 'new' },
  { id: 7, name: 'Lumen Pay', sector: 'Fintech', stage: 'Series B', funding: 97, growth: 33, hq: 'Singapore', founded: 2019, staff: 260, color: '#2a9d5c', investors: ['Meridian Partners', 'Northgate Capital'], people: ['Wei Tan', 'Rhea Kapoor'], blurb: 'Cross-border payouts for marketplaces and gig platforms.', rounds: [3, 14, 30, 50], signals: ['Licence granted in two markets', 'Volume up 3x year over year'], tab: 'featured' },
  { id: 8, name: 'Halcyon Robotics', sector: 'Robotics', stage: 'Series A', funding: 38, growth: 41, hq: 'Zurich', founded: 2021, staff: 88, color: '#c9482d', investors: ['Ash & Co'], people: ['Noa Brandt', 'Felix Moor'], blurb: 'Warehouse picking arms that learn new items from a handful of demos.', rounds: [3, 10, 25], signals: ['Second production line announced', 'Hired a VP of manufacturing'], tab: 'new' },
];
const PEOPLE = CO.flatMap((c) => c.people.map((p) => ({ name: p, co: c })));
const INVESTORS = Array.from(new Set(CO.flatMap((c) => c.investors))).map((n) => ({ name: n, cos: CO.filter((c) => c.investors.includes(n)) }));
const initials = (n: string) => n.replace(/^Dr\. /, '').split(/[ &]+/).slice(0, 2).map((w) => w[0]).join('');

/* ---------- Charts ---------- */
function FundingChart({ rounds, color }: { rounds: number[]; color: string }) {
  const max = Math.max(...rounds);
  const labels = ['Seed', 'A', 'B', 'C'];
  return (
    <svg viewBox="0 0 320 130" className="bc-chart" role="img" aria-label={`Funding rounds, millions: ${rounds.join(', ')}`}>
      {[0, 1, 2].map((i) => <line key={i} x1="0" x2="320" y1={20 + i * 40} y2={20 + i * 40} stroke="var(--a-line)" />)}
      {rounds.map((r, i) => {
        const h = (r / max) * 90; const x = 24 + i * (272 / rounds.length);
        return <g key={i}><rect x={x} y={110 - h} width="38" height={h} rx="6" fill={color} opacity={0.35 + 0.65 * ((i + 1) / rounds.length)} /><text x={x + 19} y="125" textAnchor="middle" fontSize="10" fill="var(--a-muted)">{labels[i]}</text><text x={x + 19} y={104 - h} textAnchor="middle" fontSize="10" fill="var(--a-text)">${r}M</text></g>;
      })}
    </svg>
  );
}

export interface BeaconDemoProps {
  /** Open straight onto a company page. */
  startAt?: 'list' | 'detail';
  defaultTheme?: Theme;
}

export function BeaconDemo({ startAt = 'list', defaultTheme }: BeaconDemoProps) {
  const [theme, setTheme] = useDemoTheme(defaultTheme);
  const [tab, setTab] = useState<'featured' | 'new' | 'watch'>('featured');
  const [q, setQ] = useState('');
  const [sort, setSort] = useState<'none' | 'desc' | 'asc'>('none');
  const [watch, setWatch] = useState<Set<number>>(new Set([2]));
  const [open, setOpen] = useState<number | null>(startAt === 'detail' ? 3 : null);
  const [palette, setPalette] = useState(false);
  const [pTab, setPTab] = useState<'Companies' | 'People' | 'Investors'>('Companies');
  const [pq, setPq] = useState('');
  const [pIdx, setPIdx] = useState(0);
  const [menu, setMenu] = useState(false);
  const [alertsOn, setAlertsOn] = useState(true);
  const toast = useToast();
  const menuRef = useOutside(menu, () => setMenu(false));
  const pRef = useRef<HTMLInputElement>(null);

  const rows = useMemo(() => {
    let r = CO.filter((c) => (tab === 'watch' ? watch.has(c.id) : c.tab === tab || (tab === 'featured' && c.tab === 'featured')));
    if (q.trim()) r = r.filter((c) => (c.name + c.sector + c.hq).toLowerCase().includes(q.trim().toLowerCase()));
    if (sort !== 'none') r = [...r].sort((a, b) => (sort === 'desc' ? b.funding - a.funding : a.funding - b.funding));
    return r;
  }, [tab, q, sort, watch]);

  const results = useMemo(() => {
    const s = pq.trim().toLowerCase();
    if (pTab === 'Companies') return CO.filter((c) => c.name.toLowerCase().includes(s)).map((c) => ({ key: 'c' + c.id, title: c.name, sub: `${c.sector} · ${c.hq}`, co: c, color: c.color }));
    if (pTab === 'People') return PEOPLE.filter((p) => p.name.toLowerCase().includes(s)).map((p) => ({ key: p.name, title: p.name, sub: `Founder · ${p.co.name}`, co: p.co, color: p.co.color }));
    return INVESTORS.filter((v) => v.name.toLowerCase().includes(s)).map((v) => ({ key: v.name, title: v.name, sub: `${v.cos.length} portfolio companies`, co: v.cos[0], color: '#555' }));
  }, [pTab, pq]);

  const openPalette = () => { setPalette(true); setPq(''); setPIdx(0); setPTab('Companies'); };
  useEffect(() => { if (palette) pRef.current?.focus(); }, [palette]);
  const pick = (i: number) => { const r = results[i]; if (!r) return; setPalette(false); setOpen(r.co.id); };
  const co = open ? CO.find((c) => c.id === open) : null;
  const toggleWatch = (id: number) => setWatch((w) => { const n = new Set(w); if (n.has(id)) { n.delete(id); toast.show('Removed from watchlist'); } else { n.add(id); toast.show('Added to watchlist'); } return n; });

  return (
    <Root theme={theme} name="Beacon Intelligence demo" className="bc">
      <div className="ag-win" style={{ flexDirection: 'column' }} onKeyDown={(e) => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openPalette(); } }} tabIndex={-1}>
        <header className="bc-top">
          <button className="bc-brand" onClick={() => setOpen(null)} aria-label="Beacon Intelligence home"><span className="bc-mark">{ic.spark}</span>Beacon</button>
          <button className="bc-search" onClick={openPalette}>{ic.search}<span className="ag-grow">Search companies, people, investors</span><span className="ag-kbd">Ctrl K</span></button>
          <div style={{ position: 'relative' }} ref={menuRef}>
            <button className="bc-ws" aria-haspopup="menu" aria-expanded={menu} onClick={() => setMenu((m) => !m)}><span className="ag-avatar" style={{ background: '#3b6fe0', width: 24, height: 24 }}>NG</span>Northgate<I size={14} d={<path d="m6 9 6 6 6-6" />} /></button>
            {menu ? (
              <div className="ag-pop" role="menu" style={{ right: 0, top: 40, width: 260 }}>
                <div className="ag-row" style={{ padding: '8px 10px' }}><span className="ag-avatar" style={{ background: '#3b6fe0' }}>NG</span><div><b>Northgate team</b><div className="ag-muted">6 seats · Research plan</div></div></div>
                <hr />
                <div className="ag-row" style={{ padding: '4px 10px', justifyContent: 'space-between' }}><span>Appearance</span><ThemeSwitch theme={theme} setTheme={setTheme} /></div>
                <div className="ag-row" style={{ padding: '8px 10px', justifyContent: 'space-between' }}><span>Weekly signal email</span><button type="button" role="switch" aria-checked={alertsOn} aria-label="Weekly signal email" className="ag-switch" data-on={alertsOn} onClick={() => setAlertsOn(!alertsOn)}><span /></button></div>
                <hr />
                <button className="ag-item" role="menuitem" onClick={() => { setMenu(false); toast.show('Export started: companies.csv'); }}>{ic.doc} Export list</button>
                <button className="ag-item" role="menuitem" onClick={() => { setMenu(false); toast.show('Signed out (demo)'); }}>{ic.back} Sign out</button>
              </div>
            ) : null}
          </div>
        </header>

        {co ? (
          <div className="ag-scroll bc-detail">
            <button className="ag-btn ag-btn--ghost ag-btn--sm" onClick={() => setOpen(null)}>{ic.back} All companies</button>
            <div className="bc-hero">
              <span className="bc-logo" style={{ background: co.color }}>{co.name[0]}</span>
              <div className="ag-grow"><h1>{co.name}</h1><p className="ag-muted">{co.blurb}</p><div className="ag-chips" style={{ marginTop: 10 }}><span className="ag-pill">{co.sector}</span><span className="ag-pill" data-tone="accent">{co.stage}</span><span className="ag-pill">{co.hq}</span><span className="ag-pill">Founded {co.founded}</span></div></div>
              <button className="ag-btn ag-btn--ghost" onClick={() => toggleWatch(co.id)} aria-pressed={watch.has(co.id)}>{ic.star}{watch.has(co.id) ? 'Watching' : 'Watch'}</button>
            </div>
            <div className="bc-grid">
              <section className="ag-card bc-panel"><h3>Funding rounds</h3><p className="ag-muted">${co.funding}M raised in total</p><FundingChart rounds={co.rounds} color={co.color} /></section>
              <section className="ag-card bc-panel"><h3>Growth signals</h3><p className="ag-muted">Score {co.growth} / 100</p><div className="ag-bar" style={{ margin: '10px 0 14px' }}><i style={{ width: `${co.growth}%` }} /></div><ul className="bc-list">{co.signals.map((s) => <li key={s}><span className="bc-dot" />{s}</li>)}</ul></section>
              <section className="ag-card bc-panel"><h3>People</h3><ul className="bc-list">{co.people.map((p) => <li key={p}><span className="ag-avatar" style={{ background: co.color }}>{initials(p)}</span>{p}<span className="ag-pill" style={{ marginLeft: 'auto' }}>Founder</span></li>)}<li><span className="ag-avatar" style={{ background: 'var(--a-muted)' }}>+</span><span className="ag-muted">{co.staff} employees</span></li></ul></section>
              <section className="ag-card bc-panel"><h3>Investors</h3><ul className="bc-list">{co.investors.map((v) => <li key={v}><span className="bc-inv">{ic.building}</span>{v}</li>)}</ul></section>
            </div>
          </div>
        ) : (
          <div className="ag-scroll">
            <div className="bc-banner"><div className="bc-banner__copy"><h1>Know who is growing before everyone else</h1><p>Companies, people, funding and growth signals in one place.</p></div></div>
            <div className="ag-tabs" role="tablist">
              {([['featured', 'Featured'], ['new', 'New this week'], ['watch', `Watchlist (${watch.size})`]] as const).map(([k, l]) => <button key={k} role="tab" aria-selected={tab === k} className="ag-tab" onClick={() => setTab(k)}>{l}</button>)}
              <span className="ag-grow" />
              <label className="bc-filter">{ic.search}<input aria-label="Filter companies" placeholder="Filter" value={q} onChange={(e) => setQ(e.target.value)} /></label>
            </div>
            <table className="ag-table">
              <thead><tr><th>Company</th><th>Sector</th><th>Stage</th><th className="num"><button className="ag-thbtn" onClick={() => setSort((s) => (s === 'none' ? 'desc' : s === 'desc' ? 'asc' : 'none'))}>Funding {sort === 'desc' ? '↓' : sort === 'asc' ? '↑' : ''}</button></th><th>Growth</th><th aria-label="Watch" /></tr></thead>
              <tbody>
                {rows.map((c) => (
                  <tr key={c.id} data-click="true" onClick={() => setOpen(c.id)}>
                    <td><span className="ag-row"><span className="bc-logo bc-logo--sm" style={{ background: c.color }}>{c.name[0]}</span><b>{c.name}</b></span></td>
                    <td className="ag-muted">{c.sector}</td><td><span className="ag-pill">{c.stage}</span></td>
                    <td className="num">${c.funding}M</td>
                    <td><span className="ag-row" style={{ gap: 8 }}><span className="ag-bar" style={{ width: 70 }}><i style={{ width: `${c.growth}%`, background: c.growth > 45 ? 'var(--a-good)' : 'var(--a-accent)' }} /></span>{c.growth}</span></td>
                    <td><button className="ag-icon" aria-label={watch.has(c.id) ? `Unwatch ${c.name}` : `Watch ${c.name}`} aria-pressed={watch.has(c.id)} style={watch.has(c.id) ? { color: 'var(--a-warn)' } : undefined} onClick={(e) => { e.stopPropagation(); toggleWatch(c.id); }}>{ic.star}</button></td>
                  </tr>
                ))}
                {rows.length === 0 ? <tr><td colSpan={6} className="ag-muted" style={{ textAlign: 'center', height: 120 }}>{tab === 'watch' ? 'Star a company to follow it here.' : 'No companies match.'}</td></tr> : null}
              </tbody>
            </table>
          </div>
        )}

        {palette ? (
          <div className="ag-scrim bc-palette-scrim" onMouseDown={(e) => { if (e.target === e.currentTarget) setPalette(false); }}>
            <div className="bc-palette" role="dialog" aria-modal="true" aria-label="Command palette" onKeyDown={(e) => {
              if (e.key === 'Escape') setPalette(false);
              if (e.key === 'ArrowDown') { e.preventDefault(); setPIdx((i) => Math.min(results.length - 1, i + 1)); }
              if (e.key === 'ArrowUp') { e.preventDefault(); setPIdx((i) => Math.max(0, i - 1)); }
              if (e.key === 'Enter') pick(pIdx);
            }}>
              <div className="bc-palette__in">{ic.search}<input ref={pRef} placeholder={`Search ${pTab.toLowerCase()}`} value={pq} onChange={(e) => { setPq(e.target.value); setPIdx(0); }} aria-label="Search" /><span className="ag-kbd">Esc</span></div>
              <div className="ag-tabs" role="tablist" style={{ padding: '0 10px' }}>{(['Companies', 'People', 'Investors'] as const).map((t) => <button key={t} role="tab" aria-selected={pTab === t} className="ag-tab" onClick={() => { setPTab(t); setPIdx(0); }}>{t}</button>)}</div>
              <ul className="bc-results" role="listbox">
                {results.map((r, i) => <li key={r.key} role="option" aria-selected={i === pIdx} onMouseEnter={() => setPIdx(i)} onClick={() => pick(i)}><span className="bc-logo bc-logo--sm" style={{ background: r.color }}>{r.title[0]}</span><span className="ag-grow"><b>{r.title}</b><span className="ag-muted"> {r.sub}</span></span>{i === pIdx ? <span className="ag-kbd">↵</span> : null}</li>)}
                {results.length === 0 ? <li className="ag-muted" style={{ justifyContent: 'center', height: 80 }}>Nothing found</li> : null}
              </ul>
            </div>
          </div>
        ) : null}
        {toast.node}
      </div>
    </Root>
  );
}
