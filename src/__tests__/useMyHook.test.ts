import { act, renderHook } from "@testing-library/react-native";
import { useMyHook } from "../index";

describe("useMyHook", () => {
  describe("initialisation", () => {
    it("starts at 0 by default", async () => {
      const { result } = await renderHook(() => useMyHook());
      expect(result.current.count).toBe(0);
    });

    it("starts at the provided initialValue", async () => {
      const { result } = await renderHook(() => useMyHook({ initialValue: 5 }));
      expect(result.current.count).toBe(5);
    });
  });

  describe("increment", () => {
    it("increments by 1 by default", async () => {
      const { result } = await renderHook(() => useMyHook());
      await act(() => result.current.increment());
      expect(result.current.count).toBe(1);
    });

    it("increments by a custom step", async () => {
      const { result } = await renderHook(() => useMyHook({ step: 3 }));
      await act(() => result.current.increment());
      expect(result.current.count).toBe(3);
    });

    it("does not exceed max", async () => {
      const { result } = await renderHook(() =>
        useMyHook({ initialValue: 9, max: 10 }),
      );
      await act(() => result.current.increment());
      await act(() => result.current.increment());
      expect(result.current.count).toBe(10);
    });

    it("sets isAtMax when count reaches max", async () => {
      const { result } = await renderHook(() =>
        useMyHook({ initialValue: 9, max: 10 }),
      );
      await act(() => result.current.increment());
      expect(result.current.isAtMax).toBe(true);
    });
  });

  describe("decrement", () => {
    it("decrements by 1 by default", async () => {
      const { result } = await renderHook(() => useMyHook({ initialValue: 5 }));
      await act(() => result.current.decrement());
      expect(result.current.count).toBe(4);
    });

    it("does not go below min", async () => {
      const { result } = await renderHook(() => useMyHook({ min: 0 }));
      await act(() => result.current.decrement());
      expect(result.current.count).toBe(0);
    });

    it("sets isAtMin when count reaches min", async () => {
      const { result } = await renderHook(() => useMyHook({ min: 0 }));
      expect(result.current.isAtMin).toBe(true);
    });
  });

  describe("reset", () => {
    it("resets to the initial value", async () => {
      const { result } = await renderHook(() => useMyHook({ initialValue: 5 }));
      await act(() => result.current.increment());
      await act(() => result.current.increment());
      await act(() => result.current.reset());
      expect(result.current.count).toBe(5);
    });
  });

  describe("boundary flags", () => {
    it("isAtMax is false when no max is set", async () => {
      const { result } = await renderHook(() => useMyHook());
      await act(() => {
        for (let i = 0; i < 100; i++) result.current.increment();
      });
      expect(result.current.isAtMax).toBe(false);
    });
  });
});
