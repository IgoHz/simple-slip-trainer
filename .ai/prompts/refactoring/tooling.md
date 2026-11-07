# Project Toolchain Migration: Bun + Oxlint + Oxfmt + Vitest

Act as a Senior Frontend/Full-Stack Engineer specializing in JavaScript/TypeScript tooling, build systems, developer experience, and CI/CD infrastructure.

Your task is to migrate the existing project to a modern, consistent toolchain based on:

- **Bun** — package manager and script runner.
- **Oxlint** — linting.
- **Oxfmt** — code formatting (replacing Prettier where applicable).
- **Vitest** — unit and integration testing.

The migration must be production-ready, maintainable, deterministic, and consistent across local development, CI/CD, Docker, and Git hooks.

Do not blindly replace commands or dependencies. Inspect the actual project architecture and adapt the migration to its existing structure.

---

# 1. Initial Repository Audit

Before modifying anything, inspect the repository.

Identify:

- Current package manager and version.
- Runtime environment and Node.js/Bun requirements.
- Package structure (single application, monorepo, workspaces).
- Existing `package.json` scripts.
- Lockfiles and package manager configuration.
- TypeScript configuration.
- Existing linting and formatting tools.
- Existing test framework and coverage configuration.
- Build tools and bundlers.
- Dockerfiles and Docker Compose configurations.
- CI/CD workflows (GitHub Actions or other providers).
- Git hooks (Husky, lint-staged, commitlint, etc.).
- Environment variables and runtime assumptions.
- IDE/editor configuration.
- Existing scripts and automation utilities.

Inspect all relevant configuration files, including:

```text
package.json
tsconfig*.json
bunfig.toml
.npmrc
.nvmrc
.node-version
.gitignore
.dockerignore
Dockerfile*
docker-compose*.yml
compose*.yaml
.github/workflows/*
.husky/*
.vscode/*
```

Also inspect project-specific configuration files and scripts.

### Audit requirements

1. Identify obsolete, redundant, or conflicting dependencies.
2. Identify scripts relying on npm, pnpm, yarn, or npx.
3. Identify Node.js-specific assumptions that must remain intact.
4. Identify potential incompatibilities with Bun.
5. Identify test configuration and existing test conventions.
6. Identify linting and formatting rules that must be preserved.
7. Identify infrastructure that would break after migration.

Produce a concise migration plan before modifying files.

Do not modify files during the initial audit.

---

# 2. Bun Migration

Migrate the project to Bun as its package manager and script runner.

### Package management

- Introduce Bun configuration where necessary.
- Generate and maintain the appropriate Bun lockfile.
- Remove obsolete lockfiles after successful migration.
- Remove package-manager-specific configuration that is no longer relevant.
- Preserve required registry configuration and environment settings.
- Configure reproducible dependency installation.
- Preserve workspace configuration if the project is a monorepo.

Use the current official Bun documentation to determine the correct commands and configuration for the installed Bun version.

### Scripts

Migrate package management and execution commands:

| Existing | Bun equivalent |
|---|---|
| `npm install` | `bun install` |
| `npm ci` | `bun install --frozen-lockfile` |
| `npm run dev` | `bun run dev` |
| `npm run build` | `bun run build` |
| `npx package` | `bunx package` |
| `npm install package` | `bun add package` |
| `npm uninstall package` | `bun remove package` |

Adapt commands to the actual project and current Bun CLI.

Do not mechanically replace every occurrence of `node`, `npx`, or `npm`.

### Runtime compatibility

IMPORTANT:

Bun package management does not imply that the application must run on Bun.

- Preserve Node.js runtime where required.
- Do not change Docker runtime images without verifying compatibility.
- Do not replace Node.js-specific APIs unnecessarily.
- Preserve environment variable handling and process behavior.
- Verify compatibility of native modules, scripts, and build tooling.
- Keep production runtime independent from development tooling where appropriate.

Only migrate application execution to Bun if explicitly justified by compatibility and project requirements.

### Dependency migration

