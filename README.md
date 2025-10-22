# ===============================
# 📘 Skill Tree Builder
# ===============================
name: Skill Tree Builder
description: >
  A front-end project built for the Platform UI Software Engineering challenge.
  The app lets users build a skill dependency tree visually using React Flow.
  It demonstrates interactive UI patterns, modular architecture, and clean state management.

### Demo
demo:
  loom_video: "https://www.loom.com/share/9803d2e70c2241259bef37873846607b"
  highlights:
    - Adding a new skill node
    - Preventing circular dependencies
    - Checking localStorage data persistence
    - Verifying Lighthouse accessibility & performance

### Tech Stack
tech_stack:
  - React 19 + TypeScript
  - Vite (modern build tool)
  - Tailwind CSS 4
  - React Flow (graph visualization)
  - Vitest + React Testing Library (unit testing)
  - ESLint + Prettier (linting & formatting)
  - Netlify (deployment)

### Setup & Run Locally
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

### Project Structure
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

### Key Concepts
- **Controlled React Flow instance:**  
  State is managed via a reducer; React Flow mirrors props for smooth interactions.
- **Cycle prevention:**  
  Custom graph helpers detect and block circular dependencies.
- **Keyboard accessibility:**  
  ESC key closes dialogs with focus restoration.
- **Semantic HTML:**  
  Header and main regions improve structure and Lighthouse accessibility.
- **Persistence layer:**  
  LocalStorage autosaves via a debounced effect for instant state recovery.
- **Type safety:**  
  Fully typed SkillState, Node, and Edge models ensure robustness.

### Testing & Quality
- **Vitest + React Testing Library**: covers happy path interactions  
  → Smoke test, Add Node dialog, keyboard ESC behavior  
- **ESLint + Prettier**: consistent code style and CI formatting checks  
- **Lighthouse audit**: verified for accessibility, performance, and PWA readiness  
- **Pre-commit safety**: local lint/test pass required before push  

### CI/CD & Deployment
- Built with **Vite** and TypeScript  
- Auto-deployed via **Netlify** on each push to `main`  
- Node version pinned via `netlify.toml` for environment consistency  
- Build output: `/apps/web/dist`

### Future Improvements
- Replace alert() with a custom toast system for better UX  
- Add drag-to-connect edge hints and keyboard navigation for graph  
- Include dark mode toggle and theme persistence  
- Expand unit tests for reducer edge cases  

**Author:** Olga Tkatska  
📦 Repo: [ping-skill-tree](https://github.com/tkatska/ping-skill-tree)  
🌍 Live: [https://ping-skill-tree.netlify.app](https://ping-skill-tree.netlify.app)

