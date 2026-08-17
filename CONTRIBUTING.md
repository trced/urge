# Contributing to urge.

Thank you for looking. This document covers what the project accepts, how to set it up, and the conventions a pull request is measured against.

Everyone taking part is expected to follow the [Code of Conduct](CODE_OF_CONDUCT.md).

## The two rules

Most pull requests that get turned down fail one of these, so they come first.

**One question.** urge. asks *do you still think about it?* A feature that does not serve that question is not added, however good it is. Wishlists, savings totals presented as gains, price tracking, budgets, streaks, scores and charts have all been considered and refused on purpose. See "What it is not" in the [README](README.md).

Two refusals are proposed often enough to be worth stating. **A wishlist** — "let me note the things I want too" — turns the register inside out: a line would then be waiting to be bought, and the thirty-day question would become a purchase reminder. **"I bought it in the end"** would turn a register into a regret; the app records what you gave up on, and never audits whether you held.

The verdict is final for the same reason. An answer you can revise is an answer you negotiate, and negotiating is exactly what the thirty days were meant to make unnecessary.

**No new component without proof.** Before adding one to `src/components/`: show that three screens need it, show that no composition of the existing ones is enough, and document its anatomy, states, API and accessibility. Eight shared components cover the whole app today, and they come from the family rather than from this project.

If you are unsure whether an idea fits, open an issue before writing code. A paragraph beats a rejected branch.

## Ways to contribute

- **Report a bug.** Use the bug template; it asks for the browser and the steps, which is usually all that is needed.
- **Improve the translations.** `src/i18n/fr.ts` is the reference and `src/i18n/en.ts` its mirror. Wording fixes are welcome and easy to review.
- **Improve accessibility.** Keyboard traps, screen-reader wording, contrast and focus order are always in scope, and never refused for being small.
- **Fix a bug.** No need to ask first.
- **Documentation.** Including this file.

## Setup

Node 20.19+ or 22.12+ is required.

```bash
npm install
npm run dev        # http://localhost:5173
```

`/app?demo=1` gives you a filled register — sixteen lines, two questions already due — without writing anything to the device, which is the fastest way to see a change in context.

Before pushing:

```bash
npm run typecheck
npm test
npm run build
```

All three must pass. `npm run build` runs the typecheck again, so a green build is the single check that matters most.

## Conventions

### Layers

`src/lib/` is pure: no React, no DOM, no `window`. Anything that can be expressed there belongs there, because that is the layer that gets tested without a browser. If you find yourself importing React into `lib/`, the logic is in the wrong place.

### Design system

Read the constraints in the [README](README.md#design-system) first. In practice, a pull request touching the interface is checked against:

- **Tokens only.** A hard-coded colour, size, duration or spacing in a component is a conformance defect. Add a token if a value is genuinely new.
- **Nothing moves.** No hover, focus or active state may change padding, margin, size or position. Invert colours, draw a rule, paint a shadow, but the box keeps its geometry, or neighbouring elements jump under the pointer.
- **State reads, it does not colour.** An active tab carries a 1 px rule, not a pill or a tint. Colour is reserved for the destructive action — a verdict never gets one.
- **44 × 44 touch targets**, a visible 2 px focus ring at 3 px offset, and no drop shadows anywhere.

### Internationalisation

Every user-visible string is a key. `fr.ts` is the reference; `en.ts` is typed against it, so a missing or extra key fails compilation. Tests additionally check that no translation is empty, that placeholders match on both sides, and that every plural declares its `.one` and `.other` forms.

Never concatenate translated fragments. Use a placeholder — `'{n} of {total}'` — so translators can reorder.

### Tests

The pure layer carries the logic that can be wrong, so it carries most of the tests. Add one when you:

- change date handling, due dates, register gaps, the monthly review or file handling;
- fix a bug: the test should fail before your fix and pass after;
- change a user path end to end (writing down, answering, removing, importing).

Test names describe behaviour, not implementation. Query by role and label rather than by class, so a refactor of the markup does not break the suite.

### Comments

The source is commented in French. Match the file you are editing; if you are not comfortable writing French, English is accepted and someone will translate it later. A correct explanation in the wrong language beats no explanation.

Comments say *why*, not *what*. The diff already says what.

## Commits

Subjects follow [Conventional Commits](https://www.conventionalcommits.org): `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`. Keep the subject in the imperative and under about 70 characters.

The body is where the work is. Explain the reasoning, the alternative you rejected and why, and any consequence a reader would not guess from the diff. The existing history is written in French; match it if you can.

## Pull requests

- One concern per pull request. Two unrelated fixes are two pull requests.
- Fill in the template. It is short, and the checklist is the same one a reviewer would run by hand.
- Include before and after screenshots for any visible change, at phone width and at desktop width. The threshold is 900 px, and the two sides break independently.
- Propose a one-line changelog entry in the description for anything a user would notice, in French and English if you can. `CHANGELOG.md` and the in-app changelog under `src/data/changelog/` are both written at release time, from those lines. Internal refactors do not need one.
- Expect review comments about the design system. They are not personal; the constraints are what keeps the interface coherent.

## Security

Do not open a public issue for a vulnerability. See [SECURITY.md](SECURITY.md).

## Licence

urge. is AGPL-3.0-or-later. By contributing you agree that your contribution is licensed under the same terms. There is no contributor licence agreement to sign.
