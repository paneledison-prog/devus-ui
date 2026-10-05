# Rule 02: Accessibility

- Use native elements first: `button`, `a`, `input`, `label`, `dialog`. Add ARIA only when no native element fits.
- Every input has a visible label or an `aria-label`. Icon-only buttons have `aria-label`.
- Everything reachable by mouse is reachable by keyboard, in a sensible tab order. Menus and palettes support arrow keys, Enter and Escape.
- Focus is always visible (2px ring). Never `outline: none` without a replacement.
- Dialogs and popovers: Escape closes, focus returns to the trigger.
- Color contrast meets WCAG AA (4.5:1 for body text).
- Status changes are announced (`role="status"` or `aria-live="polite"`).
- Respect `prefers-reduced-motion`.
- Hidden screens use `inert` or `hidden` so they leave the tab order.
