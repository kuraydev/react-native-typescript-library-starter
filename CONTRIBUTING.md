# Contributing

Thank you for your interest in contributing to this library starter.

---

## Development Setup

```bash
# 1. Clone the repository
git clone https://github.com/WrathChaos/react-native-typescript-library-starter.git
cd react-native-typescript-library-starter

# 2. Install dependencies
npm install

# 3. Set up git hooks (runs automatically via the prepare script above)
npm run husky:setup
```

---

## Available Scripts

| Script                  | Description                 |
| ----------------------- | --------------------------- |
| `npm run build`         | Build library to `lib/`     |
| `npm run typecheck`     | Type-check without emitting |
| `npm run lint`          | Run ESLint with fix         |
| `npm run prettier`      | Format code                 |
| `npm test`              | Run all tests               |
| `npm run test:watch`    | Run tests in watch mode     |
| `npm run test:coverage` | Run tests with coverage     |

---

## Project Structure

See [AGENTS.md](AGENTS.md) for a complete directory map, conventions, and rules.

---

## Commit Message Format

This project uses [Conventional Commits](https://www.conventionalcommits.org/). Every commit message must follow this format:

```
<type>(<optional scope>): <description>
```

### Allowed types

| Type       | When to use                                         |
| ---------- | --------------------------------------------------- |
| `feat`     | A new feature                                       |
| `fix`      | A bug fix                                           |
| `perf`     | A performance improvement                           |
| `refactor` | Code change that is neither a bug fix nor a feature |
| `style`    | Formatting, whitespace, missing semicolons          |
| `test`     | Adding or fixing tests                              |
| `docs`     | Documentation changes                               |
| `ci`       | CI/CD configuration changes                         |
| `chore`    | Build process or tooling changes                    |
| `revert`   | Reverts a previous commit                           |

### Examples

```
feat: add PressableCard component
fix: correct accessibility role on TouchableOpacity
test: add boundary tests for useMyHook
docs: add @example tags to MyComponent props
chore: upgrade react-native-builder-bob
```

The commit message header is limited to **150 characters**.

---

## Pull Request Process

1. Create a feature branch: `git checkout -b feat/my-feature`
2. Make your changes following the conventions in [AGENTS.md](AGENTS.md).
3. Add or update tests for your changes.
4. Ensure all checks pass locally:
   ```bash
   npm run typecheck && npm run lint:ci && npm test
   ```
5. Open a pull request against `main`.

---

## Adding a New Component

1. Create `src/components/NewComponent/NewComponent.types.ts`
2. Create `src/components/NewComponent/NewComponent.tsx`
3. Create `src/components/NewComponent/index.ts`
4. Add tests to `src/__tests__/NewComponent.test.tsx`
5. Export from `src/index.ts`

## Adding a New Hook

1. Create `src/hooks/useNewHook.ts`
2. Add tests to `src/__tests__/useNewHook.test.ts`
3. Export from `src/index.ts`

---

## Code Style

- TypeScript strict mode — no `any`.
- Use `import type` for type-only imports.
- Every exported API needs full TSDoc with `@example` tags.
- `StyleSheet.create()` only — no inline style objects.

---

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
