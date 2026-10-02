import { useEffect, useRef, useState, type ReactNode } from 'react';
import './CaseStudy.css';

const DESIGN_W = 1140;

/** Renders its children on a fixed 1140x662 canvas and scales it to the available width. */
function ScaledShot({ children, label }: { children: ReactNode; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setScale(el.clientWidth / DESIGN_W || 1);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div className="cs-shot" role="img" aria-label={label}>
      <div ref={ref} className="cs-scale">
        <div className="cs-scale__inner" style={{ transform: `scale(${scale})` }}>{children}</div>
      </div>
    </div>
  );
}

const Asterisk = ({ size }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
    <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" />
  </svg>
);

/* ---------- Product screens ---------- */
function Shell({ active, children, dim }: { active: string; children: ReactNode; dim?: boolean }) {
  const nav = ['Welcome', 'New chat', 'Projects', 'Artifacts', 'Apps'];
  return (
    <div className="cs-app" style={dim ? { filter: 'saturate(.9)' } : undefined}>
      <div className="cs-top"><b>Chat</b><span>Agent</span><span>Code</span><span>Design</span><span className="cs-search">Search</span><span>Invite</span><i className="cs-avatar" /></div>
      <div className="cs-main-wrap">
        <aside className="cs-sidebar" aria-label="Workspace">
          {nav.map((n) => <a key={n} aria-current={n === active ? 'page' : undefined}><i />{n}{n === 'Apps' && <em>New</em>}</a>)}
          <h6>Projects</h6>
          {['Growth Campaign', 'Content Engine', 'Automation Flow', 'User Research'].map((p) => <a key={p}><i />{p}</a>)}
          <h6>Recents</h6>
          {['Fix spacing on cards', 'Need better empty state', 'Update sidebar structure', 'Mobile nav feels cramped', 'Generate onboarding copy', 'Improve search results'].map((r) => <a key={r}>{r}</a>)}
          <div className="cs-connect"><strong>Connect apps</strong>External apps such as docs, issues and chat.</div>
        </aside>
        {children}
      </div>
    </div>
  );
}

const Terminal = () => (
  <div className="cs-term">
    <div className="cs-term__dots"><i /><i /><i /></div>
    <div>orbit launch workspace</div><div>installing runtime…</div><div>configuring model…</div><div>adding web tools…</div><div>workspace is running</div>
  </div>
);

function PlanChooser() {
  return (
    <div className="cs-choose">
      <Asterisk size={22} />
      <h3>Start free, no demo required</h3>
      <p>You can start on your own, or book a demo if you prefer a walkthrough.</p>
      <div className="cs-plans">
        <div className="cs-plan">
          <div className="cs-plan__art cs-plan__art--a" />
          <div className="cs-plan__body">
            <div className="cs-plan__top">Starter <span className="cs-tag">Free</span></div>
            <p>Hands-on with a free workspace. Upgrade when you outgrow it.</p>
            <small>What you get</small>
            <ul><li>Free for up to 10 projects</li><li>Connect 1 channel + 1 MCP</li><li>Live in under 10 minutes</li></ul>
          </div>
          <button type="button" className="cs-plan__btn">Create Account</button>
        </div>
        <div className="cs-plan">
          <div className="cs-plan__art cs-plan__art--b" />
          <div className="cs-plan__body">
            <div className="cs-plan__top">Pro <span className="cs-tag cs-tag--blue">Recommended</span></div>
            <p>Get a 20-minute walkthrough with our team if you'd rather see it first.</p>
            <small>What you get</small>
            <ul><li>Live screen-share session</li><li>Tailored to your use case</li><li>You can still sign up after</li></ul>
          </div>
          <button type="button" className="cs-plan__btn cs-plan__btn--blue">Book a Demo</button>
        </div>
      </div>
    </div>
  );
}

function Welcome() {
  return (
    <div className="cs-main">
      <h2>Build AI apps locally</h2>
      <p>Run powerful open models in minutes.</p>
      <div className="cs-code"><span>curl -fsSL https://orbit.example/install.sh | sh</span><span>⧉</span></div>
      <div className="cs-two">
        <Terminal />
        <div><h4>Launch your workspace</h4><p style={{ margin: '0 0 10px', color: '#666' }}>Start coding, researching and automating with your local models.</p><div className="cs-code"><span>orbit launch workspace</span><span>⧉</span></div></div>
      </div>
      <div style={{ marginTop: 30 }}><h4>Local first. Cloud ready.</h4><p style={{ margin: 0, color: '#666' }}>Scale from your laptop to larger hosted models whenever you need more power.</p>
        <ul className="cs-list"><li>Run larger models instantly</li><li>Parallelize complex workflows</li><li>Connect to live web data</li></ul></div>
    </div>
  );
}

