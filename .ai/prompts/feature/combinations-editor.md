# Feature: Punch Combination Editor & Local Persistence

## Context

The application is a pixel-art boxing slip trainer with:

- Four punch types: Left Straight, Right Straight, Left Hook, Right Hook.
- A combination engine supporting predefined punch sequences.
- Randomized single punches, combination training, and mixed training modes.
- A set of hardcoded combinations currently defined in a configuration constant.
- Existing application state persisted in localStorage.

Implement a **Combination Manager** that allows users to create, view, edit, and delete punch combinations, with changes automatically persisted in localStorage.

This is an extension of the existing combination engine, not a replacement.

The feature should integrate naturally into the current interface while preserving its pixel-art aesthetic and responsive behavior.

## 1. Initial Repository Investigation

Before implementation, inspect:

- Existing combination definitions and their types.
- Combination selection and playback engine.
- Punch type definitions and identifiers.
- Existing localStorage persistence utilities, hooks, and state management.
- Existing controls header and its responsive layout.
- Current mobile controls expand/collapse functionality.
- Existing dialogs, drawers, popovers, and form components.
- Existing styling conventions and design tokens.

Identify the most appropriate architecture for introducing editable combinations without duplicating existing functionality.

Do not assume particular file paths or libraries.

## 2. Combination Management UI

Introduce an entry point for the Combination Manager in the existing controls header.

### Header changes

- Add a burger/menu button on the LEFT side of the controls header.
- This button opens the Combination Manager.
- Move the existing mobile controls expand/collapse button from the left side to the RIGHT side of the header.
- Preserve existing header functionality, spacing, and responsive behavior.
- Avoid introducing unnecessary header height or visual clutter.

### Responsive presentation

Investigate the existing application layout and choose the most appropriate presentation.

Possible approaches:

**Desktop:**
- Slide-in side drawer.
- Side panel.
- Modal dialog with sufficient width.

**Mobile:**
- Full-screen drawer.
- Bottom sheet.
- Full-screen modal.

Prefer a side drawer on desktop and a full-screen presentation on mobile if they fit the existing design.

However, make the final decision based on the current layout, available screen space, and existing component conventions.

Important:
- Keep the trainer visible and usable where practical.
- Avoid obstructing the punch playfield unnecessarily.
- Support closing through an explicit close button.
- Handle Escape and backdrop clicks where appropriate.
- Prevent background scrolling when the mobile editor is open.
- Preserve accessible focus behavior.

Do not redesign the existing trainer interface.

## 3. Combination List

The manager should display all available combinations.

Each combination entry should provide:

- Combination name.
- Punch sequence, represented using the existing punch identifiers or visual conventions.
- Number of punches.
- Edit action.
- Delete action.

Provide a clear primary action to create a new combination.

The list should remain usable with a growing number of combinations.

Consider a compact list or card-based layout consistent with the existing pixel-art aesthetic.

Provide a reasonable empty state when no combinations exist.

Do not introduce unnecessary search, filtering, sorting, or categorization functionality at this stage.

## 4. Create / Edit Combination Form

Provide a reusable form for creating and editing combinations.

### Fields

**Name**
- Required.
- Trim whitespace.
- Reject empty names.
- Apply a reasonable maximum length consistent with the UI.

**Punch sequence**
- Required.
- Must contain at least one punch.
- Use the four existing punch types:
  - Left Straight
  - Right Straight
  - Left Hook
  - Right Hook

### Sequence editor

Provide an intuitive way to construct and modify punch sequences.

Recommended functionality:

- Add a punch to the sequence.
- Select its punch type.
- Remove an individual punch.
- Reorder punches.
- Visually distinguish straight punches and hooks.
- Display the current sequence in its exact execution order.

A simple ordered list with punch selectors and move-up/move-down controls is sufficient.

Drag-and-drop can be considered only if the project already has an appropriate implementation and it does not introduce unnecessary complexity.

Important:
- Repeated punches must be allowed (e.g. Left Straight → Left Straight).
- Preserve punch order exactly.
- Do not introduce new punch types.
- Reuse existing punch definitions and labels wherever possible.

### Form behavior

- Reuse the same form for creation and editing.
- Populate existing values when editing.
- Validate before saving.
- Prevent accidental loss of unsaved changes when closing the editor.
- Provide clear validation feedback.
- Avoid unnecessary form abstractions or dependencies.

Use the project's existing form and validation conventions.

## 5. CRUD Operations

Implement the following operations:

### Create
- Generate a stable unique ID.
- Add the new combination to the collection.
- Persist the updated collection.

### Read
- Load combinations from persisted storage.
- Display the current collection.

### Update
- Modify an existing combination without changing its ID.
- Preserve all unrelated combinations.
- Persist changes.

### Delete
- Allow deleting individual combinations.
- Ask for confirmation before destructive deletion.
- Remove the combination from the collection and persist the result.

### Built-in combinations

The existing hardcoded combinations should become the default initial dataset.

