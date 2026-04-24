# Simple Slip Trainer

A web-based boxing training tool for practicing slip movements — a fundamental defensive technique used to evade punches.

## What is a Slip?

A slip is a defensive movement where a boxer rotates the head and body off the line of attack, allowing a punch to pass by while remaining in position to counter. This trainer helps boxers develop muscle memory and timing for slip movements.

## Features

- **Stopwatch** — Track training duration
- **Rate Counter** — Monitor slips per minute
- **Visual Sectors** — Target areas for slip practice
- **Expandable Controls** — Customizable training interface

## Tech Stack

- **Framework**: Next.js
- **Language**: TypeScript
- **Styling**: CSS Modules
- **State Management**: Zustand
- **Testing**: Jest + React Testing Library

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Running Tests

```bash
pnpm test
```

## Project Structure

```
src/
├── app/           # Next.js pages
├── components/    # Shared UI components
├── features/     # Feature modules
│   └── trainer/  # Core training feature
├── hooks/        # Shared React hooks
└── utils/        # Utility functions
```
