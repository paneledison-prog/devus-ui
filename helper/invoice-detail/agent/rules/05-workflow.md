# Rule 05: Workflow and reporting

## Workflow
1. Make one coherent change at a time.
2. Run `npm run typecheck`, then `npm run build`.
3. Run the bench (`../skills/verify-template/SKILL.md`). It is required, not optional.
4. Use it by hand in the browser (`npm run dev`), light and dark, and read the console.
5. Update `../../Context.md` (files, features, gaps, "Last updated").
6. Commit locally in the same commit as the change. Git identity for this repo: `paneledison-prog` / `paneledison@gmail.com`.
7. **Push only when the user says "push".** Never force-push. Never skip hooks.

## Reporting (no cap, no hype)
- Say what happened, with the evidence. Paste the bench `summary` line and any `failures` exactly as printed.
- If anything failed, the first line of your report says FAIL and names it.
- Never write "perfect", "pixel-perfect", "flawless", "exactly matches", "all good" or similar. A passing bench says `PASS n/n probes`; quote that, nothing stronger.
- Never round, estimate or paraphrase numbers. Copy them.
- A command or step you did not run is "not run". Do not imply it passed.
- List what the checks cannot see. The bench measures box, type, color and radius of the probes; it does not measure animation, hover or focus states, behavior, or copy outside the probes.
- Do not edit the bench reference, the tolerances or the snippet to get a pass.
- If the bench itself errors, it has not been run. Report that; do not substitute your own judgement.
