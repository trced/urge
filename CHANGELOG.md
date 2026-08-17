# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-08-17

### Added

- The app: you write down an urge at the moment you give it up — a name, perhaps a price and a place, the sentence you told yourself. The register reads most recent first and never reorders itself; between two lines, a gap of four days or more is shown for what it is: days with nothing written down
- Thirty days after giving it up, one question and only one: do you still think about it? Three answers: forgotten, faintly, still, given once and with no going back. The sentence written on the day is read again above it: without it you would be answering a product name rather than an urge
- The question date is fixed when the line is written rather than recomputed from the setting. Shortening the delay would make lines you thought were quiet fall due all at once; lengthening it would erase a question already owed. The setting applies to what you write next, never to what is written
- Two layouts. Above 900 px, two panels: the register on the left, whatever you are looking at on the right. Opening a line does not leave the register, and the panel asks the oldest due question by itself when it has nothing else to show. Below that, one screen at a time, the writing sheet comes up from the bottom and the primary action stays under your thumb
- One urge in full: what it was, what you said about it, what became of it, and a three-step timeline. Nothing there is editable: a written line is a dated fact, and correcting it would mean rewriting what you thought that day. It is removed whole, behind a confirmation, or it stays as it is
- A month in review: what you answered first, the register next, the amounts last. Answers are counted on the day they were given: a month counts what you judged in it, not what you should have judged. The total exists but is never shown as a saving
- Settings: delay before the question (fifteen, thirty or sixty days), when the question is asked, price asked for or never, light, dark or system theme, French, English or system language. Each row cycles its values on click, and the change applies straight away
- Export and import of the `urge.json` file, with a choice between merging and replacing, and a full erase behind an explicit confirmation. Merging overwrites nothing: a line already judged keeps its verdict, even against a file that claims otherwise, and a malformed line is dropped on its own rather than failing the whole import
- "Send": the device's native share when it can take a file, a download otherwise. The file only leaves the device through that gesture, towards the app you pick. The project has no server to receive it
- Installable, offline-capable progressive web app: everything is precached on download, and there is no network request in use. A new version offers itself instead of imposing itself
- Presentation site in French and English: home page with the real app embedded, about page, terms of use, privacy, legal notice and changelog
- Example mode reachable from the overview: sixteen lines computed from today, two of them with questions already due, writing nothing to the device
- The "famille ." 1.2.0 design system as CSS tokens: colour, typography, space, shape, motion, and the shared components (button, text field, setting row, list row, stat row, sheet, period navigation, feedback). urge. adds no colour to the common trunk; its vocabulary is made of words
- Accessibility: touch targets of at least 44 × 44 px, a visible 2 px focus ring, focus trapped in the sheet then given back, `Escape` to close. Every register row carries a full accessible name — "35 mm lens, written down on 14 August 2026, forgotten" — and so does every answer, because three rows reading "forgotten / faintly / still" say nothing out of context
- Unit tests over the pure layer — dates, due dates, register gaps, monthly review, import, merge, storage — and integration tests of the real user paths: write down, answer, remove, set

### Changed

- The "reminder" sketched in the mock-up is replaced by a setting that actually exists: "ask the question — when I open the app, or when I ask for it". An app with no server cannot wake a phone at 9 a.m., and the rest of the interface refuses to promise anything it cannot do

[0.1.0]: https://github.com/trced/urge/releases/tag/v0.1.0
