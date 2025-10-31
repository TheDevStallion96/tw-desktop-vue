# TW Desktop App

An Electron desktop application built with Vue.js 3, Vite, and Tailwind CSS v4.

## Project Structure

- **Electron Main Process:** `./src/main/`
- **Vue.js Renderer:** `./src/renderer/`

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

Start the Electron app with hot-reload:

```bash
npm run dev:electron
```

This will:

1. Build the main process
2. Start the Vite dev server at http://localhost:5173
3. Launch Electron with developer tools open

### Building for Production

Build the Vue.js renderer:

```bash
npm run build
```

Build the complete Electron app:

```bash
npm run build:electron
```

Distributable packages will be created in the `release/` directory.

### Code Quality

The project includes ESLint and Prettier for code quality and formatting:

```bash
# Run ESLint to check for code issues
npm run lint

# Auto-fix ESLint issues
npm run lint:fix

# Check code formatting
npm run format:check

# Auto-format all files
npm run format

# Run both linting and format checks
npm run check
```

**VS Code Integration:**

The project includes VS Code settings for automatic formatting on save and ESLint integration. Install the recommended extensions:

- ESLint (`dbaeumer.vscode-eslint`)
- Prettier (`esbenp.prettier-vscode`)
- Vue Language Features (`Vue.volar`)

## Technology Stack

- **Electron** - Desktop app framework
- **Vue.js 3** - UI framework with Composition API
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling via Vite plugin

## Architecture

The app follows Electron's multi-process architecture:

- **Main Process** (Node.js): Manages app lifecycle and native features
- **Renderer Process** (Chromium): Runs the Vue.js UI
- **Preload Script**: Secure bridge between main and renderer via `contextBridge`

See `.github/copilot-instructions.md` for detailed architecture documentation.
