import { renderHook, act } from "@testing-library/react"
import { useUserFilters } from "@/hooks/useUserFilters"
import { useQueryState } from "nuqs"

// Mock nuqs
jest.mock("nuqs", () => ({
  useQueryState: jest.fn(),
  parseAsString: {
    withOptions: () => jest.fn()
  },
  parseAsStringLiteral: () => ({
    withOptions: () => jest.fn()
  })
}))

// Mock useDebounce
jest.mock("@/hooks/useDebounce", () => ({
  useDebounce: jest.fn((value) => value)
}))

describe("useUserFilters", () => {
  const mockSetNat = jest.fn()
  const mockSetGender = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useQueryState as jest.Mock).mockImplementation((key) => {
      if (key === "nat") {
        return ["US", mockSetNat]
      }
      if (key === "gender") {
        return ["male", mockSetGender]
      }
      return [null, jest.fn()]
    })
  })

  it("initializes with query state values", () => {
    const { result } = renderHook(() => useUserFilters())

    expect(result.current.nat).toBe("US")
    expect(result.current.gender).toBe("male")
    expect(result.current.search).toBe("US")
  })

  it("updates search value", () => {
    const { result } = renderHook(() => useUserFilters())

    act(() => {
      result.current.setSearch("UK")
    })

    expect(result.current.search).toBe("UK")
  })

  it("updates gender value", () => {
    const { result } = renderHook(() => useUserFilters())

    act(() => {
      result.current.setGender("female")
    })

    expect(mockSetGender).toHaveBeenCalledWith("female")
  })

  it("updates nat value when debounced search changes", () => {
    const { result } = renderHook(() => useUserFilters())

    act(() => {
      result.current.setSearch("UK")
    })

    expect(mockSetNat).toHaveBeenCalledWith("UK")
  })

  it("handles null values", () => {
    ;(useQueryState as jest.Mock).mockImplementation((key) => {
      if (key === "nat") {
        return [null, mockSetNat]
      }
      if (key === "gender") {
        return [null, mockSetGender]
      }
      return [null, jest.fn()]
    })

    const { result } = renderHook(() => useUserFilters())

    expect(result.current.nat).toBe(null)
    expect(result.current.gender).toBe(null)
    expect(result.current.search).toBe(null)
  })
})
