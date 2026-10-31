# Feature: Configurable Punch Combinations for Boxing Slip Trainer

## Context

The application is a pixel-art boxing slip trainer that currently supports four incoming punch variants:

- Left straight
- Right straight
- Left hook
- Right hook

The trainer currently generates randomized individual punches at a configurable rate.

Implement support for **predefined multi-punch combinations** alongside the existing randomized single-punch training.

This is the first stage of a larger feature. For now, combinations should be defined in a static configuration constant. A future feature will introduce an interface for viewing, creating, editing, and managing combinations.

**Goal:** Build a small, reliable, extensible combination system without unnecessary architectural complexity.

## 1. Inspect Existing Architecture

Before implementation, inspect:

- Punch types and their representation
- Random punch generation logic
- Animation and rendering lifecycle
- Rate/timing controls
- Pause/resume/reset functionality
- Existing configuration conventions
- Relevant state management and hooks

Reuse the existing punch rendering and animation pipeline.

Avoid duplicating punch logic or creating a separate animation system for combinations.

## 2. Combination Data Model

Introduce a type-safe, declarative representation of punch combinations.

Each combination should support:

- `id`: Stable unique identifier
- `name`: Human-readable name
- `punches`: Ordered sequence of existing punch types
- `description`: Optional descriptive text
- `intervalMs`: Optional timing override between punches

Suggested conceptual structure (adapt to existing project conventions):

```ts
type PunchCombination = {
  id: string;
  name: string;
  punches: readonly PunchType[];
  description?: string;
  intervalMs?: number;
};
```

Use the existing `PunchType` definition rather than introducing incompatible or duplicate types.

Keep the model serializable and suitable for future persistence and UI-based editing.

Avoid storing functions, React components, or rendering-specific objects inside combination definitions.

## 3. Initial Combination Presets

Create a dedicated configuration constant containing common boxing combinations.

Use the existing punch-type identifiers.

Suggested initial presets:

| Name | Punch sequence |
|---|---|
| Jab–Cross (1–2) | Left Straight → Right Straight |
| Double Jab (1–1) | Left Straight → Left Straight |
| Jab–Cross–Jab (1–2–1) | Left Straight → Right Straight → Left Straight |
| Jab–Cross–Hook (1–2–3) | Left Straight → Right Straight → Left Hook |
| Jab–Hook (1–3) | Left Straight → Left Hook |
| Cross–Hook (2–3) | Right Straight → Left Hook |
| Jab–Cross–Hook–Cross (1–2–3–2) | Left Straight → Right Straight → Left Hook → Right Straight |
| Double Jab–Cross (1–1–2) | Left Straight → Left Straight → Right Straight |
| Jab–Cross–Left Hook–Right Hook | Left Straight → Right Straight → Left Hook → Right Hook |
| Alternating Straights | Left Straight → Right Straight → Left Straight → Right Straight |

Include an additional preset named **Mailman** if its intended sequence can be established reliably from the project context or an authoritative reference. Do not invent a supposedly canonical sequence for an ambiguous boxing nickname.

Assume an orthodox stance for conventional 1–2–3 notation, where 1 is the lead jab, 2 is the rear cross, and 3 is the lead hook. The incoming punch directions should map consistently to the existing application's left/right semantics.

Avoid adding stance configuration in this feature.

Export the presets from an appropriate configuration module, following existing naming conventions.

## 4. Training Modes

Support three logical training modes:

### Random Singles

- Preserve the current randomized individual punch behavior.
- Keep existing timing and selection rules unchanged.

### Combinations

- Randomly select a combination from the predefined configuration.
- Execute its punches sequentially in the declared order.
- Finish the current combination before selecting another.
- Never interleave punches from unrelated combinations.

### Mixed

- Randomly select either an individual punch or a complete combination.
- Keep the selection probability configurable through a simple constant.
- Use a reasonable initial distribution, such as 50% singles and 50% combinations, applied per sequence selection rather than per individual punch.
- Once a combination starts, execute it completely before selecting another sequence.

Represent the modes with a type-safe union or enum consistent with project conventions.

Add a minimal mode selector to the existing UI, preserving its pixel-art styling and layout.

Do not add a combination editor, management screen, or complex settings interface.

## 5. Combination Playback Engine

