# Liquid glass chat

Build a full-page "Liquid glass chat" template for Devus UI by composing existing components (real buttons and inputs with labels, aria-expanded on the circle and menus, role=dialog sheets, inert on the hidden screen, reduced motion respected).

## Layout

An iOS-style messaging app in the Liquid Glass look, shown inside a scaled phone, with its own light and dark theme. Glass material: translucent surfaces with backdrop blur and saturation, a bright specular top edge, a soft inner rim and a faint diagonal sheen; the shared photo has a refracted, wavy glass rim made with an SVG turbulence displacement filter. Inbox: large Messages title, a Your circle control that fans a ribbon of portraits down (tap or drag vertically; the content slides with it, and a collapsed stack of three portraits shows when closed), a glass plus button for a contact picker, a search pill that filters live, All / Unread / Groups chips, and conversation rows with portrait, online dot, preview, time and unread dot. Chat: glass back and more buttons, centered portrait header, Today label, rounded bubbles (incoming white with the avatar on the last bubble of a run, outgoing tinted), a photo bubble with a glass caption chip that opens a viewer with tap-to-zoom, double-tap hearts, a glass composer pill with plus menu and a separate send button that lights up when there is text, outgoing messages that settle in from 22px below at scale 1.02, a typing indicator and a simulated reply. More menu: mute, share a photo, clear chat. All people, messages and artwork are fictional and generated in SVG; no photos.

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