- Verify dependency compatibility.
- Remove obsolete package-manager dependencies.
- Avoid unnecessary dependency upgrades.
- Prefer stable compatible versions.
- Preserve dependency versions unless an upgrade is required.
- Verify peer dependencies and optional dependencies.

---

# 3. Oxlint Migration

Replace ESLint with Oxlint where applicable.

Use the current official Oxlint documentation.

### Configuration

- Create the appropriate Oxlint configuration.
- Preserve meaningful existing ESLint rules.
- Enable relevant recommended rules.
- Configure TypeScript support.
- Configure React and React Hooks rules when applicable.
- Configure import and dependency-related rules where appropriate.
- Preserve project-specific restrictions.
- Avoid enabling excessive rules that produce noise without meaningful value.

### Plugin compatibility

Check which existing ESLint plugins and rules have native Oxlint equivalents.

Do not assume all ESLint rules are supported.

For unsupported rules:

1. Determine whether an equivalent Oxlint rule exists.
2. If necessary, retain a minimal ESLint compatibility layer temporarily.
3. Avoid introducing unnecessary dependencies just to preserve stylistic rules.
4. Document intentionally omitted rules.

### Type-aware linting

Evaluate whether type-aware linting is necessary.

Do not duplicate TypeScript compiler checks with unnecessary lint rules.

Keep responsibilities clear:

- TypeScript: static type checking.
- Oxlint: code quality, correctness, best practices and architectural restrictions.

### Scripts

Establish consistent scripts, adapting names to the existing project:

```json
{
  "lint": "oxlint .",
  "lint:fix": "oxlint . --fix"
}
```

Ensure generated files, build output, dependencies and other irrelevant directories are excluded.

---

# 4. Oxfmt Migration

Use Oxfmt as the primary formatter, replacing Prettier where appropriate.

Consult current official Oxfmt documentation for supported configuration options.

### Requirements

- Preserve the existing formatting conventions.
- Configure consistent formatting across the repository.
- Support TypeScript, TSX, JavaScript, JSX, JSON, CSS and other relevant file types.
- Configure exclusions for generated files, dependencies and build artifacts.
- Avoid conflicting formatting rules between Oxlint and Oxfmt.

Do not assume Oxfmt supports every Prettier option or plugin.

If an existing Prettier plugin or configuration is essential and unsupported, identify an appropriate alternative instead of silently dropping functionality.

### Scripts

Establish consistent formatting commands:

```json
{
  "format": "oxfmt .",
  "format:check": "oxfmt --check .",
  "pretty": "oxfmt ."
}
```

Retain or adapt existing script names where necessary to avoid breaking developer workflows.

Formatting checks must be non-destructive.

---

# 5. Vitest Migration

Migrate the existing test infrastructure to Vitest.

If no test framework exists, establish a suitable baseline configuration.

### Configuration

Inspect and preserve:

- Test discovery patterns.
- Test environments (`node`, `jsdom`, etc.).
- Setup files.
- Global test configuration.
- Path aliases.
- Mocking behavior.
- Environment variables.
- Coverage configuration.
- Test utilities.
- Existing test conventions.

### Framework compatibility

Configure the appropriate Vitest environment:

- React/Vue/etc. integrations where applicable.
- Testing Library.
- DOM environment.
- Mocking and setup utilities.
- TypeScript support.
- Path alias resolution.

Avoid unnecessary dependencies.

### Coverage

Preserve or establish coverage reporting.

Configure:

- Coverage provider.
- Coverage reporters.
- Include/exclude patterns.
- Appropriate thresholds when existing requirements justify them.

Do not arbitrarily lower existing coverage thresholds to make the migration pass.

### Scripts

Establish a consistent testing interface:

```json
{
  "test": "vitest run",
  "test:watch": "vitest",
  "test:coverage": "vitest run --coverage"
}
```

Adapt to the existing project conventions.

### Test migration

If migrating from Jest:

