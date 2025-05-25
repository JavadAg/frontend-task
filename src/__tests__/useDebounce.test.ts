import { renderHook, act } from "@testing-library/react"
import { useDebounce } from "@/hooks/useDebounce"

describe("useDebounce", () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it("returns initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("initial"))

    expect(result.current).toBe("initial")
  })

  it("updates value after delay", () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value), {
      initialProps: { value: "initial" }
    })

    rerender({ value: "updated" })
    expect(result.current).toBe("initial")

    act(() => {
      jest.advanceTimersByTime(500)
    })

    expect(result.current).toBe("updated")
  })

  it("uses custom delay", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 1000),
      {
        initialProps: { value: "initial" }
      }
    )

    rerender({ value: "updated" })
    expect(result.current).toBe("initial")

    act(() => {
      jest.advanceTimersByTime(500)
    })
    expect(result.current).toBe("initial")

    act(() => {
      jest.advanceTimersByTime(500)
    })
    expect(result.current).toBe("updated")
  })

  it("cancels previous timeout when value changes", () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value), {
      initialProps: { value: "initial" }
    })

    rerender({ value: "updated1" })
    rerender({ value: "updated2" })

    act(() => {
      jest.advanceTimersByTime(500)
    })

    expect(result.current).toBe("updated2")
  })

  it("works with different types", () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value), {
      initialProps: { value: 42 }
    })

    rerender({ value: 100 })
    expect(result.current).toBe(42)

    act(() => {
      jest.advanceTimersByTime(500)
    })

    expect(result.current).toBe(100)
  })
})
