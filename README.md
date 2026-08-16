# 📦 React Native TypeScript Library Starter

[![CI](https://github.com/WrathChaos/react-native-typescript-library-starter/actions/workflows/ci.yml/badge.svg)](https://github.com/WrathChaos/react-native-typescript-library-starter/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/react-native-typescript-library-starter.svg?style=for-the-badge)](https://www.npmjs.com/package/react-native-typescript-library-starter)
[![npm downloads](https://img.shields.io/npm/dt/react-native-typescript-library-starter.svg?style=for-the-badge)](https://www.npmjs.com/package/react-native-typescript-library-starter)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Platform](https://img.shields.io/badge/platform-Android%20%7C%20iOS-blue.svg?style=for-the-badge)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6.svg?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

A modern, production-ready starter for building React Native TypeScript libraries. Ships with dual CJS/ESM output, full test coverage, and AI-ready project conventions out of the box.

---

## 🆕 What's new in 3.0

- ⚡ **Modern toolchain** — React Native 0.87 / React 19 dev environment, TypeScript 5.9 with `bundler` module resolution
- 🦀 **oxlint + oxfmt** — Rust-based linting and formatting replace ESLint + Prettier (lints the whole repo in milliseconds)
- 📦 **builder-bob 0.43** — ESM-enabled dual CJS/ESM output with per-condition type declarations and a spec-correct `exports` map
- 🧪 **RNTL v14** — tests migrated to the async `render`/`renderHook` API on the universal test renderer
- 🧙 **Interactive setup wizard** — `npm run setup` configures name, author, repo URLs, license, and keywords in one pass
- 🪝 **Husky v9** — git hooks install automatically on `npm install`

See the full [CHANGELOG](CHANGELOG.md) for all changes including the 2.0.0 redesign.

---

## 🌟 Features

- 📦 **react-native-builder-bob** — dual CJS + ESM output + per-condition TypeScript declarations
- 🔒 **Strict TypeScript** — `noImplicitAny`, `strictNullChecks`, `noUnusedLocals`
- 🧪 **Jest + @testing-library/react-native v14** — full async test suite with coverage thresholds
- 🦀 **oxlint + oxfmt** — Rust-fast lint + format, enforced on commit via `lint-staged`
- 🪝 **Husky v9 + commitlint** — conventional commits, hooks install on `npm install`
- ⚙️ **GitHub Actions** — CI pipeline (typecheck + lint + format-check + test + build)
- 🔁 **Renovate** — grouped weekly dependency updates
- 🤖 **AI-ready** — `AGENTS.md` conventions file for Claude Code, Cursor, Copilot & friends
- **AI-Ready** — `AGENTS.md`, Cursor rules, and full TSDoc on every export
- **Interactive setup wizard** — `npm run setup` to configure your library in 60 seconds
- **Example component and hook** — reference implementations to clone from

---

## 🚀 Quick Start

### 1. Clone and install

```bash
git clone https://github.com/WrathChaos/react-native-typescript-library-starter.git my-library
cd my-library
npm install
```

### 2. Set up git hooks

Git hooks are installed automatically when you run `npm install` (via the `prepare` script). No extra step needed.

### 3. Configure the library

Run the interactive setup wizard. It walks through every field one by one, shows a preview of all planned changes, and asks for confirmation before writing anything:

```bash
npm run setup
```

The wizard will ask for:

- **Package name** — your npm name (e.g. `react-native-my-library`)
- **Description** — one sentence
- **GitHub username / org** — used to build repo URLs automatically
- **GitHub repository name** — defaults to your package name
- **Author name & email**
- **License** — MIT, Apache-2.0, ISC, GPL-3.0, or Unlicensed
- **Keywords** — optional, comma-separated extras

After confirmation it updates `package.json`, `README.md`, `AGENTS.md`, and `CONTRIBUTING.md` in one go.

### 4. Replace the example code

The `src/` folder contains a fully-typed example component and hook. Use them as reference, then replace with your own:

```
src/
├── components/MyComponent/   → replace with your component
├── hooks/useMyHook.ts        → replace with your hook
└── index.ts                  → update exports
```

### 5. Build and verify

```bash
npm run build      # outputs to lib/
npm run typecheck  # type-check without emitting
npm test           # run the test suite
```

---

## 📁 Project Structure

```
react-native-typescript-library-starter/
├── src/                          # ALL source code
│   ├── index.ts                  # Public API entry point
│   ├── components/
│   │   └── MyComponent/
│   │       ├── MyComponent.tsx
│   │       ├── MyComponent.types.ts
│   │       └── index.ts
│   ├── hooks/
│   │   └── useMyHook.ts
│   ├── types/
│   │   └── index.ts
│   └── __tests__/
│       ├── MyComponent.test.tsx
│       └── useMyHook.test.ts
├── lib/                          # Generated by bob (git-ignored)
├── .github/workflows/
│   ├── ci.yml                    # PR checks
│   └── release.yml               # Publish pipeline
├── AGENTS.md                     # AI agent instructions
├── CONTRIBUTING.md
├── CHANGELOG.md
├── package.json
├── tsconfig.json
├── tsconfig.build.json
└── babel.config.js
```

---

## 🔧 Scripts

| Command                 | Description                                 |
| ----------------------- | ------------------------------------------- |
| `npm run build`         | Build library to `lib/` via bob             |
| `npm run typecheck`     | Type-check without emitting                 |
| `npm run lint`          | Run oxlint with colored output and auto-fix |
| `npm run lint:ci`       | oxlint without spinner (for CI)             |
| `npm run oxfmt`      | Format source files                         |
| `npm run oxfmt:ci`   | Check formatting (for CI)                   |
| `npm test`              | Run Jest tests                              |
| `npm run test:watch`    | Jest in watch mode                          |
| `npm run test:coverage` | Jest with coverage report                   |

---

## 📦 Build Output

`react-native-builder-bob` produces three output targets inside `lib/`:

| Output     | Path              | Used by                            |
| ---------- | ----------------- | ---------------------------------- |
| CommonJS   | `lib/commonjs/`   | Node.js, bundlers with `require()` |
| ESM        | `lib/module/`     | Modern bundlers, tree-shaking      |
| TypeScript | `lib/typescript/` | Type declarations for consumers    |

The `package.json` `exports` field routes consumers to the correct output automatically.

---

## 🧩 Example Component

```tsx
import { MyComponent } from "your-library";

export default function App() {
  return (
    <MyComponent
      title="Hello World"
      description="A fully-typed example component."
      enableButton
      buttonText="Tap me"
      onPress={() => console.log("pressed")}
    />
  );
}
```

### MyComponent Props

| Prop                 | Type                   | Default          | Description                           |
| -------------------- | ---------------------- | ---------------- | ------------------------------------- |
| `title`              | `string`               | —                | Primary title text (required)         |
| `description`        | `string`               | —                | Optional description below title      |
| `enableButton`       | `boolean`              | `false`          | Renders an action button              |
| `buttonText`         | `string`               | `"Press me"`     | Button label                          |
| `onPress`            | `() => void`           | —                | Button press callback                 |
| `style`              | `StyleProp<ViewStyle>` | —                | Root container style override         |
| `titleStyle`         | `StyleProp<TextStyle>` | —                | Title text style override             |
| `descriptionStyle`   | `StyleProp<TextStyle>` | —                | Description text style override       |
| `buttonStyle`        | `StyleProp<ViewStyle>` | —                | Button container style override       |
| `buttonTextStyle`    | `StyleProp<TextStyle>` | —                | Button label style override           |
| `accessibilityLabel` | `string`               | `title`          | Accessibility label for the container |
| `testID`             | `string`               | `"my-component"` | Test ID for querying in tests         |

---

## 🪝 Example Hook

```tsx
import { useMyHook } from "your-library";

function Counter() {
  const { count, increment, decrement, reset, isAtMax, isAtMin } = useMyHook({
    initialValue: 0,
    max: 10,
    min: 0,
    step: 1,
  });

  return (
    <View>
      <Text>{count}</Text>
      <Button title="+" onPress={increment} disabled={isAtMax} />
      <Button title="-" onPress={decrement} disabled={isAtMin} />
      <Button title="Reset" onPress={reset} />
    </View>
  );
}
```

### useMyHook Options

| Option         | Type     | Default | Description                       |
| -------------- | -------- | ------- | --------------------------------- |
| `initialValue` | `number` | `0`     | Starting counter value            |
| `max`          | `number` | —       | Upper bound (no limit if omitted) |
| `min`          | `number` | `0`     | Lower bound                       |
| `step`         | `number` | `1`     | Increment/decrement amount        |

### useMyHook Return

| Key         | Type         | Description                |
| ----------- | ------------ | -------------------------- |
| `count`     | `number`     | Current counter value      |
| `increment` | `() => void` | Increment by `step`        |
| `decrement` | `() => void` | Decrement by `step`        |
| `reset`     | `() => void` | Reset to `initialValue`    |
| `isAtMax`   | `boolean`    | `true` when `count >= max` |
| `isAtMin`   | `boolean`    | `true` when `count <= min` |

---

## 🧪 Testing

Tests use [Jest](https://jestjs.io/) and [@testing-library/react-native](https://callstack.github.io/react-native-testing-library/).

```bash
npm test                 # run all tests
npm run test:coverage    # with coverage report
```

Coverage thresholds are enforced in `package.json`:

- Branches: 70%
- Functions / Lines / Statements: 80%

---

## 📝 Commit Conventions

This project enforces [Conventional Commits](https://www.conventionalcommits.org/) via `commitlint`:

```
feat: add MyButton component
fix: correct accessibility role
test: add boundary cases for useMyHook
docs: update README with new props
chore: upgrade dependencies
```

---

## ⚙️ CI

### CI Pipeline (`.github/workflows/ci.yml`)

Runs on every push and pull request to `main`:

1. **Typecheck** — `tsc --noEmit`
2. **Lint** — oxlint + oxfmt check
3. **Test** — Jest with coverage
4. **Build** — `bob build` (only runs after all checks pass)

---

## 🤖 AI / LLM Usage

This starter is designed to be AI-friendly:

- **`AGENTS.md`** — read this file first when working with an AI agent. It contains the full directory map, all runnable commands, conventions, naming rules, and do/don'ts.
- **`.cursor/rules/library-conventions.mdc`** — Cursor AI rules that automatically enforce component/hook patterns.
- **TSDoc everywhere** — every exported function, component, prop, and type has `@param`, `@returns`, and `@example` documentation. This maximises AI autocomplete quality.
- **Strict TypeScript** — strict mode produces accurate types that AI tools can reason about reliably.
- **Conventional Commits** — predictable commit history helps AI tools summarize changes and generate release notes.

### Using with Cursor

The `.cursor/rules/library-conventions.mdc` rule is auto-applied to all `src/**/*.ts` and `src/**/*.tsx` files. It enforces component structure, hook patterns, and TSDoc requirements.

### Using with Claude / ChatGPT

Paste the contents of `AGENTS.md` into the system prompt or the start of a conversation for best results.

---

## 🔗 Peer Dependencies

```json
"peerDependencies": {
  "react": ">=17.0.0",
  "react-native": ">=0.70.0"
}
```

---

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full guide.

---

## 📜 Changelog

See [CHANGELOG.md](CHANGELOG.md).

---

## 📄 License

MIT — see [LICENSE](LICENSE).

---

## 👤 Author

**FreakyCoder** — [kurayogun@gmail.com](mailto:kurayogun@gmail.com)  
[freakycoder.com](https://www.freakycoder.com)
