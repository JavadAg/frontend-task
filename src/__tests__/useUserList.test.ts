import { renderHook, act } from "@testing-library/react"
import { useUserList } from "@/hooks/useUserList"
import { fetchUsers } from "@/services/user.service"
import type { User } from "@/types/user.type"
import { PAGE_SIZE } from "@/constants/user.constant"

// Mock the fetchUsers service
jest.mock("@/services/user.service", () => ({
  fetchUsers: jest.fn()
}))

describe("useUserList", () => {
  const mockInitialUsers: User[] = [
    {
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
  ]

  const mockNewUsers: User[] = [
    {
      id: "2",
      firstName: "Jane",
      lastName: "Smith",
      username: "janesmith",
      email: "jane@example.com",
      phone: "098-765-4321",
      picture: "thumbnail2.jpg",
      gender: "female",
      nationality: "UK",
      address: "456 High St"
    }
  ]

  beforeEach(() => {
    jest.clearAllMocks()
    ;(fetchUsers as jest.Mock).mockResolvedValue({
      users: mockNewUsers,
      results: PAGE_SIZE,
      page: 2
    })
  })

  it("initializes with provided users", () => {
    const { result } = renderHook(() => useUserList(mockInitialUsers, "test"))

    expect(result.current.users).toEqual(mockInitialUsers)
    expect(result.current.isLoading).toBe(false)
    expect(result.current.hasMore).toBe(true)
  })

  it("updates users when initialUsers changes", () => {
    const { result, rerender } = renderHook(
      ({ users, seed }) => useUserList(users, seed),
      {
        initialProps: { users: mockInitialUsers, seed: "test" }
      }
    )

    const newInitialUsers = [...mockInitialUsers, ...mockNewUsers]
    rerender({ users: newInitialUsers, seed: "test" })

    expect(result.current.users).toEqual(newInitialUsers)
  })

  it("loads more users when loadMoreUsers is called", async () => {
    const { result } = renderHook(() => useUserList(mockInitialUsers, "test"))

    await act(async () => {
      await result.current.loadMoreUsers()
    })

    expect(fetchUsers).toHaveBeenCalledWith({
      page: 2,
      results: PAGE_SIZE,
      seed: "test"
    })
    expect(result.current.users).toEqual([...mockInitialUsers, ...mockNewUsers])
    expect(result.current.isLoading).toBe(false)
    expect(result.current.hasMore).toBe(true)
  })

  it("applies gender and nationality filters when loading more users", async () => {
    const { result } = renderHook(() => useUserList(mockInitialUsers, "test"))

    await act(async () => {
      await result.current.loadMoreUsers("male", "US")
    })

    expect(fetchUsers).toHaveBeenCalledWith({
      page: 2,
      results: PAGE_SIZE,
      gender: "male",
      nat: "US",
      seed: "test"
    })
  })

  it("sets hasMore to false when fewer results are returned", async () => {
    ;(fetchUsers as jest.Mock).mockResolvedValue({
      users: mockNewUsers,
      results: 10,
      page: 2
    })

    const { result } = renderHook(() => useUserList(mockInitialUsers, "test"))

    await act(async () => {
      await result.current.loadMoreUsers()
    })

    expect(result.current.hasMore).toBe(false)
  })

  it("does not load more users when already loading", async () => {
    const { result } = renderHook(() => useUserList(mockInitialUsers, "test"))

    // Start loading
    act(() => {
      result.current.loadMoreUsers()
    })

    // Try to load more while still loading
    await act(async () => {
      await result.current.loadMoreUsers()
    })

    expect(fetchUsers).toHaveBeenCalledTimes(1)
  })

  it("does not load more users when hasMore is false", async () => {
    const { result } = renderHook(() => useUserList(mockInitialUsers, "test"))

    // Set hasMore to false
    act(() => {
      result.current.loadMoreUsers()
    })
    ;(fetchUsers as jest.Mock).mockResolvedValue({
      users: mockNewUsers,
      results: 10,
      page: 2
    })
    await act(async () => {
      await result.current.loadMoreUsers()
    })

    // Try to load more
    await act(async () => {
      await result.current.loadMoreUsers()
    })

    expect(fetchUsers).toHaveBeenCalledTimes(2)
  })
})