function NewChat() {
  return (
    <div className="cs-main cs-chat">
      <Asterisk size={18} />
      <h2>Where should we begin?</h2>
      <div className="cs-composer">Ask anything…<div className="cs-composer__row"><span>+</span><span>Model</span><b style={{ fontWeight: 500 }}>Orbit 4.7</b><span className="cs-send" /></div></div>
      <div className="cs-upgrade">Upgrade to Pro <b>Upgrade</b></div>
      <div className="cs-cards3">
        <div><strong>Create</strong>Tasks, images, docs</div>
        <div><strong>Find</strong>Answers and files</div>
        <div><strong>Research</strong>Apps and web</div>
      </div>
    </div>
  );
}

function Artifacts() {
  const items = [['AI Landing Page', '5d ago'], ['Research Agent', '9d ago'], ['Code Assistant', '2d ago'], ['Meeting Notes', '9d ago'], ['Prompt Library', '3d ago']];
  return (
    <div className="cs-main">
      <div className="cs-art-head"><h2>Artifacts</h2><button type="button">New artifact</button></div>
      <div className="cs-art-grid">
        {items.map(([t, d]) => (
          <div key={t} className="cs-art-card"><div className="cs-art-card__thumb"><i /><i /><i /></div><strong>{t}</strong><small>{d}</small></div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Page ---------- */
export interface CaseStudyProps {
  name?: string;
  overview?: string;
  scope?: string;
}

/** Dark case-study page: sticky project details beside a stack of product screens. */
export function CaseStudyTemplate({
  name = 'Orbit AI',
  overview = 'A workspace for teams building with open models. We rebuilt the product around discovery, setup and secure deployment, so complex AI infrastructure feels clear, fast and trustworthy.',
  scope = 'Visual system, design direction, product redesign',
}: CaseStudyProps) {
  return (
    <div className="cs-page">
      <header className="cs-header">
        <span className="cs-logo" aria-hidden="true" />
        <nav className="cs-nav cs-mono" aria-label="Main">
          <a aria-current="page" href="#home" onClick={(e) => e.preventDefault()}>Home</a>
          <a href="#notes" onClick={(e) => e.preventDefault()}>Notes</a>
          <a href="#works" onClick={(e) => e.preventDefault()}>Works</a>
        </nav>
        <div className="cs-actions"><button type="button" className="cs-btn">Read Notes</button><button type="button" className="cs-btn cs-btn--solid">Start A Project</button></div>
      </header>
      <div className="cs-body">
        <dl className="cs-side">
          <div><dt className="cs-mono">Name</dt><dd>{name}</dd></div>
          <div><dt className="cs-mono">Overview</dt><dd>{overview}</dd></div>
          <div><dt className="cs-mono">Scope</dt><dd>{scope}</dd></div>
        </dl>
        <main className="cs-stack">
          <div className="cs-banner"><Asterisk /></div>
          <ScaledShot label="Plan chooser: Starter and Pro"><PlanChooser /></ScaledShot>
          <ScaledShot label="Connect your apps dialog over the welcome screen">
            <Shell active="Welcome" dim><Welcome /></Shell>
            <div className="cs-dim"><div className="cs-modal"><div className="cs-modal__art"><Terminal /></div><div className="cs-modal__body"><h4>Connect your apps</h4><p>Link your tools to bring your data together and automate work across your day.</p><button type="button">Explore</button></div></div></div>
          </ScaledShot>
          <ScaledShot label="Welcome screen"><Shell active="Welcome"><Welcome /></Shell></ScaledShot>
          <ScaledShot label="New chat"><Shell active="New chat"><NewChat /></Shell></ScaledShot>
          <ScaledShot label="Artifacts"><Shell active="Artifacts"><Artifacts /></Shell></ScaledShot>
        </main>
        <span />
      </div>
    </div>
  );
}
