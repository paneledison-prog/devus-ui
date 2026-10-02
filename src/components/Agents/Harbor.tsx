import { useEffect, useRef, useState } from 'react';
import { ic, Modal, Root, ThemeSwitch, Toggle, useDemoTheme, useOutside, useToast, type Theme } from './shared';
import './Harbor.css';

type View = 'chat' | 'assistants' | 'knowledge' | 'integrations' | 'console';

const MODELS = [
  { id: 'swift', name: 'Harbor Swift', note: 'Fast answers for everyday questions.', cost: '1x' },
  { id: 'deep', name: 'Harbor Deep', note: 'Slower, better at long reasoning and code.', cost: '4x' },
  { id: 'vision', name: 'Harbor Vision', note: 'Reads images, charts and scanned pages.', cost: '2x' },
];
const NAV: { id: View; label: string; icon: React.ReactNode }[] = [
  { id: 'chat', label: 'Chat', icon: ic.chat }, { id: 'assistants', label: 'Assistants', icon: ic.bot }, { id: 'knowledge', label: 'Knowledge', icon: ic.book },
  { id: 'integrations', label: 'Integrations', icon: ic.plug }, { id: 'console', label: 'Console', icon: ic.terminal },
];
const ASSISTANTS = [
  { name: 'Contract reviewer', desc: 'Flags risky clauses and drafts redlines.', uses: 124 }, { name: 'Support triage', desc: 'Sorts tickets and drafts first replies.', uses: 842 },
  { name: 'Meeting notes', desc: 'Turns transcripts into decisions and owners.', uses: 391 }, { name: 'Onboarding guide', desc: 'Answers new hire questions from the handbook.', uses: 77 },
];
const SOURCES = [{ name: 'Company handbook.pdf', size: '2.4 MB', on: true }, { name: 'Pricing sheet 2026', size: 'Sheet', on: true }, { name: 'Security policy', size: '640 KB', on: false }, { name: 'Product roadmap', size: 'Page', on: true }];
const TOOLS = [{ name: 'Mailroom', desc: 'Read and draft email', on: true }, { name: 'Calendar', desc: 'Find and book time', on: true }, { name: 'Ticket desk', desc: 'Search and update tickets', on: false }, { name: 'Drive', desc: 'Search shared files', on: false }, { name: 'Data warehouse', desc: 'Run read-only queries', on: false }];
interface Key { id: number; name: string; prefix: string; spend: number; limit: number; scope: string; created: string }
const KEYS0: Key[] = [{ id: 1, name: 'Production backend', prefix: 'hb_live_4f2a', spend: 182, limit: 250, scope: 'All models', created: 'Aug 12' }, { id: 2, name: 'Internal tools', prefix: 'hb_live_91cd', spend: 38, limit: 100, scope: 'Swift only', created: 'Sep 03' }, { id: 3, name: 'Staging', prefix: 'hb_test_07be', spend: 9, limit: 50, scope: 'All models', created: 'Sep 21' }];

const REPLIES = [
  'Here is a short plan: gather the source documents, list the open questions, then draft a first version for review. I can start with the handbook if you like.',
  'Based on the knowledge you connected, the refund window is 30 days and approvals above $500 need a second reviewer.',
  'I can do that. I will check your calendar for Thursday, propose three slots and draft the invite. Nothing is sent until you approve it.',
];

export interface HarborDemoProps { startAt?: View; defaultTheme?: Theme }

