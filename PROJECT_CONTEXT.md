# The Lineage — Project Context

## Purpose

The Lineage is a visual family-tree explorer for Westeros. Its primary job is
to make complicated bloodlines and alliances easy to browse without forcing a
user to read a dense genealogy first. The experience should feel like a dark,
carefully edited medieval archive rather than a generic admin dashboard.

This document is the maintained repository context. It describes the current
implementation and the decisions that should guide future work. It is not a
replacement for code-level documentation or issue tracking.

## Current state

Implemented:

- React 19 + TypeScript + Vite application shell
- Dark cinematic styling with custom fonts, fog, and grain layers
- Top navigation and brand treatment
- Spoiler toggle held at the application level
- Safe-mode default on every fresh visit; spoiler state is not persisted
- Curated house and character data under `src/data/`
- TypeScript lookup helpers for characters and houses
- `/?data` dataset debug view
- `npm run check-data` validation script

Not implemented yet:

- Interactive family-tree renderer
- Collapsible branches, pan/zoom, and minimap
- House filtering/tabs
- Lineage highlighting on hover
- Character detail panel
- Portrait and full SVG sigil asset systems
- Complete character coverage and final content review

The placeholder explorer in `src/App.tsx` is intentional. Do not treat it as
the finished interaction model.

## Product principles

1. Clarity before density. The tree should expose relationships progressively;
   showing every person and connector at once will become unusable.
2. Spoilers are a state boundary, not just a visual preference. Safe mode must
   remain safe on initial load and must not depend on local storage.
3. Canon is curated. Data is entered deliberately from the TV continuity used
   by the project, with book differences called out rather than silently
   merged.
4. Relationships have one authoring source. Store a relationship on the
   appropriate record and derive its mirror in application logic where that is
   reliable; duplicated relationship data will drift.
5. Accessibility is part of the interaction design. Every important tree
   operation needs keyboard and non-hover access, not just pointer behavior.

## Technical decisions

- Build tool: Vite.
- UI: React with TypeScript.
- Styling: project CSS in `src/styles/global.css`; no component library is
  currently used.
- Content: local, typed TypeScript records; no backend or runtime API.
- Validation: TypeScript build, Oxlint, and the dataset checker.
- State: local React state for UI behavior. Do not introduce persistence for
  spoiler state without a deliberate product decision.

## Data model

`House` records provide identity, words, seat, accent color, and a sigil key.
`Character` records provide identity, aliases, titles, primary house,
relationships, living/death state, biographies, quotes, and optional
book-divergence metadata.

Relationship direction is important:

- Blood parents are declared on the child through `parents`.
- Spouses are declared through `spouseIds`.
- Other associations use `nonBloodRelations` with an explicit kind.
- Children and siblings may be supplied when needed by the data model, but
  should not become conflicting duplicates of parent records.

When adding a record, use stable kebab-case IDs, verify every referenced ID,
and run `npm run check-data` before considering the change complete.

## Planned delivery order

1. Finish the data validation rules and baseline content review.
2. Replace the explorer placeholder with a usable vertical tree.
3. Add branch collapse, house filtering, pan/zoom, and a minimap only after
   the basic tree remains understandable without them.
4. Add hover/focus lineage highlighting and a keyboard-accessible detail panel.
5. Expand portraits, sigils, quotes, and book-divergence presentation.
6. Measure bundle size, interaction performance, and accessibility before
   polishing motion and visual effects.

The order matters: navigation and data correctness are prerequisites for
polish. Adding visual complexity before the tree's information architecture is
validated would create rework.

## Repository conventions

- Keep generated output, dependencies, local environment files, and editor
  state out of version control.
- Keep `README.md` focused on onboarding and commands.
- Keep product rationale and implementation context here.
- Treat ignored files such as `spec.md` and `the-lineage-spec.md` as local
  planning material, not authoritative repository documentation.
