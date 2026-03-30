/**
 * @packageDocumentation
 *
 * react-native-typescript-library-starter
 *
 * A modern, AI-ready React Native TypeScript library starter.
 *
 * @example
 * ```tsx
 * import { MyComponent, useMyHook } from "your-library";
 * ```
 */

// Components
export { default as MyComponent } from "./components/MyComponent";
export type { MyComponentProps } from "./components/MyComponent";

// Hooks
export { useMyHook } from "./hooks/useMyHook";
export type { UseMyHookOptions, UseMyHookReturn } from "./hooks/useMyHook";

// Types
export type { VoidCallback, DeepPartial, ArrayElement } from "./types";
