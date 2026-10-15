# Strict Feature-Sliced Design Refactoring

Refactor this project toward **strict Feature-Sliced Design (FSD)**.

Your goal is not merely to reorganize folders. The goal is to establish **correct architectural boundaries, dependency direction, ownership, and public APIs** while preserving existing behavior.

## 1. Core FSD Architecture

Use the following layers, from highest to lowest:

```text
src/
├── app/
├── pages/
├── widgets/
├── features/
├── entities/
└── shared/
```

Dependency direction is strictly one-way:

```text
app
 ↓
pages
 ↓
widgets
 ↓
features
 ↓
entities
 ↓
shared
```

A layer may depend only on layers below it.

### Forbidden dependencies

Never introduce dependencies such as:

```text
shared → entities
shared → features
shared → widgets
shared → pages
entities → features
entities → widgets
entities → pages
features → widgets
features → pages
widgets → pages
```

If existing code violates this rule, refactor it instead of preserving the violation.

---

## 2. Layer Responsibilities

### `app`

Application-wide infrastructure and composition:

* application entry point
* routing
* providers
* global configuration
* global styles
* application initialization
* error boundaries
* global state initialization

`app` should compose the application, not contain business functionality.

---

### `pages`

Route-level composition.

Pages should:

* correspond to application routes/screens
* compose widgets, features and entities
* contain minimal business logic
* avoid reusable domain logic

A page should primarily answer:

> "What is displayed on this route?"

Do not place generic reusable UI or domain logic directly in `pages`.

---

### `widgets`

Large self-contained UI blocks composed from lower layers.

Examples:

```text
Header
Sidebar
ProductDetails
CheckoutSummary
UserProfile
OrderHistory
```

Widgets may compose:

* entities
* features
* shared UI

Widgets should not contain functionality that belongs to a reusable feature.

---

### `features`

User actions or business interactions that deliver a distinct capability.

Examples:

```text
auth
add-to-cart
edit-profile
change-password
create-order
search-products
filter-products
```

A feature should represent an action/use case rather than merely a UI component.

Avoid creating features for trivial components that do not represent meaningful user/business functionality.

---

### `entities`

Business/domain concepts.

Examples:

```text
user
product
order
cart
account
payment
```

Entities may contain:

* domain models/types
* entity-specific API logic
* entity state
* entity-specific UI
* selectors
* transformations

Entities should describe **what something is**, not **what the user does with it**.

---

### `shared`

Generic infrastructure with no business/domain knowledge.

Examples:

```text
shared/
├── ui/
├── lib/
├── api/
├── config/
├── routes/
├── assets/
└── types/
```

Shared code must be reusable without knowing anything about application-specific business entities.

### Strict rule

If a module contains business terminology such as:

```text
Product
Order
User
Cart
Checkout
Payment
```

question whether it actually belongs in `shared`.

Do not use `shared` as a dumping ground.

---

# 3. Slices and Segments

Each layer except `shared` should be organized into **slices**.

Example:

```text
entities/
└── product/
    ├── ui/
    ├── model/
    ├── api/
    └── index.ts

features/
└── add-to-cart/
    ├── ui/
    ├── model/
    ├── api/
    └── index.ts

widgets/
└── product-details/
    ├── ui/
    ├── model/
    └── index.ts
```

Segments should describe technical responsibility:

```text
ui/
model/
api/
lib/
config/
```

Do not create unnecessary segments merely to satisfy a folder convention.

---

# 4. Public API / Barrel Rules

Every slice must expose a controlled public API.

Example:

```ts
// entities/product/index.ts

export { ProductCard } from "./ui/ProductCard";
export { useProduct } from "./model/useProduct";
export type { Product } from "./model/types";
```

Consumers should import through the slice public API:

```ts
import { ProductCard } from "@/entities/product";
```

Do not import internal implementation details:

```ts
// forbidden
import { ProductCard } from "@/entities/product/ui/ProductCard";
```

Apply this rule consistently.

### Important

Do not create barrels blindly.

A public API should expose only what consumers are actually allowed to use.

Avoid exporting internal helpers, implementation details, or unstable internals.

---

# 5. Business Logic Placement

When deciding where code belongs, use this reasoning:

### `shared`

Generic and domain-independent.

```text
formatDate()
debounce()
Modal
Button
HTTP client
localStorage wrapper
```

### `entities`

Describes a domain object.

```text
Product
ProductCard
Product API
Product model
```

### `features`

Represents an action/use case.

```text
AddToCart
UpdateProfile
Login
CreateOrder
```

### `widgets`

Combines multiple pieces into a meaningful UI block.

```text
ProductDetails
CheckoutForm
AccountDashboard
```

### `pages`

Composes the route.

```text
ProductPage
CheckoutPage
AccountPage
```

---

# 6. Avoid False FSD

Do not force every existing component into an arbitrary FSD layer.

Do NOT create structures such as:

```text
features/
└── button/
```

or:

```text
entities/
└── form/
```

simply because the component exists.

Classify code according to **architectural responsibility**, not its current filename.

If something is generic, it belongs in `shared`.

If something represents a domain concept, it belongs in `entities`.

If something represents a meaningful user/business action, it belongs in `features`.

If something composes several pieces into a substantial UI block, it belongs in `widgets`.

---

# 7. Cross-Slice Dependencies

Slices within the same layer must not depend on each other directly when this creates architectural coupling.

