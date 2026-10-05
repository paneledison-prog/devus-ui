# Agent contract: Story rings

You are changing the **Story rings** component of Devus UI. This folder is the source of truth. Follow it exactly.

## Read protocol (strict)
1. Read every file in the order below, in full, top to bottom. Not skimmed. Not summarized from memory.
2. Before your first edit, post a **read receipt**: for each file its path and its line count (count them), plus one hard rule copied verbatim from this file. No receipt means you are not briefed; do not edit.
3. MUST, NEVER and "required" mean exactly that. "Prefer" and "should" are defaults; deviate only with a stated reason.
4. If two files disagree, this order wins: `Agent.md`, `rules/`, `design.md`, `guidelines.md`, `Context.md`. Report the conflict; do not pick silently.
5. If something is not written here, it is not allowed by default. Ask.

## Read in this order
1. `../Context.md` what exists, what is unfinished, and the bench coverage
2. `../guidelines.md` product and copy requirements
3. `../design.md` the visual specification and the **bench reference** (the real design, measured)
4. `rules/` every file, in numeric order
5. `skills/` `verify-template` (the bench) always; `edit-story-rings` for your task

## Hard rules (a change that breaks one is rejected)
1. Edit only the files listed under "Real files" in `../Context.md`, plus new files inside the same folder. The only other files you may touch are `../Context.md` (rule 6) and the bench reference (rule 8).
2. Colors, spacing, radii and type come from tokens. See `rules/01-tokens.md`.
3. Everything is original. See `rules/03-originality.md`. Never mention the upstream design system's name anywhere.
4. Keyboard and screen-reader support is required. See `rules/02-accessibility.md`.
5. Follow `rules/04-code-structure.md` for naming, props and cleanup.
6. Follow `rules/05-workflow.md`: commit locally, push only when the user says "push", update `../Context.md` in the same commit.
7. The design is correct only if the bench says so. Run the bench in `skills/verify-template/SKILL.md` against the real design in `../design.md` and report its output as printed. See "Reporting" in `rules/05-workflow.md`.
8. Do not edit the bench reference to turn a FAIL into a PASS. It changes only when the user asked for that exact design change (step 9 of the skill).

## Definition of done
- [ ] Read receipt posted before the first edit
- [ ] `npm run typecheck` passes
- [ ] `npm run build` passes
- [ ] Bench, light: `PASS n/n probes` (output quoted)
- [ ] Bench, dark: `PASS n/n probes` (output quoted)
- [ ] The component was used by hand (the App section of `http://localhost:5173` (open the tile large preview)), light and dark, and the console has no new errors
- [ ] `../Context.md` is updated (files, features, gaps, date)
- [ ] The change is committed locally with a clear message
- [ ] The final report lists everything that was **not** checked

## When unsure
Ask one specific question instead of guessing. Do not widen scope.
