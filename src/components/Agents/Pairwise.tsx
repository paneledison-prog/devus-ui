import { useEffect, useRef, useState } from 'react';
import { AVATAR_ME, Face, ic, Modal, Root, ThemeSwitch, Toggle, useDemoTheme, useOutside, useToast, type Theme } from './shared';
import './Pairwise.css';

type Stage = 'signin' | 'app';
type View = 'build' | 'discover' | 'credits';
type RunState = 'idle' | 'running' | 'waiting' | 'done';

const PLANS: Record<string, string[]> = {
  default: ['Read the request and list what is needed', 'Collect data from connected tools', 'Draft the result', 'Ask for approval before sending', 'Post the result and log it'],
};
const EXAMPLES = ['Review new pull requests each morning and post a summary in chat', 'Watch the support inbox and tag urgent tickets', 'Send me a weekly digest of competitor news'];
const CATS = ['All', 'Engineering', 'Support', 'Sales', 'Research', 'Ops'];
const AGENTS = [
  { name: 'PR reviewer', cat: 'Engineering', desc: 'Summarizes diffs and flags risky changes.', runs: '12k' }, { name: 'Ticket tagger', cat: 'Support', desc: 'Labels and routes new tickets.', runs: '8.4k' },
  { name: 'Lead scout', cat: 'Sales', desc: 'Finds fresh leads that match your profile.', runs: '5.1k' }, { name: 'News digest', cat: 'Research', desc: 'Weekly briefing on topics you follow.', runs: '9.7k' },
  { name: 'Invoice chaser', cat: 'Ops', desc: 'Nudges customers with overdue invoices.', runs: '3.3k' }, { name: 'Release notes', cat: 'Engineering', desc: 'Writes notes from merged changes.', runs: '6.2k' },
];
const DIFF = [
  { t: ' ', s: 'function retry(fn, tries = 3) {' }, { t: '-', s: '  return fn();' }, { t: '+', s: '  for (let i = 0; i < tries; i++) {' }, { t: '+', s: '    try { return await fn(); } catch (e) { if (i === tries - 1) throw e; }' }, { t: '+', s: '  }' }, { t: ' ', s: '}' },
];
const HISTORY = [{ t: 'Posted PR summary to #eng', when: '9:02 am', ok: true }, { t: 'Tagged 4 urgent tickets', when: 'Yesterday', ok: true }, { t: 'Weekly digest sent', when: 'Mon', ok: true }, { t: 'Invoice reminder paused', when: 'Sun', ok: false }];
const CREDIT_PLANS = [
  { name: 'Free', upto: 500, price: 0, perks: ['1 agent', 'Community support'], pop: false },
  { name: 'Starter', upto: 2500, price: 20, perks: ['5 agents', 'Email support'], pop: false },
  { name: 'Team', upto: 10000, price: 60, perks: ['Unlimited agents', 'Shared workspaces', 'Priority support'], pop: true },
  { name: 'Scale', upto: 50000, price: 220, perks: ['SSO and audit log', 'Usage reports', 'Dedicated support'], pop: false },
];
const TIERS = [{ upto: 500, price: 0 }, { upto: 2500, price: 20 }, { upto: 10000, price: 60 }, { upto: 50000, price: 220 }];

export interface PairwiseDemoProps { startAt?: Stage; defaultTheme?: Theme }