Implement sequential punch playback using the existing rendering and animation mechanisms.

Required behavior:

1. Select a training sequence according to the active mode.
2. Resolve it into an ordered sequence of punches.
3. Display the first punch.
4. Wait for the configured interval or the appropriate existing animation transition.
5. Display the next punch.
6. Continue until the sequence is complete.
7. Respect the existing training rate before starting the next sequence.

### Timing

Distinguish between:

- **Training rate:** Controls the cadence of new attacks/sequences.
- **Combination interval:** Controls the cadence of punches within a combination.

Use a reasonable default combination interval, defined as a configuration constant.

Allow individual combinations to override that interval through `intervalMs`.

Reuse existing timing utilities where possible.

Avoid changing the semantics of the current rate control for single-punch training.

If the existing animation duration or rate imposes constraints, coordinate the timing so that punches remain visible and distinguishable.

Define a clear scheduling policy for combinations longer than the current rate interval. Do not overlap unrelated sequences or accumulate queued attacks.

### State and Lifecycle

Ensure:

- Only one active training sequence exists at a time.
- Punches execute in the correct order.
- Pause freezes the current sequence without skipping punches.
- Resume continues from the correct position.
- Reset/stop cancels pending punches and clears sequence state.
- Changing training mode safely cancels or completes the active sequence according to existing application conventions.
- Changing the rate does not create duplicate scheduling loops.
- Component unmount cancels all pending work.

Prevent stale callbacks, race conditions, and duplicated timers.

Prefer a small, deterministic state machine or an extension of the existing scheduler over scattered independent timers.

Do not introduce an external state-machine library.

## 6. Architecture and Future Extensibility

Design the feature so that a future combination-management UI can reuse the same data model and playback engine.

Maintain clear separation between:

- Punch definitions
- Combination definitions
- Sequence selection
- Playback scheduling
- Punch rendering
- UI controls

Avoid hardcoding combination-specific conditions inside React rendering components.

The playback engine should consume combination data without depending on where it originates.

For now, use the static configuration array as the sole combination source.

Do not implement persistence, import/export, CRUD functionality, or a combination editor.

Do not overengineer with repositories, service layers, dependency injection, or unnecessary abstractions.

## 7. Edge Cases

Handle the following cases:

- Empty combination list
- Invalid or empty punch sequence
- Combination containing a single punch
- Rapid pause/resume interactions
- Switching modes during playback
- Reset during a combination
- Changing rate during playback
- Component unmount during an active sequence
- Extremely short timing intervals

Avoid silently falling into broken playback states.

Use appropriate validation and sensible fallback behavior.

## 8. Tests and Validation

Add focused tests where the existing test setup supports them.

Prioritize:

1. Combination selection returns a valid configured sequence.
2. Punch order is preserved.
3. All configured punch types are supported.
4. Mixed mode selects both singles and combinations.
5. Pause/resume preserves the current sequence position and remaining timing.
6. Reset cancels pending playback.
7. No duplicate punches are scheduled.
8. Existing randomized single-punch behavior remains unchanged.

Prefer deterministic tests with controlled randomness and fake timers where applicable.

Run relevant TypeScript, lint, test, and build checks.

Do not claim checks passed unless they were actually executed.

## 9. Implementation Workflow

1. Inspect the relevant repository files.
2. Identify the existing punch scheduling and rendering architecture.
3. Briefly outline the minimal implementation approach.
4. Add the combination model and preset configuration.
5. Extend the existing scheduler to support sequences.
6. Add the training-mode selector.
7. Implement focused tests.
8. Run available validation.
9. Summarize modified files, behavior, and any limitations.

## Constraints

- Preserve existing single-punch functionality.
- Preserve all four punch variants and their current positioning.
- Preserve the four-sector grid and visual design.
- Do not introduce new punch types.
- Do not introduce unnecessary dependencies.
- Avoid unrelated refactoring.
- Follow existing TypeScript and React conventions.
- Prefer pure functions for sequence selection.
- Keep timing logic centralized and deterministic.
- Avoid unnecessary React rerenders during playback.
- Keep changes minimal, maintainable, and easy to review.
- Inspect actual repository files rather than assuming paths or APIs.

**Implement the feature directly. Do not stop after producing a plan unless a genuine blocker prevents safe implementation.**