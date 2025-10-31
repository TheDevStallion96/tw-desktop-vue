# Copilot Instructions - TW Desktop App

## Architecture Overview

This is an **Electron desktop application** with a **Vue.js 3** frontend, using **Vite** as the build tool and **Tailwind CSS v4** for styling.

**Critical separation of concerns:**

- `src/main/` - Electron main process (Node.js environment, uses CommonJS `require`)
- `src/renderer/` - Vue.js renderer process (browser environment, uses ES modules `import`)

The main process (`src/main/index.ts`) creates browser windows and loads `index.html`, which mounts the Vue app from `src/renderer/main.ts`.

## Key Technical Decisions

### Module Systems

- **Main process files use CommonJS** (`require()`, `module.exports`) - see `src/main/index.ts`
- **Renderer process uses ES modules** (`import`/`export`) - see `src/renderer/main.ts`
- This is intentional for Electron compatibility; do not convert main process to ESM

### TypeScript Configuration

- **Split config approach**: `tsconfig.json` references `tsconfig.app.json`, `tsconfig.node.json`, and `tsconfig.main.json`
- `tsconfig.app.json` - Renderer code (Vue, strict DOM typings)
- `tsconfig.node.json` - Build tools only (Vite config)
- `tsconfig.main.json` - Main process (CommonJS output, loose for Node.js compatibility)
- Main process compiles to `.cjs` files to coexist with `"type": "module"` in package.json

### Styling

- **Tailwind CSS v4** via `@tailwindcss/vite` plugin (newer approach, not PostCSS)
- Import styles in `src/renderer/main.ts` as `import './assets/css/style.css'`
- Vue components can use scoped styles alongside Tailwind utilities

### Routing

- **Vue Router 4** with hash-based history (`createWebHashHistory`)
- Hash-based routing is required for Electron (no server-side routing)
- Routes defined in `src/renderer/router/index.ts`
- Views (page components) go in `src/renderer/views/`
- Use `<router-link>` in components and `<router-view>` in App.vue

## Development Workflow

### Running the App

```bash
npm run dev:electron # Start full Electron app with Vite dev server (recommended)
npm run dev          # Start Vite dev server only (renderer preview)
npm run build        # Build Vue app with type checking
npm run preview      # Preview production build
```

**Dev mode specifics:**

- `dev:electron` builds main process, starts Vite dev server, waits for it, then launches Electron
- Main process loads from `http://localhost:5173` in development
- Dev tools open automatically in development mode
- Changes to renderer code hot-reload via Vite HMR
- Changes to main process require full app restart

### Building for Distribution

```bash
npm run build:main     # Compile main process TypeScript to CommonJS .cjs files
npm run build:electron # Build everything and create distributable packages
```

**Build configuration:**

- Main process compiles to `dist/main/*.cjs` (CommonJS, required due to `"type": "module"` in package.json)
- Renderer builds to `dist/renderer/` with base path `./` for Electron
- electron-builder config in `package.json` under `build` key
- Output packages go to `release/` directory

## Project Structure Conventions

### Component Organization

```
src/renderer/
├── components/
│   ├── HelloWorld.vue
│   └── layout/
│       ├── AppHeader.vue     # Header with app title and actions
│       └── AppSidebar.vue    # Navigation sidebar with router-link
├── views/                    # Route views (pages)
│   ├── Dashboard.vue
│   ├── Projects.vue
│   └── Settings.vue
└── router/
    └── index.ts              # Vue Router configuration
```

- **Layout components** go in `components/layout/`
- **Page components** (route views) go in `views/`
- Use `<script setup lang="ts">` syntax for all Vue components
- Props use `defineProps<{ ... }>()` with TypeScript interfaces
- Layouts use Tailwind utility classes with dark theme (gray-900/gray-800 palette)

### Asset Management

```
src/renderer/assets/
├── css/         # Global styles
├── images/      # Image assets
└── svgs/        # SVG icons
```

## IPC Communication Pattern

The preload script (`src/main/preload.ts`) uses `contextBridge` to expose safe APIs:

**Current implementation:**

```typescript
// preload.ts
contextBridge.exposeInMainWorld("electron", {
  versions: {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
  },
});
```

**Usage in renderer:**

```typescript
// Type definitions in src/renderer/types/electron.d.ts
if (window.electron) {
  const version = window.electron.versions.electron();
}
```

- Always use `contextBridge.exposeInMainWorld()` to expose APIs
- Never enable `nodeIntegration` in `webPreferences`
- Type definitions for exposed APIs go in `src/renderer/types/electron.d.ts`

## Common Patterns

### Adding New Vue Components

1. Create in `src/renderer/components/` (or `layout/` subdirectory)
2. Use `<script setup lang="ts">` with TypeScript
3. Import in parent components or `App.vue`

### Adding Main Process Features

1. Extend `src/main/index.ts` with new Electron APIs
2. Keep using CommonJS syntax (`require()`)
3. Expose to renderer via preload script using `contextBridge`

### Working with Tailwind

- Tailwind v4 uses `@tailwindcss/vite` plugin (configured in `vite.config.ts`)
- No `tailwind.config.js` needed unless customizing (v4 convention)
- Apply utilities directly in Vue templates or use `@apply` in scoped styles

### Adding New Routes

1. Create view component in `src/renderer/views/`
2. Add route definition in `src/renderer/router/index.ts`
3. Add navigation link in `AppSidebar.vue` using `<router-link>`
4. Use lazy loading for routes: `component: () => import('../views/MyView.vue')`
