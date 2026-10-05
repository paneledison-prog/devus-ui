# Agent contract: AI workspace demo

You are changing the **AI workspace demo** template of Devus UI. This folder is the source of truth. Follow it.

## Read in this order (before touching code)
1. `../Context.md` what exists and what is unfinished
2. `../guidelines.md` product and copy requirements
3. `../design.md` the visual specification
4. `rules/` every file, in numeric order
5. `skills/` the playbook that matches your task

## Hard rules (a change that breaks one is rejected)
1. Edit only the files listed under "Real files" in `../Context.md`, plus new files inside the same folder.
2. Colors, spacing, radii and type come from tokens. See `rules/01-tokens.md`.
3. Everything is original. See `rules/03-originality.md`. Never mention the upstream design system's name anywhere.
4. Keyboard and screen-reader support is required. See `rules/02-accessibility.md`.
5. Follow `rules/04-code-structure.md` for naming, props and cleanup.
6. Follow `rules/05-workflow.md`: commit locally, push only when the user says "push", update `../Context.md` in the same commit.

## Definition of done
- [ ] `npm run typecheck` passes
- [ ] `npm run build` passes
- [ ] The template was opened in a browser at `/?template=ai-workspace-demo` and used, in light and dark
- [ ] No console errors that the change introduced
- [ ] `../Context.md` is updated (files, features, gaps, date)
- [ ] The change is committed locally with a clear message

## When unsure
Ask one specific question instead of guessing. Do not widen scope.
