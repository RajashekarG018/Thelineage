# The Lineage

The Lineage is an interactive Westeros family-tree explorer built with React,
TypeScript, and Vite. It presents hand-curated TV-canon character and house
data in a dark, editorial interface with spoiler-safe and spoiler-revealing
states.

The application is currently in an early implementation stage: the cinematic
shell, hero section, spoiler toggle, and curated data layer are present; the
interactive family-tree explorer is still being built.

## Requirements

- Node.js 20 or newer
- npm

## Getting started

```bash
npm install
npm run dev
```

Vite will print the local development URL. To create a production build:

```bash
npm run build
npm run preview
```

## Useful commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server with HMR |
| `npm run build` | Type-check and build the production bundle |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run Oxlint |
| `npm run check-data` | Validate the curated character/house dataset |

The data layer also has a debug view at `/?data`, which renders the assembled
dataset as JSON for quick inspection during development.

## Project structure

```text
src/
  components/       React UI components
  data/              Houses, characters, schemas, and lookup helpers
  App.tsx            Application shell and top-level spoiler state
  main.tsx           React entry point
public/              Static assets
scripts/             Development validation scripts
PROJECT_CONTEXT.md   Product context, decisions, and implementation status
```

## Data authoring

Character and house records are TypeScript data, not fetched from an API. Add
or edit records in `src/data/characters/` and `src/data/houses.ts`, following
the interfaces in `src/data/types.ts`. Declare relationships in one direction
where possible; renderer-level code should derive mirrored relationships to
avoid inconsistent duplicate records.

The project uses a hand-curated TV-canon baseline. Treat spoiler handling as a
product requirement: safe-mode content must not reveal deaths or late-story
events, while spoiler-mode content may show the full record.

## Documentation

`PROJECT_CONTEXT.md` is the maintained context document for the product
direction, current implementation status, data rules, and next milestones.
Local specification drafts such as `the-lineage-spec.md` and `spec.md` are
ignored by Git and are not the source of truth for the repository.

## License

No license has been selected yet. Add one before distributing the project.
