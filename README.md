# 🥊 Simple Slip Trainer

A small, fun side project — a web-based boxing trainer designed to help you practice **slip movements**, one of the most essential defensive skills in boxing.

> Built for learning, experimenting, and enjoying the craft of both boxing and frontend development.

---

## 🧠 What is a Slip?

A **slip** is a defensive technique where a boxer subtly rotates the head and upper body off the center line to avoid an incoming punch — while staying in position to counter.

This trainer is designed to help build:

- Muscle memory
- Reaction timing
- Movement rhythm

---

## ✨ Features

- 🥊 **Training Modes**
  - **Random Singles:** Randomized directional punches with rate-based cadence.
  - **Combinations:** Predefined realistic boxing combinations (Jab–Cross, Double Jab, Jab–Cross–Hook, Mailman, Alternating Straights, etc.) with explicit upper/lower punch targeting.
  - **Mixed Mode:** Seamlessly alternates between single punches and complete combinations with natural rhythm delays.

- ⏱ **Stopwatch**
  Track your training sessions in real time

- 📊 **Rate Counter & Scaled Playback**
  Adjustable punches-per-minute cadence dynamically scales combination and punch timing

- 🎯 **Visual Sectors**
  Clear visual pixel-art cues for practicing directional slips across upper and lower straight and hook variants

- ⚙️ **Expandable Controls & Mode Selector**
  Quickly toggle training modes and adjust cadence to fit your routine

- 🔍 **Development Logging**
  Real-time console logger in development mode indicating active combos and punch sequences

---

## 🚀 Tech Stack

- **Architecture**: Feature-Sliced Design (FSD)
- **Framework**: Next.js
- **Language**: TypeScript
- **Styling**: CSS Modules
- **State Management**: Zustand
- **Testing**: Jest + React Testing Library

---

## 🛠 Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Then open: http://localhost:3000

---

## 🧪 Running Tests

```bash
pnpm test
```

---

## 📁 Project Structure

Organized according to **Feature-Sliced Design (FSD)**:

```text
src/
├── app/                  # Application entry point, global styles, and route entries
├── pages/                # Route-level page compositions (TrainerPage)
├── widgets/              # Composite UI blocks (Controls header, Sectors board)
├── features/             # User actions & interactions (adjust-rate, manage-stopwatch, select-mode)
├── entities/             # Business domain models & stores (combination, sector, session)
└── shared/               # Domain-agnostic primitives (ui components, lib hooks & utils)
```

---

## 🎯 Project Goals

This project is intentionally simple and focused. It exists to:

- Explore interactive UI patterns
- Practice clean, scalable frontend architecture (Feature-Sliced Design)
- Experiment with lightweight state management
- Build something a bit more _fun_ than typical CRUD apps

---

## ⚠️ Disclaimer

This is a **demo / hobby project**.
It’s not intended to replace real boxing training or coaching.

---

## 📜 Usage & License

This project is shared for demonstration purposes.

- You’re welcome to explore and learn from the code
- Small snippets can be reused with proper attribution
- Redistribution or commercial use requires permission

For inquiries or permissions:
👉 https://www.linkedin.com/in/ihor-tkachenko-fe-dev/
