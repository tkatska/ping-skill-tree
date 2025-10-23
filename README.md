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
  loom_video: "https://www.loom.com/share/82f6cd0a3249450d88f168b145fd1ff3"
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
### Project Structure

```yaml
apps:
  web: # Main React front-end
    public: # Static assets
    src:
      assets: # Icons, images, and SVGs
      components: # Reusable UI components
        AddNodeDialog.tsx: Form modal for adding new nodes
        Legend.tsx: Color legend for locked/unlocked nodes
        NodeCard.tsx: Individual skill node display
        SkillCanvas.tsx: Core React Flow canvas
        Toolbar.tsx: Top controls (add node, reset, etc.)
      styles: # Tailwind + global styles
        - App.css
        - index.css
        - tailwind.css
      App.tsx: Root shell (semantic layout)
      main.tsx: Application entry point
    tests: # Vitest + RTL tests
      - smoke.spec.tsx
      - SkillCanvas.spec.tsx
    eslint.config.js: Linting configuration
    vite.config.ts: Vite + JSDOM test environment
    tsconfig.json: TypeScript configuration
packages:
  core: # Shared logic and utilities
    src:
      reducer.ts: State reducer logic
      schema.ts: Data schema definitions
      selectors.ts: Graph selectors
      storage.ts: LocalStorage utilities
      types.ts: Shared TypeScript types
      validators.ts: Validation helpers
    tests: # Unit tests for core logic
      - reducer.spec.ts
      - validators.spec.ts
config:
  - netlify.toml: Deployment configuration
root:
  - package.json
  - package-lock.json
  - tsconfig.base.json
  - .prettierrc
  - .prettierignore
  - .gitignore
  - README.md
```

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

