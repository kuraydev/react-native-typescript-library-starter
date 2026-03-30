import { act, renderHook } from "@testing-library/react-native";
import { useMyHook } from "../index";

describe("useMyHook", () => {
  describe("initialisation", () => {
    it("starts at 0 by default", () => {
      const { result } = renderHook(() => useMyHook());
      expect(result.current.count).toBe(0);
    });

    it("starts at the provided initialValue", () => {
      const { result } = renderHook(() => useMyHook({ initialValue: 5 }));
      expect(result.current.count).toBe(5);
    });
  });

  describe("increment", () => {
    it("increments by 1 by default", () => {
      const { result } = renderHook(() => useMyHook());
      act(() => result.current.increment());
      expect(result.current.count).toBe(1);
    });

    it("increments by a custom step", () => {
      const { result } = renderHook(() => useMyHook({ step: 3 }));
      act(() => result.current.increment());
      expect(result.current.count).toBe(3);
    });

    it("does not exceed max", () => {
      const { result } = renderHook(() =>
        useMyHook({ initialValue: 9, max: 10 }),
      );
      act(() => result.current.increment());
      act(() => result.current.increment());
      expect(result.current.count).toBe(10);
    });

    it("sets isAtMax when count reaches max", () => {
      const { result } = renderHook(() =>
        useMyHook({ initialValue: 9, max: 10 }),
      );
      act(() => result.current.increment());
      expect(result.current.isAtMax).toBe(true);
    });
  });

  describe("decrement", () => {
    it("decrements by 1 by default", () => {
      const { result } = renderHook(() => useMyHook({ initialValue: 5 }));
      act(() => result.current.decrement());
      expect(result.current.count).toBe(4);
    });

    it("does not go below min", () => {
      const { result } = renderHook(() => useMyHook({ min: 0 }));
      act(() => result.current.decrement());
      expect(result.current.count).toBe(0);
    });

    it("sets isAtMin when count reaches min", () => {
      const { result } = renderHook(() => useMyHook({ min: 0 }));
      expect(result.current.isAtMin).toBe(true);
    });
  });

  describe("reset", () => {
    it("resets to the initial value", () => {
      const { result } = renderHook(() => useMyHook({ initialValue: 5 }));
      act(() => result.current.increment());
      act(() => result.current.increment());
      act(() => result.current.reset());
      expect(result.current.count).toBe(5);
    });
  });

  describe("boundary flags", () => {
    it("isAtMax is false when no max is set", () => {
      const { result } = renderHook(() => useMyHook());
      act(() => {
        for (let i = 0; i < 100; i++) result.current.increment();
      });
      expect(result.current.isAtMax).toBe(false);
    });
  });
});
