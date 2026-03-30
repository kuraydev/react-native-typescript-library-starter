/**
 * Common type utilities shared across the library.
 *
 * @module types
 */

/**
 * Represents a callback function with no arguments and no return value.
 *
 * @example
 * const onPress: VoidCallback = () => console.log("pressed");
 */
export type VoidCallback = () => void;

/**
 * Makes all properties of T optional recursively.
 *
 * @example
 * type PartialConfig = DeepPartial<MyComponentProps>;
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Extracts the element type from an array type.
 *
 * @example
 * type Item = ArrayElement<string[]>; // string
 */
export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
