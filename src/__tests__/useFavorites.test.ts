import { renderHook, act } from "@testing-library/react"
import { useFavorites } from "@/hooks/useFavorites"
import type { User } from "@/types/user.type"

describe("useFavorites", () => {
  const mockUser: User = {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    username: "johndoe",
    email: "john@example.com",
    phone: "123-456-7890",
    picture: "thumbnail1.jpg",
    gender: "male",
    nationality: "US",
    address: "123 Main St"
  }

  beforeEach(() => {
    localStorage.clear()
  })

  it("initializes with empty favorites", () => {
    const { result } = renderHook(() => useFavorites())

    expect(result.current.favorites).toEqual([])
    expect(result.current.isLoaded).toBe(true)
  })

  it("loads favorites from localStorage on mount", () => {
    localStorage.setItem("favoriteUsers", JSON.stringify([mockUser]))

    const { result } = renderHook(() => useFavorites())

    expect(result.current.favorites).toEqual([mockUser])
    expect(result.current.isLoaded).toBe(true)
  })

  it("adds a user to favorites", () => {
    const { result } = renderHook(() => useFavorites())

    act(() => {
      result.current.addFavorite(mockUser)
    })

    expect(result.current.favorites).toEqual([mockUser])
    expect(result.current.isFavorite(mockUser)).toBe(true)
  })

  it("removes a user from favorites when added again", () => {
    const { result } = renderHook(() => useFavorites())

    act(() => {
      result.current.addFavorite(mockUser)
    })

    expect(result.current.favorites).toEqual([mockUser])

    act(() => {
      result.current.addFavorite(mockUser)
    })

    expect(result.current.favorites).toEqual([])
    expect(result.current.isFavorite(mockUser)).toBe(false)
  })

  it("saves favorites to localStorage when updated", () => {
    const { result } = renderHook(() => useFavorites())

    act(() => {
      result.current.addFavorite(mockUser)
    })

    const stored = localStorage.getItem("favoriteUsers")
    expect(stored).toBe(JSON.stringify([mockUser]))
  })
})
