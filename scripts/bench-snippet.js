/*
 * Design bench. Source of truth for the snippet that is inlined into every helper `verify-template/SKILL.md`.
 *
 *   measure mode:  await bench({ measure: true })      -> { light|dark probes } (used to produce the reference)
 *   compare mode:  await bench({ ref: REF })           -> { summary, pass, fail, missing, extra, failures }
 *
 * Run it on the bench URL (`/?template=<slug>&bench=1&theme=light|dark`) at a 1440x900 viewport, 100% zoom.
 * Probes are DOM facts (box, own-text box, type, colors, radius) of the rendered design, relative to #bench-root.
 */
async function bench(opts) {
  const root = document.getElementById('bench-root');
  if (!root) throw new Error('#bench-root not found: open the bench URL first');
  await document.fonts.ready;
  await new Promise((r) => setTimeout(r, 1200));

  const norm = (s) => (s || '').replace(/\s+/g, ' ').trim();
  const own = (el) => norm([...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join(' '));
  const INTERACTIVE = new Set(['button', 'tab', 'switch', 'checkbox', 'radio', 'textbox', 'combobox', 'searchbox', 'slider', 'link', 'menuitem', 'option']);
  const LANDMARK = new Set(['HEADER', 'NAV', 'ASIDE', 'MAIN', 'SECTION', 'FOOTER', 'H1', 'H2', 'H3', 'H4', 'BUTTON', 'A', 'INPUT', 'TEXTAREA', 'SELECT', 'LABEL']);
  const alpha = (c) => { const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return 0; const p = m[1].split(/[ ,/]+/).filter(Boolean); return p.length > 3 ? parseFloat(p[3]) : 1; };
  const round = (n) => Math.round(n * 2) / 2;
  // Box of the element's own text (catches padding and alignment changes that leave the element box unchanged).
  function textBox(el, R) {
    const rg = document.createRange();
    let l = Infinity, t = Infinity, r = -Infinity, b = -Infinity;
    for (const n of el.childNodes) {
      if (n.nodeType !== 3 || !n.textContent.trim()) continue;
      rg.selectNodeContents(n);
      for (const q of rg.getClientRects()) { l = Math.min(l, q.left); t = Math.min(t, q.top); r = Math.max(r, q.right); b = Math.max(b, q.bottom); }
    }
    return l === Infinity ? [0, 0, 0, 0] : [round(l - R.left), round(t - R.top), round(r - l), round(b - t)];
  }

  function candidates() {
    const R = root.getBoundingClientRect();
    const out = [];
    const seen = {};
    for (const el of root.querySelectorAll('*')) {
      if (el instanceof SVGElement || el.tagName === 'PRE') continue;
      if (el.closest('[aria-hidden="true"]')) continue;
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      if (r.width <= 0 || r.height <= 0 || cs.visibility === 'hidden' || cs.display === 'none' || cs.opacity === '0') continue;
      const text = own(el);
      if (text.length > 80) continue;
      const role = el.getAttribute('role') || '';
      const primary = LANDMARK.has(el.tagName) || INTERACTIVE.has(role);
      const bw = parseFloat(cs.borderTopWidth) || 0;
      const box = !text && (alpha(cs.backgroundColor) > 0 || bw > 0) && r.width >= 16 && r.height >= 16 && el.classList.length > 0;
      if (!primary && !text && !box) continue;
      const label = text || el.getAttribute('aria-label') || el.getAttribute('placeholder') || (el.classList[0] ? '.' + el.classList[0] : '');
      const base = `${el.tagName.toLowerCase()}${role ? '[' + role + ']' : ''}|${label.slice(0, 48)}`;
      seen[base] = (seen[base] || 0) + 1;
      out.push({
        kind: primary ? 0 : text ? 1 : 2,
        key: `${base}#${seen[base]}`,
        v: [round(r.left - R.left), round(r.top - R.top), round(r.width), round(r.height), parseFloat(cs.fontSize), cs.fontWeight, cs.color, cs.backgroundColor, cs.borderTopLeftRadius, ...textBox(el, R)],
      });
    }
    return out;
  }

  const theme = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
  const viewport = [innerWidth, innerHeight];

  if (opts.measure) {
    const spread = (list, cap) => (list.length <= cap ? list : Array.from({ length: cap }, (_, i) => list[Math.floor((i * list.length) / cap)]));
    const pick = (all) => [...spread(all.filter((c) => c.kind === 0), 24), ...spread(all.filter((c) => c.kind === 1), 22), ...spread(all.filter((c) => c.kind === 2), 12)];
    const a = pick(candidates());
    await new Promise((r) => setTimeout(r, 1500));
    const bMap = new Map(candidates().map((c) => [c.key, c.v.join('|')]));
    const stable = a.filter((c) => bMap.get(c.key) === c.v.join('|'));
    return { theme, viewport, sampled: a.length, stable: stable.length, probes: stable.map((c) => [c.key, ...c.v]) };
  }

  const ref = opts.ref;
  const refRows = theme === 'dark' ? ref.dark : ref.light;
  const map = new Map(candidates().map((c) => [c.key, c.v]));
  const failures = [];
  let pass = 0;
  const num = (k, e, a, tol) => { if (Math.abs(e - a) > tol) failures.push(`${k}: expected ${e}, got ${a}`); };
  if (viewport[0] !== 1440 || viewport[1] !== 900) failures.push(`viewport: expected 1440x900, got ${viewport[0]}x${viewport[1]} (the bench is invalid until this matches)`);
  for (const row of refRows) {
    const key = row[0];
    const got = map.get(key);
    if (!got) { failures.push(`${key}: MISSING`); continue; }
    const before = failures.length;
    if (theme === 'dark') {
      if (row[1] !== got[6]) failures.push(`${key} color: expected ${row[1]}, got ${got[6]}`);
      if (row[2] !== got[7]) failures.push(`${key} background: expected ${row[2]}, got ${got[7]}`);
    } else {
      const [, x, y, w, h, fs, fw, color, bg, rad, tx, ty, tw, th] = row;
      num(key + ' x', x, got[0], 1); num(key + ' y', y, got[1], 1); num(key + ' width', w, got[2], 1); num(key + ' height', h, got[3], 1);
      if (fs !== got[4]) failures.push(`${key} font-size: expected ${fs}, got ${got[4]}`);
      if (fw !== got[5]) failures.push(`${key} font-weight: expected ${fw}, got ${got[5]}`);
      if (color !== got[6]) failures.push(`${key} color: expected ${color}, got ${got[6]}`);
      if (bg !== got[7]) failures.push(`${key} background: expected ${bg}, got ${got[7]}`);
      if (rad !== got[8]) failures.push(`${key} radius: expected ${rad}, got ${got[8]}`);
      num(key + ' text x', tx, got[9], 1); num(key + ' text y', ty, got[10], 1); num(key + ' text width', tw, got[11], 1); num(key + ' text height', th, got[12], 1);
    }
    if (failures.length === before) pass++;
  }
  const refKeys = new Set(refRows.map((r) => r[0]));
  const extra = [...map.keys()].filter((k) => !refKeys.has(k)).length;
  const ok = failures.length === 0;
  return { theme, summary: `${ok ? 'PASS' : 'FAIL'} ${pass}/${refRows.length} probes`, pass, total: refRows.length, extraElementsNotInReference: extra, failures: failures.slice(0, 80), failureCount: failures.length };
}
