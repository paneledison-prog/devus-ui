# Slider

Build a React + TypeScript `<Slider>` component for Devus UI.

## Purpose

Built on react-aria-components (npm i react-aria-components): a single-thumb range slider: 4px track, accent fill, 20px white thumb with a soft shadow, label on the left and live value on the right.

## API

- `label`: `string`
- `defaultValue?`: `number`
- `formatOptions?`: `Intl.NumberFormatOptions`

## Accessibility

- Slider, SliderTrack, SliderThumb, SliderOutput from react-aria-components: the thumb is a hidden range input, arrow keys / Home / End change the value, focus ring on keyboard focus.

## Design tokens

Use the Devus UI tokens from `src/styles/tokens.css` (CSS variables).

| Group | Tokens |
| --- | --- |
| Colors | `--accent`, `--default`, `--danger`, `--surface`, `--foreground`, `--muted`, `--separator` |
| Radii | `--radius-3xl` (pills, cards), `--radius-field` |
| Spacing | 4px scale, `--space-*` |
| Type | Inter |
| Focus | `--focus-ring` |
| Themes | `[data-theme="light"]` and `[data-theme="dark"]` |

## Implementation rules

- Plain CSS (BEM-style `.ui-*` classes), `forwardRef` where it wraps a native element, no extra runtime dependencies.
- Also write a Storybook story (CSF3, autodocs) covering every variant and state.
