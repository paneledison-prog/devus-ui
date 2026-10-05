# Build agent demo

Build a full-page "Build agent demo" template for Devus UI by composing existing components (role=dialog modals, role=listbox dropdowns, aria-pressed on toggles, role=toolbar for the device bar, role=status for toasts, reduced motion respected).

## Layout

A desktop-style coding-agent workspace for building and testing mobile apps, with its own light and dark theme. New-thread screen: a centered question, a composer with a removable plugin chip, a plus menu, approval-mode and model dropdowns, a dictation button and send, and project / where-to-work / branch pickers. Sending a prompt opens a thread: a Working-for-Ns divider, streamed agent messages and step lines, an optional permission request (Allow / Deny, depending on the approval mode), then an Environment card (changes, branch, Commit or push dialog, tasks, browser) and a live iPhone simulator browser pane. The simulator is interactive: favorite posts, open the overflow and share menus, rotate the device, reload. Annotation mode (cursor button) outlines every element in green; click one, type feedback, and the agent edits the code, the phone hot-reloads with a visible change (avatar alignment, text size or spacing), and an edit card offers Undo and a diff Review dialog. Follow-up commands such as open the share menu, rotate to landscape, switch to dark, or undo drive the simulator. A Stop button cancels a run. All content is fictional: made-up app, people and file names, no real logos.

## Requirements

- Make it responsive (stack columns under 720px), use semantic landmarks (header, nav, main, aside) and keep all copy as placeholder text.

## Design tokens

Use the Devus UI tokens as CSS variables.

| Group | Tokens |
| --- | --- |
| Colors | `--background`, `--surface`, `--foreground`, `--muted`, `--separator`, `--accent` |
| Radii | `--radius-2xl` |
| Spacing | `--space-*` |
| Type | Inter |
| Themes | `[data-theme="light"]` and `[data-theme="dark"]` |
