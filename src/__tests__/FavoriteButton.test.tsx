import { render, screen, fireEvent } from "@testing-library/react"
import FavoriteButton from "@/components/UserList/UserCard/FavoriteButton"

describe("FavoriteButton", () => {
  it("renders add to favorites button when not favorited", () => {
    const onClick = jest.fn()
    render(<FavoriteButton isFavorite={false} onClick={onClick} />)

    const button = screen.getByRole("button", { name: /Add to favorites/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass("favorite-button")
    expect(button).not.toHaveClass("favorite-button--active")
  })

  it("renders remove from favorites button when favorited", () => {
    const onClick = jest.fn()
    render(<FavoriteButton isFavorite={true} onClick={onClick} />)

    const button = screen.getByRole("button", {
      name: /Remove from favorites/i
    })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass("favorite-button")
    expect(button).toHaveClass("favorite-button--active")
  })

  it("calls onClick when clicked", () => {
    const onClick = jest.fn()
    render(<FavoriteButton isFavorite={false} onClick={onClick} />)

    const button = screen.getByRole("button")
    fireEvent.click(button)

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it("renders correct SVG based on favorite status", () => {
    const onClick = jest.fn()
    const { rerender } = render(
      <FavoriteButton isFavorite={false} onClick={onClick} />
    )

    // Check unfavorited state
    let svg = screen.getByRole("button").querySelector("svg")
    expect(svg).toHaveAttribute("fill", "none")
    expect(svg).toHaveAttribute("stroke", "#e11d48")

    // Check favorited state
    rerender(<FavoriteButton isFavorite={true} onClick={onClick} />)
    svg = screen.getByRole("button").querySelector("svg")
    expect(svg).toHaveAttribute("fill", "#e11d48")
    expect(svg).not.toHaveAttribute("stroke")
  })
})
