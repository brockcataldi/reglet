# Reglet

## Ground rules

### Branching and PRs

- Every new set of PRs starts from `main`. Before creating a branch for new work, run `git switch main && git pull` and branch from there.
- Once a PR is merged, switch back to `main` and pull before starting anything else. Don't stack new work on top of a branch whose PR has already merged.
- Don't branch new work off another feature branch unless the user asks for a stacked PR.

### Design workflow

- When asked for design options, build 3+ live variants on a temporary route (e.g. `src/routes/field-lab`) with buttons to switch between them and a short note on each. Don't describe options or use ASCII previews. Once one is picked, build it for real and delete the route.
- Keep UIs as small as possible without feeling dense.

### UI conventions

- **Fonts signal interactivity.** Monospace for anything interactive (buttons, links, inputs, selects, comboboxes, toggles, labels tied to inputs, `Separator`). Disabled controls and the active/checked item in an interactive set (current tab, current step, checked radio card) stay monospace. Sans-serif for display and info text (paragraphs, headings, help text, errors, read-only values).
- **Buttons** pair an icon with visible text (`Button`/`LinkButton` require `icon`). Icon-only is an opt-in via `iconOnly` where space is genuinely tight, and still takes a `label`. Use the regular (md) size; `size="sm"` only for actions inside a `Separator`. Hover/focus/selected use cobalt; destructive actions use red. Delete uses lucide `Trash`, never `Trash2`.
- **Accessibility first.** Prefer keyboard-accessible patterns (comboboxes, selects) over drag and drop. Colour is never the only indicator.
- **Field labels.** Text inputs, comboboxes and selects are labelled with `<Separator as="label" for={id}>` (stacked) or `InlineField` (horizontal, shared underline; preferred where vertical space is tight). Never a hand-styled `<label>`. Stacked rows align with `items-end`; inline errors go below the row.
- **Editable lists.** Each row is a card: `border border-black bg-white p-4`, with `gap-4` between rows.
- **Lane and step numbers** are bare numbers in a square `border bg-sunburst-500 font-bold` box (steps `size-17`, lanes `size-11 text-2xl`). The word "Lane"/"Step" is `sr-only`. Keep badges big and the buttons beside them md.
- **Customised values** (overriding a computed value) are italic, followed by a small bordered sunburst box holding lucide `PencilLine` (title "Custom value"; screen readers get "(custom)"). Never mark them with colour alone or the word "Custom".
- **No eyebrows.** Never put eyebrow/kicker text above a heading.
- **No middle dots.** Never use "·" as a separator in UI text, labels or aria strings. Put secondary detail in parentheses, e.g. "Lane 2 (Roboto 400)". The "reg·let" wordmark is branding and is fine.
- **Terminology.** Use web terms (line height, letter spacing, font size), not print terms (leading, tracking).
