# Dropzone

Build a React + TypeScript `<Dropzone>` component for Devus UI.

## Purpose

File upload area that accepts drag-and-drop or click-to-browse and lists the chosen files with a remove button.

## API

- `accept?`: `string`
- `hint?`: `string`
- `onFiles(files`: `File[])`

## Accessibility

- Built on a real `<input type="file">` inside a `<label>`, so it is keyboard and screen-reader operable.
- drag-over state is also shown visually.

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
