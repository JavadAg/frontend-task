import { render, screen, fireEvent } from "@testing-library/react"
import SearchBar from "@/components/UserList/UserFilters/SearchBar/SearchBar"

describe("SearchBar", () => {
  it("renders with correct placeholder and label", () => {
    const onChange = jest.fn()
    render(<SearchBar value="" onChange={onChange} />)

    const input = screen.getByRole("textbox", {
      name: /Search by nationality/i
    })
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute(
      "placeholder",
      "Search by nationality (e.g. US, IT, FR)"
    )
    expect(input).toHaveClass("search-bar")
  })

  it("displays the provided value", () => {
    const onChange = jest.fn()
    render(<SearchBar value="US" onChange={onChange} />)

    const input = screen.getByRole("textbox")
    expect(input).toHaveValue("US")
  })

  it("handles null value by displaying empty string", () => {
    const onChange = jest.fn()
    render(<SearchBar value={null} onChange={onChange} />)

    const input = screen.getByRole("textbox")
    expect(input).toHaveValue("")
  })

  it("calls onChange with uppercase value when input changes", () => {
    const onChange = jest.fn()
    render(<SearchBar value="" onChange={onChange} />)

    const input = screen.getByRole("textbox")
    fireEvent.change(input, { target: { value: "us" } })

    expect(onChange).toHaveBeenCalledWith("US")
  })

  it("converts input to uppercase automatically", () => {
    const onChange = jest.fn()
    render(<SearchBar value="" onChange={onChange} />)

    const input = screen.getByRole("textbox")
    fireEvent.change(input, { target: { value: "italy" } })

    expect(onChange).toHaveBeenCalledWith("ITALY")
  })
})
