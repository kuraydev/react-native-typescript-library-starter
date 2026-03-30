# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.1.0] - 2026-03-30

### Added

- **Interactive setup wizard** (`npm run setup`) — walks through package name, description, GitHub username/repo, author, license, and keywords one by one with live validation, shows a full preview before writing, then updates `package.json`, `README.md`, `AGENTS.md`, and `CONTRIBUTING.md` in one go
- `prompts` added to `devDependencies` to power the wizard

### Fixed

- **Husky v9 migration** — removed deprecated `#!/usr/bin/env sh` + `. "$(dirname -- "$0")/_/husky.sh"` lines from both `.husky/pre-commit` and `.husky/commit-msg` (they will hard-fail in v10)
- `pre-commit` hook now correctly delegates to `npx lint-staged` instead of running lint/prettier directly
- `commit-msg` hook now passes `$1` to `commitlint --edit` as required
- `prepare` script updated from `husky install` → `husky` (the v9 API)
- `husky:setup` simplified — `husky add` was removed in v9; hooks are plain files

---

## [2.0.0] - 2026-03-30

### Changed (Breaking)

- Migrated build system to `react-native-builder-bob` (dual CJS/ESM output)
- Renamed source directory from `lib/` to `src/`
- `main` now points to `lib/commonjs/index.js` (was `build/dist/index.js`)
- Added `module` and `types` fields to `package.json`
- Added `exports` map for proper ESM/CJS resolution

### Added

- Complete TypeScript strict-mode example component (`MyComponent`)
- Complete typed custom hook example (`useMyHook`) with bounded counter logic
- Full test suite with `@testing-library/react-native`
- `AGENTS.md` — AI agent instructions and project context
- `.cursor/rules/library-conventions.mdc` — Cursor AI rules
- `babel.config.js` — metro-react-native-babel-preset for Jest
- `tsconfig.build.json` — bob-specific build configuration
- `.releaserc.json` — semantic-release configuration
- `.github/workflows/ci.yml` — dedicated CI pipeline (typecheck + lint + test + build)
- `lint-staged` configuration in `package.json`
- `chalk` and `ora` added to `devDependencies` (were missing despite being used in scripts)
- `typecheck`, `test`, `test:watch`, `test:coverage`, `lint:ci`, `prettier:ci` scripts
- `LICENSE` file
- `CONTRIBUTING.md`

### Fixed

- GitHub Actions updated from v2 to v4
- `lint-staged` now correctly configured (was installed but unused)
- `cpx` dependency removed (bob handles asset copying)
- Version mismatch between `package.json` and `package-lock.json`