export function HarborDemo({ startAt = 'chat', defaultTheme }: HarborDemoProps) {
  const [theme, setTheme] = useDemoTheme(defaultTheme);
  const [view, setView] = useState<View>(startAt);
  const [model, setModel] = useState('swift');
  const [modelMenu, setModelMenu] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const [text, setText] = useState('');
  const [thread, setThread] = useState<{ me: boolean; t: string }[]>([]);
  const [typing, setTyping] = useState(false);
  const [gs, setGs] = useState(false);
  const [gsDone, setGsDone] = useState([true, false, false, false]);
  const [kb, setKb] = useState(SOURCES);
  const [tools, setTools] = useState(TOOLS);
  const [keys, setKeys] = useState(KEYS0);
  const [wiz, setWiz] = useState(0);
  const [kName, setKName] = useState('');
  const [kScope, setKScope] = useState('All models');
  const [kLimit, setKLimit] = useState(100);
  const [made, setMade] = useState('');
  const toast = useToast();
  const mRef = useOutside(modelMenu, () => setModelMenu(false));
  const gRef = useOutside(gs, () => setGs(false));
  const timer = useRef<number>(0);
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  useEffect(() => { endRef.current?.scrollIntoView?.({ block: 'end' }); }, [thread, typing]);

  const send = (t = text) => {
    const v = t.trim(); if (!v || typing) return;
    setThread((x) => [...x, { me: true, t: v }]); setText(''); setTyping(true);
    setGsDone((d) => d.map((x, i) => (i === 1 ? true : x)));
    timer.current = window.setTimeout(() => { setThread((x) => [...x, { me: false, t: /refund|policy|ticket/i.test(v) ? REPLIES[1] : /calendar|week|meeting|book/i.test(v) ? REPLIES[2] : REPLIES[0] }]); setTyping(false); }, 900);
  };
  const cur = MODELS.find((m) => m.id === model)!;
  const doneCount = gsDone.filter(Boolean).length;
  const tick = (i: number) => setGsDone((d) => d.map((x, j) => (j === i ? !x : x)));
  const closeWiz = () => { setWiz(0); setKName(''); setKScope('All models'); setKLimit(100); setMade(''); };
  const makeKey = () => {
    const secret = 'hb_live_' + Array.from({ length: 24 }, (_, i) => 'abcdef0123456789'[(i * 7 + kName.length * 3 + kLimit) % 16]).join('');
    setMade(secret); setKeys((k) => [...k, { id: Date.now(), name: kName.trim(), prefix: secret.slice(0, 12), spend: 0, limit: kLimit, scope: kScope, created: 'Today' }]);
    setWiz(3); setGsDone((d) => d.map((x, i) => (i === 3 ? true : x)));
  };
  const totalSpend = keys.reduce((a, k) => a + k.spend, 0);

  return (
    <Root theme={theme} name="Harbor AI platform demo" className="hb">
      <div className="ag-win">
        <aside className="hb-side">
          <div className="hb-brand"><span className="hb-mark">{ic.spark}</span>Harbor</div>
          <nav aria-label="Primary">
            {NAV.map((n) => <button key={n.id} className="hb-nav" aria-current={view === n.id ? 'page' : undefined} onClick={() => setView(n.id)}>{n.icon}{n.label}</button>)}
          </nav>
          <div className="ag-grow" />
          <div style={{ position: 'relative' }} ref={gRef}>
            {gs ? (
              <div className="ag-pop hb-gs" role="dialog" aria-label="Getting started">
                <div className="ag-row" style={{ justifyContent: 'space-between', padding: '6px 8px' }}><b>Getting started</b><span className="ag-muted">{doneCount}/4</span></div>
                <div className="ag-bar" style={{ margin: '0 8px 8px' }}><i style={{ width: `${(doneCount / 4) * 100}%` }} /></div>
                {['Create your workspace', 'Send a first message', 'Connect knowledge', 'Create an API key'].map((l, i) => (
                  <button key={l} className="ag-item" onClick={() => tick(i)} aria-pressed={gsDone[i]}><span className={`hb-check${gsDone[i] ? ' on' : ''}`}>{gsDone[i] ? ic.check : null}</span><span style={gsDone[i] ? { textDecoration: 'line-through', opacity: .6 } : undefined}>{l}</span></button>
                ))}
              </div>
            ) : null}
            <button className="hb-gsbtn" aria-expanded={gs} onClick={() => setGs((g) => !g)}>{ic.bolt} Getting started <span className="ag-pill" data-tone="accent" style={{ marginLeft: 'auto' }}>{doneCount}/4</span></button>
          </div>
          <div className="hb-theme"><ThemeSwitch theme={theme} setTheme={setTheme} /></div>
        </aside>

        <main className="ag-main">
          {view === 'chat' ? (
            <div className="hb-chat">
              <div className="ag-scroll hb-thread">
                {thread.length === 0 ? (
                  <div className="hb-empty"><h1>What are we working on?</h1><p className="ag-muted">Chat with your company knowledge, assistants and tools.</p>
                    <div className="ag-chips" style={{ justifyContent: 'center', marginTop: 18 }}>{['Summarize our refund policy', 'Plan next week with my calendar', 'Draft a reply to the latest ticket'].map((s) => <button key={s} className="ag-chip" onClick={() => send(s)}>{s}</button>)}</div>
                  </div>
                ) : (
                  <div className="hb-msgs">{thread.map((m, i) => <div key={i} className={`hb-msg${m.me ? ' me' : ''}`}>{m.t}</div>)}{typing ? <div className="hb-msg hb-typing" aria-label="Harbor is typing"><i /><i /><i /></div> : null}<div ref={endRef} /></div>
                )}
              </div>
              <form className="hb-composer" onSubmit={(e) => { e.preventDefault(); send(); }}>
                <textarea aria-label="Message" rows={2} placeholder="Ask anything, or @ to mention an assistant" value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }} />
                <div className="ag-row">
                  <div style={{ position: 'relative' }} ref={mRef}>
                    <button type="button" className="ag-btn ag-btn--ghost ag-btn--sm" aria-haspopup="listbox" aria-expanded={modelMenu} onClick={() => setModelMenu((o) => !o)}>{cur.name}{ic.chevron}</button>
                    {modelMenu ? (
                      <div className="ag-pop hb-models" role="listbox" aria-label="Model">
                        {MODELS.map((m) => (
                          <button key={m.id} role="option" aria-selected={m.id === model} className="ag-item" onMouseEnter={() => setHover(m.id)} onMouseLeave={() => setHover(null)} onFocus={() => setHover(m.id)} onBlur={() => setHover(null)} onClick={() => { setModel(m.id); setModelMenu(false); }}>
                            <span className="ag-grow">{m.name}</span><span className="ag-muted">{m.cost}</span>{m.id === model ? ic.check : null}
                            {hover === m.id ? <span className="hb-tip" role="tooltip">{m.note}</span> : null}
                          </button>
                        ))}
                      </div>
                    ) : null}
                  </div>
                  <button type="button" className="ag-btn ag-btn--ghost ag-btn--sm" onClick={() => toast.show('Attach files (demo)')}>{ic.plus} Attach</button>
                  <span className="ag-grow" />
                  <button className="ag-btn ag-btn--sm" disabled={!text.trim() || typing}>{ic.send} Send</button>
                </div>
              </form>
            </div>
          ) : null}

          {view === 'assistants' ? (
            <div className="ag-scroll hb-page"><h1>Assistants</h1><p className="ag-muted">Reusable helpers with their own instructions and knowledge.</p>
              <div className="hb-cards">{ASSISTANTS.map((a) => <article key={a.name} className="ag-card hb-acard"><span className="hb-mark">{ic.bot}</span><h3>{a.name}</h3><p className="ag-muted">{a.desc}</p><div className="ag-row"><span className="ag-pill">{a.uses} chats</span><span className="ag-grow" /><button className="ag-btn ag-btn--ghost ag-btn--sm" onClick={() => { setView('chat'); setText(`@${a.name} `); }}>Use</button></div></article>)}</div>
            </div>
          ) : null}

          {view === 'knowledge' ? (
            <div className="ag-scroll hb-page"><h1>Knowledge</h1><p className="ag-muted">Sources the assistants may quote. Turn one off to exclude it.</p>
              <div className="ag-card" style={{ marginTop: 18 }}>{kb.map((s, i) => <div key={s.name} className="hb-line"><span className="hb-ico">{ic.doc}</span><span className="ag-grow"><b>{s.name}</b><div className="ag-muted">{s.size}</div></span><Toggle on={s.on} label={`Use ${s.name}`} onChange={(v) => { setKb((k) => k.map((x, j) => (j === i ? { ...x, on: v } : x))); if (v) setGsDone((d) => d.map((y, j) => (j === 2 ? true : y))); }} /></div>)}</div>
            </div>
          ) : null}

          {view === 'integrations' ? (
            <div className="ag-scroll hb-page"><h1>Integrations</h1><p className="ag-muted">Give assistants permission to act in your tools.</p>
              <div className="ag-card" style={{ marginTop: 18 }}>{tools.map((s, i) => <div key={s.name} className="hb-line"><span className="hb-ico">{ic.plug}</span><span className="ag-grow"><b>{s.name}</b><div className="ag-muted">{s.desc}</div></span><button className={`ag-btn ag-btn--sm${s.on ? ' ag-btn--ghost' : ''}`} onClick={() => { setTools((t) => t.map((x, j) => (j === i ? { ...x, on: !x.on } : x))); toast.show(s.on ? `${s.name} disconnected` : `${s.name} connected`); }}>{s.on ? 'Connected' : 'Connect'}</button></div>)}</div>
            </div>
          ) : null}

          {view === 'console' ? (
            <div className="ag-scroll hb-page">
              <div className="ag-row"><div className="ag-grow"><h1>API keys</h1><p className="ag-muted">This month: ${totalSpend} across {keys.length} keys</p></div><button className="ag-btn" onClick={() => setWiz(1)}>{ic.plus} Create key</button></div>
              <div className="ag-card" style={{ marginTop: 18, overflow: 'hidden' }}>
                <table className="ag-table">
                  <thead><tr><th>Name</th><th>Key</th><th>Scope</th><th style={{ width: 200 }}>Spend</th><th aria-label="Actions" /></tr></thead>
                  <tbody>{keys.map((k) => {
                    const pct = Math.min(100, (k.spend / k.limit) * 100);
                    return <tr key={k.id}><td><b>{k.name}</b><div className="ag-muted">Created {k.created}</div></td><td className="ag-mono">{k.prefix}…</td><td><span className="ag-pill">{k.scope}</span></td>
                      <td><div className="ag-row" style={{ justifyContent: 'space-between' }}><span>${k.spend}</span><span className="ag-muted">of ${k.limit}</span></div><div className="ag-bar"><i style={{ width: `${pct}%`, background: pct > 80 ? 'var(--a-bad)' : 'var(--a-accent)' }} /></div></td>
                      <td><button className="ag-btn ag-btn--ghost ag-btn--sm" onClick={() => { setKeys((x) => x.filter((y) => y.id !== k.id)); toast.show('Key revoked'); }}>Revoke</button></td></tr>;
                  })}{keys.length === 0 ? <tr><td colSpan={5} className="ag-muted" style={{ textAlign: 'center', height: 100 }}>No keys yet.</td></tr> : null}</tbody>
                </table>
              </div>
            </div>
          ) : null}
        </main>

        {wiz > 0 ? (
          <Modal title={wiz === 3 ? 'Key created' : 'Create API key'} onClose={closeWiz}
            foot={wiz === 1 ? <><button className="ag-btn ag-btn--ghost" onClick={closeWiz}>Cancel</button><button className="ag-btn" disabled={!kName.trim()} onClick={() => setWiz(2)}>Next</button></>
              : wiz === 2 ? <><button className="ag-btn ag-btn--ghost" onClick={() => setWiz(1)}>Back</button><button className="ag-btn" onClick={makeKey}>Create key</button></>
                : <button className="ag-btn" onClick={closeWiz}>Done</button>}>
            <div className="ag-steps" aria-hidden="true"><i data-on="true" /><i data-on={wiz >= 2} /><i data-on={wiz >= 3} /></div>
            {wiz === 1 ? <div className="ag-field"><label htmlFor="hb-kn">Key name</label><input id="hb-kn" className="ag-input" placeholder="e.g. Production backend" value={kName} onChange={(e) => setKName(e.target.value)} autoFocus /></div> : null}
            {wiz === 2 ? <>
              <div className="ag-field"><label>Access</label><div className="ag-chips">{['All models', 'Swift only', 'Read-only'].map((s) => <button key={s} className="ag-chip" aria-pressed={kScope === s} onClick={() => setKScope(s)}>{s}</button>)}</div></div>
              <div className="ag-field"><label htmlFor="hb-kl">Monthly limit: ${kLimit}</label><input id="hb-kl" type="range" min={10} max={500} step={10} value={kLimit} onChange={(e) => setKLimit(+e.target.value)} /></div>
            </> : null}
            {wiz === 3 ? <><p className="ag-muted" style={{ marginBottom: 12 }}>Copy this key now. You will not see it again.</p><div className="hb-secret ag-mono"><span className="ag-grow">{made}</span><button className="ag-btn ag-btn--ghost ag-btn--sm" onClick={() => { navigator.clipboard?.writeText(made).catch(() => {}); toast.show('Copied'); }}>{ic.copy} Copy</button></div></> : null}
          </Modal>
        ) : null}
        {toast.node}
      </div>
    </Root>
  );
}
