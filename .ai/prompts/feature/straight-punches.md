# Feature: Add Straight Punches to Boxing Slip Trainer

## Context

The application is a pixel-art boxing slip trainer that currently displays incoming punches (hooks) within a 2×2 grid consisting of four sectors.

The goal is to extend the existing punch system with **left and right straight punches** while preserving the current four-sector layout, visual style, and gameplay mechanics.

Use the attached screenshot as a visual reference for the existing interface.

## Requirements

### 1. Punch Types

Support four logical punch variants:

- Left hook — existing behavior
- Right hook — existing behavior
- Left straight — new
- Right straight — new

Inspect how punches are currently represented, selected, positioned, animated, and rendered before making changes.

Extend the existing architecture instead of introducing a parallel implementation.

### 2. Straight Punch Positioning

The existing grid must remain unchanged:

```text
           LEFT           RIGHT
       ┌─────────────┬─────────────┐
       │             │             │
       │  Left Hook  │  Right Hook │
       │             │             │
       │             │             │
       ├─────────────┼─────────────┤
       │  Left       │  Right      │
       │  Straight   │  Straight   │
       │   Zone      │   Zone      │
       │             │             │
       ├─────────────┼─────────────┤
       │             │             │
       │  Left Hook  │  Right Hook │
       │             │             │
       └─────────────┴─────────────┘
```

**Important:** This diagram illustrates the conceptual positioning only. Do not add actual rows, sectors, or grid boundaries.

Position straight punches near the horizontal centerline separating the upper and lower sectors:

- Left straight: in the left half, close to the horizontal centerline.
- Right straight: in the right half, close to the horizontal centerline.
- Both should visually occupy the transition area between upper and lower sectors rather than the center of an existing quadrant.
- Keep the vertical centerline and existing sector boundaries unchanged.
- Avoid clipping or overlapping interface elements.

Use relative positioning based on the existing playfield dimensions. Preserve responsive behavior.

### 3. Visual Representation

Straight punches must be visually distinguishable from hooks.

- Reuse the existing pixel-art aesthetic, color palette, and rendering approach.
- Prefer reusing or adapting existing fist assets when appropriate.
- Straight punches should visually communicate a forward-directed attack rather than a lateral hook.
- Ensure left and right variants have appropriate orientation.
- Maintain visual consistency in scale, pixel density, and animation quality.

Do not introduce unrelated visual effects, redesigns, or additional UI elements.

### 4. Punch Selection and Timing

Integrate straight punches into the existing training sequence.

- Include both straight variants in the punch selection logic.
- Preserve the current rate/speed controls.
- Reuse the existing timing, animation lifecycle, and cleanup mechanisms.
- Preserve pause, resume, and stop/reset behavior.
- Avoid introducing duplicate timers, competing animation loops, or unnecessary state.
- Keep existing hook behavior unchanged.

Unless the current architecture suggests otherwise, all supported punch variants should initially have equal selection probability.

### 5. Architecture and Implementation

Before editing:

1. Inspect the relevant components, types, assets, hooks, and utilities.
2. Identify the current punch data model and rendering pipeline.
3. Determine the smallest set of changes required.
4. Follow existing project conventions and architectural patterns.

During implementation:

- Prefer extending existing types and functions.
- Keep punch-type definitions explicit and type-safe.
- Separate punch identity, positioning, and visual representation where practical.
- Avoid unnecessary abstractions or broad refactoring.
- Do not add dependencies unless strictly necessary.
- Preserve the existing public interfaces where possible.
- Make minimal, focused changes.

### 6. Validation

Verify that:

- All existing hook positions continue working.
- Left and right straight punches appear near the horizontal centerline in their respective halves.
- The four-sector grid remains unchanged.
- Punch animations and timing work consistently for all variants.
- Existing controls remain functional.
- Positioning works across different viewport sizes.
- No TypeScript, lint, or build errors are introduced.

Add or update focused tests if the project already has an appropriate testing setup.

## Execution Instructions

1. Analyze the existing implementation.
2. Briefly identify the files and logic that need modification.
3. Implement the feature directly.
4. Run available relevant checks.
5. Summarize the changes and any limitations.

**Constraints:**

- Do not rewrite unrelated code.
- Do not introduce additional grid sectors.
- Do not change the current hook behavior.
- Do not invent file paths, APIs, or components; inspect the repository first.
- Prefer the simplest implementation consistent with the existing architecture.
- Do not stop after planning unless a genuine blocker prevents implementation.