For example:

```text
features/A → features/B
```

should generally be avoided.

Instead, extract shared functionality into an appropriate lower layer or reconsider the ownership.

Do not solve architectural problems by creating circular dependencies.

---

# 8. Circular Dependencies

The refactored architecture must not introduce circular dependencies.

Pay particular attention to:

```text
barrel exports
index.ts files
hooks
state management
API modules
types
UI components
```

If a circular dependency already exists, resolve it as part of the refactoring where practical.

---

# 9. Aliases and Imports

Prefer the project's configured path aliases:

```ts
import { Button } from "@/shared/ui";
import { Product } from "@/entities/product";
```

Avoid unnecessary deep relative imports across slices:

```ts
../../../entities/product/...
```

Do not change the project's alias configuration unless necessary.

---

# 10. State Management

Place state according to its ownership.

### Global application state

```text
app
```

Only when truly application-wide.

### Entity state

```text
entities/<entity>/model
```

When the state describes a domain entity.

### Feature state

```text
features/<feature>/model
```

When state belongs to a specific user interaction/use case.

### Local UI state

Keep it close to the component when possible.

Do not move every piece of state into global stores merely to make the architecture look "clean".

---

# 11. API / Data Access

Keep data access close to the domain that owns it.

For example:

```text
entities/product/api/
entities/order/api/
```

Generic infrastructure such as HTTP clients may live in:

```text
shared/api/
```

Do not put business-specific API calls into `shared/api`.

---

# 12. Types

Types should live with the code that owns them.

Prefer:

```text
entities/product/model/types.ts
```

over:

```text
shared/types/product.ts
```

unless the type is genuinely cross-domain and generic.

Do not create a giant global:

```text
shared/types/
```

directory containing domain-specific types.

---

# 13. Refactoring Strategy

Before changing code:

1. Inspect the repository structure.
2. Identify the framework and entry points.
3. Identify routing.
4. Identify major domain concepts.
5. Identify existing business features.
6. Identify shared infrastructure.
7. Trace important dependencies and imports.
8. Identify architectural violations.
9. Create a proposed FSD mapping.
10. Only then start modifying files.

Do not start by blindly moving folders.

---

# 14. Preserve Behavior

The refactoring must preserve existing behavior.

Do not unnecessarily change:

* business logic
* UI behavior
* API contracts
* state semantics
* validation rules
* routing behavior
* styling
* user-facing text
* performance characteristics

Unless required to resolve an architectural issue, behavior should remain unchanged.

---

# 15. Minimize Unrelated Changes

Do not:

* rewrite working code for stylistic reasons
* upgrade dependencies
* change frameworks
* redesign UI
* rename unrelated variables
* reformat the entire repository
* introduce new libraries
* rewrite components unnecessarily

Make the smallest reasonable changes required to establish the architecture.

---

# 16. Handling Ambiguous Ownership

When ownership is unclear, analyze:

1. Who uses the code?
2. What domain concepts does it know?
3. Is it an entity, action, composition, or infrastructure?
4. Can it exist without business/domain knowledge?
5. Which layer should own the behavior?
6. Would moving it create an illegal dependency?

Do not guess based solely on filenames.

If multiple placements are possible, prefer the one that creates the **least coupling and lowest architectural layer capable of owning the responsibility**.

---

# 17. Refactoring Order

Prefer this order:

```text
1. shared
2. entities
3. features
4. widgets
5. pages
6. app
```

However, adapt the order when dependency constraints require it.

After each significant migration:

1. update imports
2. verify public APIs
3. search for stale imports
4. check circular dependencies
5. run available type checks/tests/lint

---

# 18. Verification

Before considering the refactoring complete, verify:

### Architecture

* [ ] Layers follow dependency direction.
* [ ] No illegal upward dependencies exist.
* [ ] No unnecessary same-layer slice dependencies exist.
* [ ] No circular dependencies were introduced.
* [ ] `shared` contains no business-specific code.
* [ ] Domain logic is not hidden inside `pages` or `widgets`.

### Public APIs

* [ ] Slices expose explicit public APIs.
* [ ] Consumers do not import slice internals.
* [ ] Unnecessary exports were removed.

### Code quality

* [ ] TypeScript passes.
* [ ] Lint passes.
* [ ] Tests pass where available.
* [ ] No stale imports remain.
* [ ] No dead files remain after migration.

### Behavior

* [ ] Existing functionality remains intact.
* [ ] Routes still work.
* [ ] API interactions remain intact.
* [ ] UI behavior remains intact.

---

# 19. Important Constraints

Do not declare the project "FSD-compliant" merely because the folders look like:

```text
app/
pages/
widgets/
features/
entities/
shared/
```

FSD compliance is primarily about:

* dependency direction
* ownership
* boundaries
* public APIs
* domain isolation
* controlled composition

The architecture must be correct **semantically**, not just visually.

---

# 20. Execution Mode

Work incrementally.

First provide a concise architectural analysis containing:

```text
Current structure
Major domains
Existing features
Major architectural violations
Proposed FSD structure
Migration order
Potential risks
```

Do not modify files during this analysis phase.

After the plan is established, perform the refactoring in small logical batches.

After each batch, verify the result before continuing.

If a migration would require a large speculative rewrite, stop and reassess the ownership boundaries instead of guessing.

The final result should be a **strict, practical FSD architecture**, not merely a folder rearrangement.
