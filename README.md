# ===============================
# 📘 Skill Tree Builder
# ===============================
name: Skill Tree Builder
description: >
  A front-end project built for the Platform UI Software Engineering challenge.
  The app lets users build a skill dependency tree visually using React Flow.
  It demonstrates interactive UI patterns, modular architecture, and clean state management.

# -------------------------------
# 🎥 Demo
# -------------------------------
demo:
  loom_video: "https://www.loom.com/share/9803d2e70c2241259bef37873846607b"
  highlights:
    - Adding a new skill node
    - Preventing circular dependencies
    - Checking localStorage data persistence
    - Verifying Lighthouse accessibility & performance

# -------------------------------
# 🧱 Tech Stack
# -------------------------------
tech_stack:
  - React 19 + TypeScript
  - Vite (modern build tool)
  - Tailwind CSS 4
  - React Flow (graph visualization)
  - Vitest + React Testing Library (unit testing)
  - ESLint + Prettier (linting & formatting)
  - Netlify (deployment)

# -------------------------------
# ⚙️ Setup & Run Locally
# -------------------------------
setup:
  steps: |
    ```bash
    # install dependencies
    npm install

    # start development server
    npm run dev

    # run tests
    npm run test
    ```

  local_url: "http://localhost:5173"

# -------------------------------
# 🧩 Project Structure
# -------------------------------
structure: |
  apps/
    └── web/                   # Main React front-end
        ├── public/            # Static assets
        ├── src/
        │   ├── assets/        # Icons, images
        │   ├── components/    # Reusable UI components
        │   │   ├── AddNodeDialog.tsx
        │   │   ├── SkillCanvas.tsx
        │   │   ├── NodeCard.tsx
        │   │   ├── Toolbar.tsx
        │   │   └── Legend.tsx
        │   ├── styles/        # Tailwind + global CSS
        │   │   └── tailwind.css
        │   ├── tests/         # Vitest + RTL tests
        │   │   ├── smoke.spec.tsx
        │   │   └── addNodeDialog.esc.spec.tsx
        │   ├── App.tsx        # Root shell (semantic header + main)
        │   ├── main.tsx       # Entry point
        │   └── index.css      # Base imports
        ├── vite.config.ts     # Vite + JSDOM test env config
        ├── eslint.config.js   # Modern ESLint setup
        ├── tsconfig.json      # TypeScript config
        └── README.md
  packages/
    └── core/                  # Shared logic (reducer, storage, types)

# -------------------------------
# 🧠 Design Decisions
# -------------------------------
design_decisions:
  - Controlled React Flow instance — state managed by reducer; React Flow mirrors props for instant updates.
  - Cycle prevention — graph helpers detect and block circular edges.
  - Keyboard accessibility — ESC key closes dialogs and restores focus.
  - Semantic layout — uses <header> and <main> for accessibility.
  - Persistence layer — debounced localStorage autosave.
  - Type safety — strongly typed SkillState, Node, and Edge models.

# -------------------------------
# 🧪 Testing
# -------------------------------
testing:
  framework: Vitest + React Testing Library
  main_tests:
    - ESC key closes Add Skill dialog
    - Smoke test for initial render
    - Validation preventing circular or duplicate edges
  command: "npm run test:ui"

# -------------------------------
# 📁 Folder Summary
# -------------------------------
folders:
  - components: Core React components (fully typed, isolated)
  - core: Reducer, shared logic, and data models
  - tests: Vitest + RTL test coverage
  - styles: Tailwind and base CSS
  - dist: Production build output (ignored by Git)

# -------------------------------
# 💡 Why This Architecture
# -------------------------------
architecture_reasons:
  - Clarity: separation between UI and logic layers
  - Testability: isolated reducer and component logic
  - Scalability: monorepo-friendly layout
  - Maintainability: modern ESLint + Prettier setup
  - Accessibility: semantic structure and keyboard support

# -------------------------------
# 🧑‍💻 Author
# -------------------------------
author:
  name: "Olga Tkatska"
  title: "Frontend Engineer"
  skills: ["React", "TypeScript", "UI Systems", "Accessibility"]
  contact: "github.com/tkatska"
