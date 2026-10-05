# Case study: Context

> Living document for the **Case study** template. Update it in the same commit as every change to this template.
> Last updated: 2026-10-05

## What this is
Dark portfolio case-study page on a 1280x800 scrolling canvas: sticky header, a sticky Name / Overview / Scope panel on the left and a stack of scaled product screens on the right.

Brand: Orbit AI (fictional). Open it full window at `/?template=case-study`.

## Real files
- `src/components/CaseStudy/CaseStudy.tsx`
- `src/components/CaseStudy/CaseStudy.css`
- `src/styles/tokens.css`

Public API: `CaseStudyTemplate` accepts optional string props name, overview and scope (defaults provided).

## What it does
- Sticky header with logo, mono nav and two buttons
- Sticky details panel (Name, Overview, Scope)
- Product screens designed on a 1140x662 canvas and scaled to the column width
- Screens: sky banner, Starter/Pro plan chooser, connect-apps dialog, welcome, new chat, artifacts

## Known gaps
- Screens are illustrations, not interactive
- Single dark theme

## How it is wired into the library
- The library entry is `Case study` in `src/pages/Library/templates.tsx` (`sourceEntries` points at the entry file above).
- The Code tab of the preview reads these real files; this `helper/` folder ships next to them.
- Changing a file listed above changes what the Code tab shows.
