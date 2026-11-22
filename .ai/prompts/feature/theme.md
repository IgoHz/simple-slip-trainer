# Feature: Persistent Theme Switching

## Context

The application is a pixel-art boxing slip trainer with a retro arcade-inspired interface.

Implement a theme-switching feature that allows users to switch between available visual themes and preserves their selection across page reloads.

The theme switch must integrate into the existing controls header and responsive mobile controls menu.

## 1. Initial Investigation

Before implementation, inspect:

- Existing global styles and CSS variables.
- Current color palette and styling conventions.
- Controls header structure.
- Desktop and mobile responsive layouts.
- Existing right-side expandable mobile controls menu.
- Existing localStorage persistence utilities and hooks.
- Existing application state initialization.

Determine the cleanest way to introduce theme support while minimizing changes to existing components.

Do not assume particular file paths or styling libraries.

## 2. Theme System

Introduce two themes:

- Dark (preserve the current appearance as closely as possible).
- Light (a coherent alternative theme).

Use a centralized theme definition based on CSS custom properties/design tokens.

At minimum, account for:

- Application background.
- Playfield background.
- Header and footer backgrounds.
- Primary and secondary text.
- Borders and separators.
- Controls and buttons.
- Interactive states (hover, active, disabled, focus).
- Drawers, dialogs, and overlays.

Preserve the existing retro pixel-art aesthetic in both themes.

Important:
- Dark theme should remain the default for users without a saved preference.
- Light theme should be designed intentionally rather than simply inverting all colors.
- Maintain sufficient contrast and readability.
- Preserve existing punch assets, their colors, and visual appearance unless theme adaptation is genuinely necessary.
- Avoid duplicating entire stylesheets for individual themes.

Prefer CSS variables and a centralized theme definition over scattered conditional styling.

## 3. Theme Toggle Placement

### Desktop

Add a compact theme toggle to the existing controls header.

Requirements:
- Keep it visually consistent with existing controls.
- Prefer a Sun/Moon icon or an equivalent compact representation.
- Clearly indicate the currently active theme.
- Avoid unnecessarily increasing header height or width.
- Provide an accessible label and tooltip where appropriate.

### Mobile

The existing interface has a right-side expandable controls menu.

Place the theme toggle inside this menu.

Requirements:
- Do not add another permanently visible header control on mobile.
- Reuse the existing menu expansion mechanism.
- Keep the theme option easy to find.
- Preserve the current mobile controls expand/collapse behavior.
- Ensure the toggle does not interfere with other controls.

Use the existing responsive conventions rather than introducing a separate mobile menu implementation.

## 4. Theme State and Persistence

Persist the selected theme using localStorage.

Requirements:

- Default to Dark when no preference exists.
- Restore the previously selected theme on application initialization.
- Apply theme changes immediately without page reload.
- Persist changes automatically.
- Use a stable storage key following existing naming conventions.
- Handle unavailable localStorage gracefully.
- Handle invalid stored values safely.
- Avoid unnecessary state duplication.

Reuse existing persistence hooks/utilities if appropriate.

Prefer a centralized theme state provider or existing application-level state mechanism, depending on the current architecture.

Avoid introducing a state management dependency.

### Initialization

Prevent a flash of the incorrect theme during application startup where reasonably possible.

If necessary, use a minimal early theme initialization mechanism consistent with the project's rendering architecture.

Avoid hydration mismatches or accessing browser-only APIs during server-side rendering.

## 5. Responsive and Visual Validation

Verify that:

- Desktop users can switch themes directly from the controls header.
- Mobile users can switch themes from the right expandable controls menu.
- Theme changes apply immediately.
- Theme selection survives reloads.
- All major interface elements are styled correctly in both themes.
- The playfield and punch rendering remain visually consistent.
- Existing controls retain their functionality.
- No layout shifts or responsive regressions are introduced.

## 6. Testing

Add focused tests using the existing testing setup.

Prioritize:

1. Dark is the default theme.
2. Saved Light preference is restored.
3. Switching themes updates application state.
4. Theme changes are persisted.
5. Invalid stored values fall back safely.
6. Existing application functionality remains unaffected.

Run relevant TypeScript, lint, test, and build checks.

Do not claim checks passed unless they were actually executed.

## 7. Implementation Workflow

1. Inspect the existing styling, state, and responsive architecture.
2. Identify the smallest set of files requiring changes.
3. Briefly outline the implementation approach.
4. Introduce centralized theme tokens.
5. Implement theme state and persistence.
6. Integrate the desktop header toggle.
7. Integrate the mobile menu toggle.
8. Verify both themes across the interface.
9. Add focused tests.
10. Run relevant validation.
11. Summarize implementation decisions and modified files.

## Constraints

- Preserve the current Dark theme appearance.
- Do not redesign the application.
- Do not introduce unnecessary dependencies.
- Reuse existing persistence mechanisms.
- Avoid duplicated theme logic.
- Keep changes minimal and maintainable.
- Follow existing project conventions.
- Inspect actual repository files before making assumptions.

**Implement the feature directly. Do not stop after planning unless a genuine blocker prevents implementation.**