export function PairwiseDemo({ startAt = 'signin', defaultTheme }: PairwiseDemoProps) {
  const [theme, setTheme] = useDemoTheme(defaultTheme);
  const [stage, setStage] = useState<Stage>(startAt);
  const [view, setView] = useState<View>('build');
  const [email, setEmail] = useState('');
  const [err, setErr] = useState('');
  const [prompt, setPrompt] = useState('');
  const [run, setRun] = useState<RunState>('idle');
  const [step, setStep] = useState(0);
  const [cat, setCat] = useState('All');
  const [q, setQ] = useState('');
  const [added, setAdded] = useState<Set<string>>(new Set());
  const [dlg, setDlg] = useState<'publish' | 'share' | null>(null);
  const [pubName, setPubName] = useState('');
  const [pubPublic, setPubPublic] = useState(true);
  const [published, setPublished] = useState(false);
  const [credits, setCredits] = useState(1240);
  const [cMenu, setCMenu] = useState(false);
  const [seats, setSeats] = useState(2400);
  const toast = useToast();
  const cRef = useOutside(cMenu, () => setCMenu(false));
  const timer = useRef<number>(0);
  const plan = PLANS.default;
  useEffect(() => () => window.clearTimeout(timer.current), []);

  useEffect(() => {
    if (run !== 'running') return;
    timer.current = window.setTimeout(() => {
      if (step === 3) { setRun('waiting'); return; }
      if (step >= plan.length - 1) { setStep(plan.length); setRun('done'); setCredits((c) => c - 18); return; }
      setStep((s) => s + 1);
    }, 900);
    return () => window.clearTimeout(timer.current);
  }, [run, step, plan.length]);

  const signIn = () => {
    if (!/^\S+@\S+\.\S+$/.test(email)) { setErr('Enter a valid email address.'); return; }
    setErr(''); setStage('app');
  };
  const start = () => { if (!prompt.trim()) return; setStep(0); setRun('running'); };
  const approve = () => { setStep(4); setRun('running'); };
  const reset = () => { setRun('idle'); setStep(0); setPrompt(''); };
  const tier = TIERS.find((t) => seats <= t.upto) ?? TIERS[TIERS.length - 1];
  const agents = AGENTS.filter((a) => (cat === 'All' || a.cat === cat) && (a.name + a.desc).toLowerCase().includes(q.trim().toLowerCase()));

  if (stage === 'signin') {
    return (
      <Root theme={theme} name="Pairwise agent platform demo" className="pw">
        <div className="ag-win pw-signin">
          <section className="pw-signin__form">
            <div className="pw-brand"><span className="pw-mark">{ic.bolt}</span>Pairwise</div>
            <h1>Describe the outcome. We build the agent.</h1>
            <p className="ag-muted">Sign in to start. No code, no flowcharts.</p>
            <form onSubmit={(e) => { e.preventDefault(); signIn(); }} noValidate>
              <div className="ag-field"><label htmlFor="pw-em">Work email</label><input id="pw-em" className="ag-input" type="email" placeholder="you@company.com" value={email} aria-invalid={!!err} aria-describedby={err ? 'pw-er' : undefined} onChange={(e) => { setEmail(e.target.value); setErr(''); }} />{err ? <span id="pw-er" className="ag-err">{err}</span> : null}</div>
              <button className="ag-btn ag-btn--wide">Continue with email</button>
            </form>
            <div className="pw-or"><span>or</span></div>
            <button className="ag-btn ag-btn--ghost ag-btn--wide" onClick={() => { setEmail('demo@pairwise.test'); setStage('app'); }}>Try the demo workspace</button>
            <div className="pw-theme"><ThemeSwitch theme={theme} setTheme={setTheme} /></div>
          </section>
          <section className="pw-signin__art" aria-hidden="true">
            <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
              {Array.from({ length: 9 }, (_, i) => <circle key={i} cx="200" cy="200" r={30 + i * 26} fill="none" stroke="currentColor" strokeWidth="1" opacity={0.5 - i * 0.045} />)}
              {Array.from({ length: 14 }, (_, i) => { const a = (i / 14) * Math.PI * 2; const r = 56 + (i % 4) * 44; return <circle key={i} cx={200 + Math.cos(a * 1.7) * r} cy={200 + Math.sin(a * 1.7) * r} r={4 + (i % 3) * 2} fill="currentColor" opacity=".7" />; })}
              <circle cx="200" cy="200" r="12" fill="currentColor" />
            </svg>
          </section>
        </div>
      </Root>
    );
  }

  return (
    <Root theme={theme} name="Pairwise agent platform demo" className="pw">
      <div className="ag-win" style={{ flexDirection: 'column' }}>
        <header className="pw-top">
          <div className="pw-brand"><span className="pw-mark">{ic.bolt}</span>Pairwise</div>
          <nav className="pw-nav" aria-label="Primary">{([['build', 'Build'], ['discover', 'Discover'], ['credits', 'Credits']] as const).map(([k, l]) => <button key={k} aria-current={view === k ? 'page' : undefined} onClick={() => setView(k)}>{l}</button>)}</nav>
          <span className="ag-grow" />
          <div style={{ position: 'relative' }} ref={cRef}>
            <button className="ag-btn ag-btn--ghost ag-btn--sm" aria-haspopup="menu" aria-expanded={cMenu} onClick={() => setCMenu((m) => !m)}>{ic.coin}{credits.toLocaleString()} credits</button>
            {cMenu ? (
              <div className="ag-pop" role="menu" style={{ right: 0, top: 34, width: 240 }}>
                <div style={{ padding: '8px 10px' }}><b>{credits.toLocaleString()} credits left</b><div className="ag-bar" style={{ margin: '8px 0 4px' }}><i style={{ width: `${Math.min(100, credits / 20)}%` }} /></div><span className="ag-muted">Resets on the 1st</span></div>
                <hr />
                <button className="ag-item" role="menuitem" onClick={() => { setCredits((c) => c + 500); setCMenu(false); toast.show('Added 500 credits'); }}>{ic.plus} Top up 500</button>
                <button className="ag-item" role="menuitem" onClick={() => { setCMenu(false); setView('credits'); }}>{ic.coin} View plans</button>
                <hr />
                <div className="ag-row" style={{ padding: '4px 10px', justifyContent: 'space-between' }}>Theme<ThemeSwitch theme={theme} setTheme={setTheme} /></div>
              </div>
            ) : null}
          </div>
          <Face src={AVATAR_ME} size={28} alt={email || 'demo'} />
        </header>

        {view === 'build' ? (
          <div className="ag-scroll pw-build">
            {run === 'idle' ? (
              <div className="pw-start">
                <h1>What should your agent do?</h1>
                <div className="pw-prompt"><textarea aria-label="Describe the outcome" rows={3} placeholder="Describe the outcome you want…" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
                  <div className="ag-row"><span className="ag-muted">Connected: Chat, Code host, Mail</span><span className="ag-grow" /><button className="ag-btn" disabled={!prompt.trim()} onClick={start}>{ic.spark} Build agent</button></div></div>
                <div className="ag-chips" style={{ justifyContent: 'center' }}>{EXAMPLES.map((e) => <button key={e} className="ag-chip" onClick={() => setPrompt(e)}>{e}</button>)}</div>
                <div className="pw-hist ag-card"><h3>Recent actions</h3>{HISTORY.map((h) => <div key={h.t} className="pw-hist__row"><span className="ag-pill" data-tone={h.ok ? 'good' : 'warn'}>{h.ok ? 'Done' : 'Paused'}</span><span className="ag-grow">{h.t}</span><span className="ag-muted">{h.when}</span></div>)}</div>
              </div>
            ) : (
              <div className="pw-run">
                <div className="ag-card pw-plan">
                  <div className="ag-row"><h3 className="ag-grow">Plan</h3><span className="ag-pill" data-tone={run === 'done' ? 'good' : run === 'waiting' ? 'warn' : 'accent'}>{run === 'done' ? 'Finished' : run === 'waiting' ? 'Needs you' : 'Running'}</span></div>
                  <p className="ag-muted" style={{ margin: '4px 0 14px' }}>{prompt}</p>
                  <ol className="pw-steps">{plan.map((s, i) => { const st = i < step ? 'done' : i === step && run !== 'done' ? (run === 'waiting' ? 'wait' : 'run') : 'todo'; return <li key={s} data-state={st}><span className="pw-dot">{st === 'done' ? ic.check : st === 'wait' ? '!' : null}</span>{s}</li>; })}</ol>
                  {run === 'waiting' ? <div className="pw-ask"><b>Approve this message?</b><p className="ag-muted">The agent wants to post the summary to #eng.</p><div className="ag-row" style={{ marginTop: 10 }}><button className="ag-btn ag-btn--sm" onClick={approve}>Approve</button><button className="ag-btn ag-btn--ghost ag-btn--sm" onClick={reset}>Cancel run</button></div></div> : null}
                  {run === 'done' ? <div className="ag-row" style={{ marginTop: 16 }}><button className="ag-btn" onClick={() => { setPubName(prompt.split(' ').slice(0, 3).join(' ')); setDlg('publish'); }}>Publish</button><button className="ag-btn ag-btn--ghost" onClick={() => setDlg('share')}>{ic.share} Share</button><span className="ag-grow" /><button className="ag-btn ag-btn--ghost" onClick={reset}>New agent</button></div> : null}
                </div>
                <div className="ag-card pw-out">
                  <div className="ag-row"><span className="pw-slack">{ic.hash}</span><b>#eng</b><span className="ag-muted">Pairwise bot</span></div>
                  {step >= 4 ? (
                    <div className="pw-post"><p><b>Morning review:</b> 3 open pull requests. 1 needs attention.</p>
                      <div className="pw-diff ag-mono" role="img" aria-label="Code diff">{DIFF.map((d, i) => <div key={i} data-t={d.t}><span>{d.t}</span>{d.s}</div>)}</div>
                      <p className="ag-muted">retry-wrapper · adds three attempts before failing</p></div>
                  ) : <p className="ag-muted" style={{ padding: '30px 0', textAlign: 'center' }}>Nothing posted yet. The message appears here after approval.</p>}
                </div>
              </div>
            )}
          </div>
        ) : null}

        {view === 'discover' ? (
          <div className="ag-scroll pw-page">
            <h1>Discover agents</h1>
            <div className="ag-row" style={{ margin: '14px 0' }}><label className="pw-q">{ic.search}<input aria-label="Search agents" placeholder="Search agents" value={q} onChange={(e) => setQ(e.target.value)} /></label></div>
            <div className="ag-chips" role="group" aria-label="Category">{CATS.map((c) => <button key={c} className="ag-chip" aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>)}</div>
            <div className="pw-grid">{agents.map((a) => <article key={a.name} className="ag-card pw-agent"><div className="ag-row"><span className="pw-mark">{ic.bot}</span><span className="ag-grow" /><span className="ag-pill">{a.cat}</span></div><h3>{a.name}</h3><p className="ag-muted">{a.desc}</p><div className="ag-row"><span className="ag-muted">{a.runs} runs</span><span className="ag-grow" /><button className={`ag-btn ag-btn--sm${added.has(a.name) ? ' ag-btn--ghost' : ''}`} onClick={() => setAdded((s) => { const n = new Set(s); if (n.has(a.name)) n.delete(a.name); else { n.add(a.name); toast.show(`${a.name} added`); } return n; })}>{added.has(a.name) ? 'Added' : 'Add'}</button></div></article>)}
              {agents.length === 0 ? <p className="ag-muted">No agents match.</p> : null}</div>
          </div>
        ) : null}

        {view === 'credits' ? (
          <div className="ag-scroll pw-page pw-credits">
            <div className="pw-cr">
              <header className="pw-cr__head">
                <h1>Credits and plans</h1>
                <p className="ag-muted">Pay for what your agents run. Slide to estimate your monthly credits and the plan that fits.</p>
              </header>

              <section className="ag-card pw-slider" aria-label="Estimate your monthly credits">
                <div className="pw-slider__read">
                  <div><b className="pw-big">{seats.toLocaleString()}</b><span className="ag-muted"> credits a month</span></div>
                  <div className="pw-slider__price"><b className="pw-big">${tier.price}</b><span className="ag-muted"> / month</span></div>
                </div>
                <input type="range" aria-label="Monthly credits" min={100} max={50000} step={100} value={seats} onChange={(e) => setSeats(+e.target.value)}
                  style={{ ['--fill' as string]: `${((seats - 100) / (50000 - 100)) * 100}%` }} />
                <div className="pw-slider__scale ag-muted" aria-hidden="true"><span>100</span><span>50,000</span></div>
                <p className="pw-slider__hint" role="status">Your estimate fits the <b>{CREDIT_PLANS.find((x) => x.price === tier.price)?.name}</b> plan{tier.price === 0 ? ', which is free.' : '.'}</p>
              </section>

              <div className="pw-tiers" role="group" aria-label="Plans">
                {CREDIT_PLANS.map((x) => {
                  const on = tier.price === x.price;
                  return (
                    <button key={x.name} type="button" className="ag-card pw-tier" data-on={on} data-pop={x.pop || undefined} aria-pressed={on} onClick={() => setSeats(Math.max(100, x.upto))}>
                      {x.pop ? <span className="pw-tier__flag">Most popular</span> : null}
                      <b className="pw-tier__name">{x.name}</b>
                      <span className="pw-tier__price"><span className="pw-big">${x.price}</span><span className="ag-muted"> / month</span></span>
                      <span className="ag-muted pw-tier__up">Up to {x.upto.toLocaleString()} credits</span>
                      <ul className="pw-tier__list">{x.perks.map((k) => <li key={k}>{ic.check}{k}</li>)}</ul>
                      <span className="pw-tier__cta">{on ? 'Selected' : 'Choose ' + x.name}</span>
                    </button>
                  );
                })}
              </div>
              <p className="pw-cr__foot ag-muted">No card needed for Free. Change or cancel your plan at any time.</p>
            </div>
          </div>
        ) : null}

        {dlg === 'publish' ? (
          <Modal title="Publish agent" onClose={() => setDlg(null)} foot={<><button className="ag-btn ag-btn--ghost" onClick={() => setDlg(null)}>Cancel</button><button className="ag-btn" disabled={!pubName.trim()} onClick={() => { setPublished(true); setDlg(null); toast.show('Agent published'); }}>Publish</button></>}>
            <div className="ag-field"><label htmlFor="pw-pn">Name</label><input id="pw-pn" className="ag-input" value={pubName} onChange={(e) => setPubName(e.target.value)} /></div>
            <div className="ag-row" style={{ justifyContent: 'space-between' }}><span><b>Show in Discover</b><div className="ag-muted">Anyone can find and add it.</div></span><Toggle on={pubPublic} onChange={setPubPublic} label="Show in Discover" /></div>
          </Modal>
        ) : null}
        {dlg === 'share' ? (
          <Modal title="Share agent" onClose={() => setDlg(null)} foot={<button className="ag-btn" onClick={() => setDlg(null)}>Done</button>}>
            <p className="ag-muted" style={{ marginBottom: 10 }}>{published ? 'Anyone with the link can add this agent.' : 'Publish first to let others add it. Anyone you invite can view runs.'}</p>
            <div className="pw-link ag-mono"><span className="ag-grow">pairwise.test/a/{(pubName || 'my-agent').toLowerCase().replace(/\s+/g, '-')}</span><button className="ag-btn ag-btn--ghost ag-btn--sm" onClick={() => { navigator.clipboard?.writeText('pairwise.test/a/' + (pubName || 'my-agent')).catch(() => {}); toast.show('Link copied'); }}>{ic.copy} Copy</button></div>
          </Modal>
        ) : null}
        {toast.node}
      </div>
    </Root>
  );
}
