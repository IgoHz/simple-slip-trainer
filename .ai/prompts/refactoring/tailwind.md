# CSS Modules → Tailwind CSS Migration

## Role

Act as a Senior Frontend Engineer specializing in React, TypeScript, Tailwind CSS, CSS architecture, and large-scale frontend refactoring.

Your task is to migrate the existing styling architecture from a CSS Modules-only approach to a **Tailwind CSS-first approach with CSS Modules retained where technically justified**.

This is an architectural migration, not a visual redesign.

Prioritize:
- Consistency and maintainability.
- Minimal and controlled diffs.
- Reduced CSS complexity and duplication.
- Reusable styling conventions.
- Preservation of existing visual appearance and responsive behavior.
- Compatibility with the project's existing architecture and tooling.

---

## 1. Initial Repository Analysis

Before making any changes, inspect the existing project and establish its styling architecture.

Analyze:

1. `package.json` and installed dependencies.
2. Tailwind CSS version and existing configuration, if present.
3. PostCSS, Vite, Webpack, Next.js, or other build-tool integration.
4. Global styles, CSS resets, design tokens, and theme definitions.
5. Existing CSS Modules and their usage across components.
6. Component architecture and shared UI primitives.
7. Existing conventions for responsive design, dark mode, typography, and component variants.
8. Third-party component styling and overrides.

Identify:
- Opportunities for direct Tailwind migration.
- CSS Modules that should be retained.
- Repeated styles that could be consolidated.
- Existing global styles that should remain global.
- Potential compatibility or migration risks.

Do not assume Tailwind CSS v3 or v4. Adapt the implementation to the version already installed or explicitly approved for adoption.

Do not upgrade unrelated dependencies.

---

## 2. Establish Styling Architecture

Adopt the following architectural principles.

### 2.1 Tailwind CSS as the default

Use Tailwind utility classes for ordinary component styling, including:

- Layout: flex, grid, positioning, display.
- Spacing: margin, padding, gap.
- Sizing: width, height, min/max constraints.
- Typography: font size, weight, line height, alignment.
- Colors: backgrounds, text, borders, rings.
- Borders, radius, shadows, and outlines.
- Responsive behavior and breakpoints.
- Hover, focus, active, disabled, and other interactive states.
- Transitions and simple animations.
- Visibility and conditional styling.

Prefer standard Tailwind utilities over arbitrary values whenever an equivalent design-system utility exists.

Use arbitrary values only when a value is genuinely project-specific and cannot reasonably be represented by existing design tokens or utilities.

### 2.2 CSS Modules where necessary

Retain CSS Modules when they provide a meaningful technical or maintainability advantage.

Appropriate use cases include:

- Complex keyframe animations and animation sequences.
- Advanced animations involving multiple stages, timelines, or intricate transformations.
- Complex selectors that are significantly less readable or maintainable as utility classes.
- Complex pseudo-element compositions.
- Specialized visual effects and intricate background compositions.
- Third-party library overrides that require scoped CSS.
- Highly specialized component styles that would otherwise result in excessively long or difficult-to-maintain class attributes.

Important:
- Do not retain CSS Modules simply because they already exist.
- Do not force everything into Tailwind.
- Do not duplicate styling between Tailwind classes and CSS Modules.
- Keep CSS Modules focused on the specific styles they are responsible for.
- Prefer Tailwind for the component's ordinary styling, even when a CSS Module is retained for specialized behavior.

### 2.3 Global CSS

Keep global CSS limited to genuinely global concerns:

- CSS resets and normalization.
- Font-face declarations.
- Global design tokens and CSS variables.
- Base typography and document-level styles.
- Global theme definitions.
- Third-party styles that must be imported globally.
- Reusable global animation definitions, if justified.

Avoid using global CSS as an alternative component styling system.

---

## 3. Design Tokens and Theme Integration

Inspect existing design tokens before migrating individual components.

Preserve and correctly integrate:

- Brand and semantic colors.
- Background and foreground colors.
- Border colors.
- Typography scales.
- Spacing conventions.
- Border radii.
- Shadows.
- Breakpoints.
- Light and dark themes.

Use the project's existing CSS variables and design tokens wherever possible.

Do not introduce duplicate definitions of existing tokens.

For Tailwind v3, use the appropriate theme extension and configuration mechanisms.

For Tailwind v4, use the appropriate CSS-first configuration and `@theme` conventions.

Avoid hardcoding values that should reference existing design tokens.

Do not introduce a new design system unless required by the existing architecture.

---

## 4. Migration Strategy

Perform migration incrementally.

### Phase 1 — Preparation

1. Verify the current application builds successfully.
2. Identify existing styling conventions and dependencies.
3. Establish Tailwind integration if it is not already configured.
4. Verify that Tailwind utilities are generated correctly.
5. Confirm that global styles, fonts, CSS variables, and themes continue working.
6. Establish any necessary project-wide styling conventions.

Do not start mass component migration before the infrastructure is verified.

### Phase 2 — Component Migration

Migrate components incrementally.

For every component:

1. Read its JSX/TSX implementation.
2. Read all associated CSS Modules.
3. Understand the actual styling behavior, including inherited styles and responsive states.
4. Identify which rules map directly to Tailwind.
5. Identify which rules should remain in CSS Modules.
6. Replace eligible CSS declarations with Tailwind utilities.
7. Retain specialized CSS rules in the corresponding CSS Module.
8. Remove obsolete CSS declarations and unused module imports.
9. Verify that the resulting implementation does not introduce duplicate or conflicting styles.

Prioritize:
- Shared UI components.
- Frequently reused components.
- Simple components with straightforward styling.
- Components with duplicated styling patterns.
- More complex components after the migration conventions are established.

