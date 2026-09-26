# Last.fm dashboard

A React dashboard for Last.fm listening history, top artists and albums, and listening charts. Built with React 17, TypeScript, Create React App, and CRACO.

## First-time setup

Use Node **24.21.0**, pinned in `.nvmrc`.

```powershell
nvm install 24.21.0
nvm use 24.21.0
npm.cmd ci
Copy-Item .env.example .env.local
```

If Node is already installed, skip `nvm install`. On Windows, `npm.cmd` works even when PowerShell blocks `npm.ps1`; other shells can use `npm`.

The checked-in `.npmrc` enables legacy peer dependency resolution for the existing dependency tree. Installation automatically runs the React Spring patch used by the charts. No deployment runs during installation.

Fill in `.env.local` with your existing API keys:

| Variable | Used for |
| --- | --- |
| `REACT_APP_LAST_FM_KEY` | Last.fm profile and listening data |
| `REACT_APP_FANART_KEY` | Artist artwork from Fanart.tv |

`.env.local` is ignored by Git. React embeds these values in the browser bundle, so they must not be private server credentials. Restart the development server after changing them.

```powershell
npm.cmd run dev
```

Open http://localhost:3000. The page reloads when source files change.

Some charts also use `https://musicapi.shicks255.com/api/v1`, currently configured in `src/utils.ts`. That backend must be reachable for those features. This repository contains the frontend only.

## Checks

### Editor setup

VS Code workspace settings enable Prettier formatting and ESLint automatic fixes on explicit save (`Ctrl+S`). Install the recommended **Prettier - Code formatter** and **ESLint** extensions when prompted. Formatting uses the project's local Prettier version and `.prettierrc.json`; ESLint uses `.eslintrc.json` and reports remaining issues in the Problems panel as you type. Rules without automatic fixes still need manual changes.

If an already-open editor does not pick up the settings, run **Developer: Reload Window** from the Command Palette.

### Command-line checks

```powershell
npm.cmd run typecheck
npm.cmd run lint
npm.cmd run lint:style
npm.cmd run test:ci
npm.cmd run build
```

`test:ci` runs tests once with coverage and enforces the existing coverage thresholds. `npm.cmd test` runs the interactive test watcher. The production build is written to `build/`.

## Maintenance notes

- The current CRACO package declares React Scripts 4 compatibility, while this app uses React Scripts 5. Legacy peer resolution preserves the existing installation; aligning or replacing the build tooling is a follow-up task.
- The existing tests include skipped cases, and code linting currently reports warnings. A passing test run does not verify live API availability.
- `npm.cmd run patch` can reapply the React Spring workaround if dependencies were installed with scripts disabled.