- Replace incompatible APIs.
- Migrate mocks and spies.
- Review module mocking behavior.
- Update setup files.
- Preserve test semantics.
- Verify asynchronous tests.
- Verify fake timers.
- Verify environment-dependent tests.

Do not rewrite tests merely to make them stylistically different.

Prioritize preserving existing test coverage and behavior.

---

# 6. TypeScript Integration

Ensure the new toolchain works correctly with the existing TypeScript configuration.

Verify:

- Path aliases.
- Module resolution.
- ESM/CommonJS compatibility.
- TypeScript version compatibility.
- Build-time and test-time resolution.
- Type declarations.
- Vitest type support.

Preserve the existing type-checking strategy.

If type checking is not already available, introduce an explicit script:

```json
{
  "check-types": "tsc --noEmit"
}
```

Do not assume that successful Oxlint execution means TypeScript compilation is valid.

Do not introduce unnecessary changes to `tsconfig.json`.

---

# 7. Git Hooks and Developer Workflow

Inspect and migrate existing Git hooks.

Preserve existing workflows and their intent.

Typical pre-commit responsibilities:

- Type checking.
- Linting.
- Formatting validation or staged-file formatting.
- Relevant tests.

Example:

```text
check-types
lint
test
```

Consider using lint-staged to avoid processing the entire repository during every commit.

If lint-staged is used:

- Configure appropriate file-specific commands.
- Avoid running the same checks multiple times.
- Ensure formatting modifies only intended files.
- Preserve staged-file behavior.

### Commit hooks

Verify compatibility of:

- Husky.
- lint-staged.
- commitlint.
- Custom Node.js scripts.
- Shell scripts.

Migrate package-manager commands while preserving hook arguments and behavior.

Do not replace working hooks with simplified commands that silently remove existing checks.

---

# 8. Docker and Containerization

Inspect all Docker-related configuration.

Update Dockerfiles and Compose files to support Bun-based package management.

### Requirements

- Use an appropriate official Bun image where necessary.
- Preserve the existing production runtime if it is Node.js.
- Install dependencies reproducibly.
- Use the correct lockfile.
- Preserve dependency caching.
- Preserve environment variables and build arguments.
- Preserve multi-stage build optimization.
- Avoid copying unnecessary development files into production images.
- Preserve application ports and startup commands.

Verify:

- Development container.
- Production container.
- Docker Compose workflows.
- Build context and `.dockerignore`.
- Volume mounts.
- Working directories.
- Dependency installation.
- Application startup.

Do not blindly replace Node.js images with Bun images.

If a Dockerfile uses multi-stage builds, ensure every stage has the appropriate package manager and runtime.

---

# 9. CI/CD Migration

Update all existing CI/CD workflows.

For GitHub Actions, ensure:

- Correct Bun installation.
- Dependency caching.
- Frozen-lockfile installation.
- Correct environment setup.
- Type checking.
- Linting.
- Formatting verification.
- Unit and integration tests.
- Coverage reporting where applicable.
- Production build verification.

Use deterministic dependency installation.

Avoid redundant dependency installations between jobs where caching or artifacts can be used appropriately.

Preserve deployment behavior, secrets, environment variables and existing workflow triggers.

Do not modify unrelated deployment infrastructure.

---

# 10. IDE and Editor Integration

Update editor configuration where necessary.

Inspect:

- VS Code settings.
- Recommended extensions.
- Default formatter.
- Format-on-save behavior.
- ESLint extension dependencies.
- Editor-specific lint integrations.

Ensure developers receive consistent formatting and linting feedback.

Avoid requiring unnecessary editor-specific configuration for the project to function.

---

# 11. Final Package Scripts

Consolidate scripts into a consistent developer interface.

The following is a suggested baseline, not a mandatory literal configuration:

```json
{
  "scripts": {
    "dev": "...",
    "build": "...",
    "start": "...",

    "check-types": "tsc --noEmit",

    "lint": "oxlint .",
    "lint:fix": "oxlint . --fix",

    "format": "oxfmt .",
    "format:check": "oxfmt --check .",
    "pretty": "oxfmt .",

    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage"
  }
}
```

