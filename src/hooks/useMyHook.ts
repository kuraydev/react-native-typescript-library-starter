import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Options accepted by {@link useMyHook}.
 */
export interface UseMyHookOptions {
  /**
   * The initial counter value.
   *
   * @defaultValue 0
   */
  initialValue?: number;

  /**
   * Upper bound for the counter. The counter will not exceed this value.
   * Pass `undefined` for no upper bound.
   */
  max?: number;

  /**
   * Lower bound for the counter. The counter will not go below this value.
   *
   * @defaultValue 0
   */
  min?: number;

  /**
   * Amount to increment or decrement on each step.
   *
   * @defaultValue 1
   */
  step?: number;
}

/**
 * Return value of {@link useMyHook}.
 */
export interface UseMyHookReturn {
  /** The current counter value. */
  count: number;

  /** Increments the counter by `step`, capped at `max` if provided. */
  increment: () => void;

  /** Decrements the counter by `step`, floored at `min`. */
  decrement: () => void;

  /** Resets the counter to `initialValue`. */
  reset: () => void;

  /** `true` when the counter has reached the `max` boundary. */
  isAtMax: boolean;

  /** `true` when the counter has reached the `min` boundary. */
  isAtMin: boolean;
}

/**
 * An example custom hook that manages a bounded counter.
 *
 * This hook is included as a starting-point template. Replace it with your
 * own hook logic.
 *
 * @param options - Configuration options for the hook.
 * @returns An object exposing the current count and mutation helpers.
 *
 * @example
 * ```tsx
 * import { useMyHook } from "your-library";
 *
 * function Counter() {
 *   const { count, increment, decrement, reset } = useMyHook({
 *     initialValue: 0,
 *     max: 10,
 *     min: 0,
 *   });
 *
 *   return (
 *     <View>
 *       <Text>{count}</Text>
 *       <Button title="+" onPress={increment} />
 *       <Button title="-" onPress={decrement} />
 *       <Button title="Reset" onPress={reset} />
 *     </View>
 *   );
 * }
 * ```
 */
export function useMyHook({
  initialValue = 0,
  max,
  min = 0,
  step = 1,
}: UseMyHookOptions = {}): UseMyHookReturn {
  const [count, setCount] = useState<number>(initialValue);
  const initialValueRef = useRef(initialValue);

  useEffect(() => {
    initialValueRef.current = initialValue;
  }, [initialValue]);

  const increment = useCallback(() => {
    setCount((prev) => {
      const next = prev + step;
      return max !== undefined ? Math.min(next, max) : next;
    });
  }, [step, max]);

  const decrement = useCallback(() => {
    setCount((prev) => Math.max(prev - step, min));
  }, [step, min]);

  const reset = useCallback(() => {
    setCount(initialValueRef.current);
  }, []);

  return {
    count,
    increment,
    decrement,
    reset,
    isAtMax: max !== undefined ? count >= max : false,
    isAtMin: count <= min,
  };
}