Do not perform a blind find-and-replace migration.

### Phase 3 — Styling Consolidation

After migrating components:

- Remove unused CSS Modules.
- Remove obsolete selectors and declarations.
- Consolidate duplicated global styles where appropriate.
- Eliminate redundant utility combinations.
- Review repeated class patterns for possible component-level abstractions.
- Ensure consistent use of responsive and interactive variants.
- Verify that retained CSS Modules have a clear technical justification.

Avoid introducing unnecessary abstractions or custom utility layers.

---

## 5. Tailwind Usage Guidelines

Follow these conventions:

### Class composition

- Keep class names readable and logically grouped.
- Avoid unnecessarily long or repetitive class strings.
- Use existing `cn`, `clsx`, or `tailwind-merge` utilities if already available.
- Preserve existing conditional styling behavior.
- Avoid dynamically constructing Tailwind class names in ways that prevent static class detection.
- Use complete statically detectable class names.

### Component variants

For components with multiple visual variants:

- Prefer the existing project variant utility, such as CVA, if available.
- Reuse existing component APIs.
- Avoid duplicating variant definitions.
- Do not introduce a new variant library without a strong reason.

### Responsive styling

- Preserve existing breakpoints and responsive behavior.
- Use Tailwind responsive modifiers.
- Avoid introducing unnecessary breakpoint overrides.
- Preserve mobile-first behavior where applicable.

### Interactive states

Use appropriate Tailwind state modifiers:
- `hover:`
- `focus:`
- `focus-visible:`
- `active:`
- `disabled:`
- `group-*`
- `peer-*`
- `data-*`
- `aria-*`

Preserve accessibility-related visual states.

### Animations

Prefer Tailwind utilities for simple transitions and animations.

Retain CSS Modules for complex keyframes, intricate animation sequences, specialized timing behavior, or cases where utility-based implementation becomes unnecessarily complicated.

Do not simplify, remove, or visually alter existing animations during migration.

---

## 6. Strict Constraints

The following constraints are mandatory:

1. Do not change component behavior, business logic, or public APIs.
2. Do not modify application architecture or component boundaries unless absolutely necessary for styling migration.
3. Do not introduce visual redesigns.
4. Do not remove existing responsive behavior.
5. Do not remove hover, focus, active, disabled, loading, or other visual states.
6. Do not replace design tokens with hardcoded values.
7. Do not introduce unnecessary dependencies.
8. Do not migrate unrelated files.
9. Do not leave obsolete CSS declarations or unused imports.
10. Do not create giant Tailwind class strings that are difficult to maintain.
11. Do not use `@apply` as a general replacement for existing CSS Modules. Use it only when a genuine shared CSS abstraction is justified.
12. Do not introduce inline styles as a substitute for either Tailwind or CSS Modules.
13. Do not change third-party component behavior or override semantics.
14. Do not use arbitrary Tailwind values when existing project tokens or standard utilities are sufficient.

If a component is already well-structured and its CSS Module is justified, leave it unchanged.

---

## 7. Execution and Quality Control

Work incrementally and keep changes easy to review.

After each logical migration batch:

1. Run the relevant TypeScript checks.
2. Run ESLint or the project's configured lint command.
3. Run relevant tests.
4. Check for invalid or unsupported Tailwind utilities.
5. Check for unused CSS Module imports and selectors.
6. Review the resulting diff for unintended changes.

If visual testing or browser tooling is available, verify:
- Layout and alignment.
- Typography.
- Responsive breakpoints.
- Component variants.
- Interactive states.
- Animations and transitions.
- Theme behavior.

Do not claim visual equivalence without actual visual verification.

If a regression is detected, investigate and fix it before proceeding.

Do not suppress errors or weaken existing checks to make the migration pass.

---

## 8. Final Architecture Audit

After completing the migration, perform a dedicated audit.

Verify:

- Tailwind is the primary styling mechanism.
- CSS Modules remain only where justified.
- Global CSS contains only global concerns.
- No redundant or conflicting styles remain.
- No obsolete CSS Modules or unused selectors remain.
- Design tokens and themes are preserved.
- Responsive behavior is unchanged.
- Existing component APIs and behavior are unchanged.
- No unnecessary dependencies or configuration changes were introduced.
- Build, type checking, linting, and relevant tests pass.

### Final Report

Provide a concise report containing:

1. **Migration summary** — what was migrated.
2. **Architecture changes** — Tailwind configuration, tokens, global styles, and conventions.
3. **Retained CSS Modules** — list each retained module and explain why it remains necessary.
4. **Removed styles** — obsolete modules, selectors, and duplicated declarations.
5. **Validation results** — build, type checking, linting, and tests.
6. **Remaining issues** — incomplete migrations, visual verification gaps, and technical limitations.

---

## 9. Execution Discipline

Follow a controlled workflow:

**Analyze → Plan → Prepare → Migrate → Validate → Audit → Report**

Before implementation:
- Present the migration plan.
- Identify the affected files and expected scope.
- Highlight potentially risky components.
- Establish the criteria for retaining CSS Modules.

During implementation:
- Work in logical batches.
- Avoid broad, unrelated refactoring.
- Re-read relevant files before modifying them.
- Preserve existing changes made by other developers.
- Do not assume that a previous migration batch was successful without validating it.

If the migration is too large for one context window, maintain a concise progress record containing:
- Completed phases and components.
- Remaining components.
- Architectural decisions.
- Validation results.
- Known issues.
- The exact next step.

A new session must be able to resume without repeating completed work or re-analyzing the entire repository.

**Start with repository analysis and a migration plan. Do not modify files until the plan has been presented.**