Adapt this configuration to the actual project.

Do not remove useful existing scripts.

Avoid redundant aliases and duplicate checks.

If a script is no longer necessary, explain why before removing it.

---

# 12. Migration Execution Strategy

Perform the migration incrementally.

Use the following phases:

## Phase 1 — Audit and Planning

- Inspect the repository.
- Identify existing tooling.
- Map dependencies and scripts.
- Identify compatibility risks.
- Produce the migration plan.

Do not modify files yet.

## Phase 2 — Bun Migration

- Configure Bun.
- Migrate dependency management.
- Generate the lockfile.
- Update scripts.
- Verify installation and execution.

## Phase 3 — Oxlint and Oxfmt

- Introduce Oxlint.
- Migrate supported lint rules.
- Introduce Oxfmt.
- Preserve formatting conventions.
- Update scripts and editor integration.

## Phase 4 — Vitest

- Configure Vitest.
- Migrate existing tests.
- Preserve setup and mocking behavior.
- Configure coverage.
- Verify test execution.

## Phase 5 — Infrastructure

- Migrate Git hooks.
- Update Docker.
- Update CI/CD.
- Update development documentation.

## Phase 6 — Cleanup

- Remove obsolete dependencies.
- Remove obsolete configuration files.
- Remove obsolete lockfiles.
- Remove outdated scripts.
- Remove stale references to previous tooling.

## Phase 7 — Final Verification

Run the complete validation pipeline.

Verify:

1. Frozen-lockfile dependency installation.
2. Type checking.
3. Linting.
4. Formatting validation.
5. Unit and integration tests.
6. Coverage.
7. Production build.
8. Docker build.
9. Docker Compose development workflow.
10. Git hooks.
11. CI/CD consistency.

Fix migration-related issues before declaring completion.

---

# 13. Strict Execution Rules

Follow these rules throughout the migration:

### Repository integrity

- Do not delete files without verifying their purpose.
- Do not overwrite configuration blindly.
- Do not modify unrelated application logic.
- Do not introduce unnecessary abstractions.
- Do not upgrade unrelated dependencies.
- Do not change application architecture as part of this task.

### Migration safety

- Preserve existing functionality.
- Preserve test coverage.
- Preserve environment-specific behavior.
- Preserve deployment workflows.
- Keep changes focused and reviewable.

### Tool usage

- Prefer official documentation for Bun, Oxlint, Oxfmt and Vitest.
- Verify configuration options against the actual installed versions.
- Do not invent CLI flags or configuration properties.
- Prefer native integrations over unnecessary compatibility packages.
- Do not install multiple tools that solve the same problem.

### Verification

After each phase:

1. Inspect modified files.
2. Check package scripts.
3. Search for obsolete references.
4. Run relevant validation commands.
5. Inspect Git diff.
6. Resolve regressions before proceeding.

Never report a check as successful unless it was actually executed and passed.

If a command cannot be executed because of environmental limitations, explicitly report it.

---

# 14. Final Report

After completing the migration, provide a concise report containing:

### Migration summary
What was migrated and why.

### Dependencies
Added, removed, retained and upgraded dependencies.

### Configuration
All created, modified and removed configuration files.

### Scripts
Final package scripts and their responsibilities.

### Infrastructure
Changes to Docker, Git hooks, CI/CD and IDE configuration.

### Verification
Actual results of:

- Dependency installation.
- Type checking.
- Linting.
- Formatting.
- Tests and coverage.
- Production build.
- Docker build.

### Remaining issues
Unsupported rules, compatibility workarounds, unresolved problems and recommended follow-ups.

### Final assessment
Explain whether the project is fully migrated or which steps remain.

The migration is complete only when the new toolchain works consistently across local development, CI/CD and production build workflows.

**Primary objective: establish a clean, reproducible, modern Bun + Oxlint + Oxfmt + Vitest toolchain without compromising application stability or existing developer workflows.**