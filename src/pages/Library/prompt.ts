const TOKENS = [
  'Use the Devus UI design tokens exposed as CSS variables (src/styles/tokens.css):',
  'colors --accent, --default, --danger, --surface, --foreground, --muted, --separator;',
  'radii --radius-3xl (pills/cards), --radius-field; spacing on a 4px scale (--space-*);',
  'Inter font; focus ring --focus-ring. Support [data-theme="light"|"dark"].',
].join(' ');

export function masterPrompt(name: string, summary: string, api: string, a11y: string): string {
  return [
    `Build a React + TypeScript <${name}> component for Devus UI.`,
    '',
    `Purpose: ${summary}`,
    `API: ${api}`,
    `Accessibility: ${a11y}`,
    '',
    TOKENS,
    'Plain CSS (BEM-style .ui-* classes), forwardRef where it wraps a native element, no extra runtime dependencies.',
    'Also write a Storybook story (CSF3, autodocs) covering every variant and state.',
  ].join('\n');
}

export function blockPrompt(name: string, summary: string, uses: string): string {
  return [
    `Build a React + TypeScript "${name}" block for Devus UI by composing existing components (${uses}).`,
    '',
    `Purpose: ${summary}`,
    'Keep it presentational: accept callbacks (for example onSubmit) as props, no data fetching.',
    '',
    TOKENS,
    'Accessible form semantics: labels, fieldset/legend where grouped, visible focus.',
  ].join('\n');
}

export function backgroundPrompt(name: string, summary: string): string {
  return [
    `Create a pure-CSS "${name}" background for Devus UI.`,
    '',
    `Look: ${summary}`,
    'Deliver a single utility class (for example .bg-dots) that sets background properties only: no images, no JavaScript.',
    'Prefer the Devus UI tokens (--surface, --separator, --muted, --accent) so it adapts to [data-theme="light"|"dark"].',
    'It must scale to any container size and keep text on top readable (WCAG AA).',
  ].join('\n');
}
