---
name: verify-template
description: Use after any change to the Week strip template, before saying it is done.
---

# Verify the Week strip template

1. `npm run typecheck` must print no errors.
2. `npm run dev`, then open the App section of `http://localhost:5173` (open the tile large preview).
3. Use the template: click every control you touched, type in every field you touched, press Escape and Tab where relevant.
4. Switch to dark (site theme toggle) and check contrast and missing colors.
5. Read the browser console: there must be no new errors or warnings.
6. Open the library tile and the large preview: the template must still fit and not clip.
7. Open the Code tab: the file tree must show the files listed in `../../../Context.md`.
8. `npm run build` must succeed.
9. Report what you actually saw. If a check was skipped, say so.