Important:
- Initialize from the existing presets when no valid user configuration exists.
- Once initialized, user changes must be preserved across reloads.
- Do not silently restore deleted presets on every application startup.
- Do not overwrite existing user modifications when the application initializes.
- Consider providing a simple action to restore default combinations if this fits naturally into the existing UI.

Avoid unnecessary distinction between built-in and user-created combinations unless the existing architecture requires it.

## 6. Local Storage Persistence

Integrate with the existing persistence approach used by the application.

Do not introduce a second, unrelated localStorage abstraction if a suitable one already exists.

Requirements:

- Persist the complete editable combination collection.
- Load persisted combinations during application initialization.
- Use a stable, dedicated storage key following existing naming conventions.
- Keep the data serializable.
- Handle missing storage values.
- Handle malformed JSON.
- Handle invalid or outdated stored data.
- Handle unavailable localStorage gracefully.
- Avoid overwriting valid stored data during initialization.
- Ensure updates are reflected consistently throughout the application.

Consider a lightweight versioned storage schema if appropriate.

If the project already has a reusable persistence hook or utility, extend or reuse it.

Avoid unnecessary dependencies.

## 7. Integration with the Existing Combination Engine

The combination engine must consume the editable collection instead of relying directly on the original hardcoded configuration constant.

The editor and playback engine should use the same source of truth.

Requirements:

- Random combination selection uses the current persisted collection.
- Newly created combinations become available immediately.
- Edited combinations use their updated punch sequences.
- Deleted combinations are excluded from future selections.
- Mixed training continues to work.
- Randomized single-punch training remains completely unaffected.
- Existing training modes and rate controls remain functional.

### Active playback edge cases

Consider what happens when combinations are edited or deleted while training is running.

Implement a predictable policy:

- Do not interrupt an already executing sequence unnecessarily.
- A sequence already in progress may finish using its existing snapshot.
- Updated or deleted combinations should affect subsequent selections.
- Avoid stale references or inconsistent playback state.

If the collection becomes empty, combination and mixed modes should degrade gracefully according to existing application conventions.

Do not introduce a separate combination playback engine.

## 8. Architecture and Maintainability

Maintain separation between:

- Default combination presets.
- Combination data model.
- Persistent combination collection.
- CRUD operations.
- Editor UI.
- Combination playback engine.

Prefer a small, straightforward implementation.

Avoid:
- Unnecessary service layers.
- Overengineering state management.
- Duplicate combination definitions.
- Duplicated validation logic.
- Excessive component nesting.
- Introducing new dependencies without justification.

The architecture should make future enhancements possible, including:
- Import/export combinations.
- Combination categories and tags.
- Training-specific combination selection.
- Custom punch timing.
- More advanced sequence editing.

Do not implement these future features now.

## 9. Visual Design

Preserve the application's existing pixel-art / retro arcade aesthetic.

The Combination Manager should feel like a native part of the trainer.

Consider:
- Existing typography.
- Borders and separators.
- Dark header and controls styling.
- Existing button styles.
- Consistent spacing.
- Clear hover, active, disabled, and focus states.

Avoid introducing a generic modern dashboard aesthetic that conflicts with the existing interface.

Keep the editor compact, readable, and functional.

## 10. Testing and Validation

Add focused tests using the existing testing setup.

Prioritize:

1. Default presets are loaded when storage is empty.
2. Existing persisted combinations are restored correctly.
3. Creating a combination persists it.
4. Editing a combination updates the correct entry.
5. Deleting a combination persists its removal.
6. Invalid combinations cannot be saved.
7. Duplicate punch types are supported.
8. Punch order is preserved.
9. Playback uses the updated collection.
10. Empty combination collections are handled safely.
11. Existing single-punch and mixed modes remain functional.
12. Existing mobile controls behavior remains functional after relocating its button.

Run relevant TypeScript, lint, test, and build checks.

Do not claim checks passed unless they were actually executed.

## 11. Implementation Workflow

1. Inspect the existing application architecture.
2. Identify the current combination configuration and persistence mechanisms.
3. Analyze the controls header and responsive layout.
4. Decide on the most appropriate desktop and mobile editor presentation.
5. Briefly outline the implementation approach.
6. Implement the persistent combination collection.
7. Implement CRUD functionality.
8. Implement the responsive editor UI.
9. Integrate the editor with the existing combination engine.
10. Add focused tests.
11. Run relevant validation.
12. Summarize modified files and important implementation decisions.

## Constraints

- Preserve the existing four punch types.
- Preserve existing combination playback semantics.
- Preserve randomized single-punch behavior.
- Do not redesign the trainer.
- Do not introduce unnecessary dependencies.
- Do not implement future functionality prematurely.
- Reuse existing persistence and UI conventions.
- Keep changes focused and maintainable.
- Inspect the repository before making assumptions.

**Implement the feature directly. Do not stop after planning unless a genuine blocker prevents implementation.**