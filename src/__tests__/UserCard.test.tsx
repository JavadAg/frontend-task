/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import "@testing-library/jest-dom"
import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import UserCard from "@/components/UserList/UserCard/UserCard"
import { useFavorites } from "@/hooks/useFavorites"
import { useRouter } from "next/navigation"
import type { User } from "@/types/user.type"

// Mock the hooks
jest.mock("@/hooks/useFavorites")
jest.mock("next/navigation", () => ({
  useRouter: jest.fn()
}))

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: {
    src: string
    alt: string
    width: number
    height: number
    loading?: "eager" | "lazy"
    priority?: boolean
  }) => <img {...props} />
}))

describe("UserCard", () => {
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
    address: "123 Main St",
    flag: "us"
  }

  const mockRouter = {
    push: jest.fn()
  }

  beforeEach(() => {
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
    ;(useFavorites as jest.Mock).mockReturnValue({
      isFavorite: jest.fn().mockReturnValue(false),
      addFavorite: jest.fn(),
      isLoaded: true
    })
  })

  it("renders user info", () => {
    render(<UserCard user={mockUser} index={0} />)
    expect(screen.getByText("John Doe")).toBeInTheDocument()
    expect(screen.getByText("johndoe")).toBeInTheDocument()
    expect(screen.getByText("male")).toBeInTheDocument()
    expect(screen.getByText("john@example.com")).toBeInTheDocument()
    expect(screen.getByText("123-456-7890")).toBeInTheDocument()
    expect(screen.getByText("123 Main St")).toBeInTheDocument()
    expect(
      screen.getByRole("img", { name: /avatar of john doe/i })
    ).toBeInTheDocument()
    expect(screen.getByRole("img", { name: /flag of us/i })).toBeInTheDocument()
  })

  it("calls onFavorite when favorite button is clicked", () => {
    const addFavorite = jest.fn()
    ;(useFavorites as jest.Mock).mockReturnValue({
      isFavorite: jest.fn().mockReturnValue(false),
      addFavorite,
      isLoaded: true
    })

    render(<UserCard user={mockUser} index={0} />)

    const favoriteButton = screen.getByRole("button")
    fireEvent.click(favoriteButton)
    expect(addFavorite).toHaveBeenCalledWith(mockUser)
  })

  it("renders user information correctly", () => {
    render(<UserCard index={0} user={mockUser} />)

    expect(screen.getByText("1")).toBeInTheDocument() // Index
    expect(screen.getByText("John Doe")).toBeInTheDocument()
    expect(screen.getByText("johndoe")).toBeInTheDocument()
    expect(screen.getByText("male")).toBeInTheDocument()
    expect(screen.getByText("123-456-7890")).toBeInTheDocument()
    expect(screen.getByText("john@example.com")).toBeInTheDocument()
    expect(screen.getByText("123 Main St")).toBeInTheDocument()
  })

  it("renders user avatar with correct attributes", () => {
    render(<UserCard index={0} user={mockUser} />)

    const avatar = screen.getByAltText("Avatar of John Doe")
    expect(avatar).toBeInTheDocument()
    expect(avatar).toHaveAttribute("src", "thumbnail1.jpg")
    expect(avatar).toHaveAttribute("width", "100")
    expect(avatar).toHaveAttribute("height", "100")
  })

  it("renders flag with correct attributes", () => {
    render(<UserCard index={0} user={mockUser} />)

    const flag = screen.getByAltText("Flag of US")
    expect(flag).toBeInTheDocument()
    expect(flag).toHaveAttribute("src", "us")
    expect(flag).toHaveAttribute("width", "24")
    expect(flag).toHaveAttribute("height", "16")
  })

  it("handles profile click correctly", () => {
    render(<UserCard index={0} user={mockUser} isProfilePage={true} />)

    const profileLink = screen.getByRole("link", {
      name: /View profile of John Doe/i
    })
    fireEvent.click(profileLink)

    expect(mockRouter.push).toHaveBeenCalledWith("/profile/1")
    expect(localStorage.getItem("selectedUser")).toBe(JSON.stringify(mockUser))
  })

  it("renders favorite button when favorites are loaded", () => {
    render(<UserCard index={0} user={mockUser} />)

    const favoriteButton = screen.getByRole("button")
    expect(favoriteButton).toBeInTheDocument()
  })

  it("does not render favorite button when favorites are not loaded", () => {
    ;(useFavorites as jest.Mock).mockReturnValue({
      isFavorite: jest.fn(),
      addFavorite: jest.fn(),
      isLoaded: false
    })

    render(<UserCard index={0} user={mockUser} />)

    const favoriteButton = screen.queryByRole("button")
    expect(favoriteButton).not.toBeInTheDocument()
  })
})
