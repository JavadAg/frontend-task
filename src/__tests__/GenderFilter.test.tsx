import { render, screen, fireEvent } from "@testing-library/react"
import GenderFilter from "@/components/UserList/UserFilters/GenderFilter/GenderFilter"

describe("GenderFilter", () => {
  it("renders with correct label and options", () => {
    const onChange = jest.fn()
    render(<GenderFilter value="" onChange={onChange} />)

    const select = screen.getByRole("combobox", { name: /Filter by gender/i })
    expect(select).toBeInTheDocument()
    expect(select).toHaveClass("gender-filter")

    const options = screen.getAllByRole("option")
    expect(options).toHaveLength(3)
    expect(options[0]).toHaveTextContent("All Genders")
    expect(options[1]).toHaveTextContent("Male")
    expect(options[2]).toHaveTextContent("Female")
  })

  it("displays the provided value", () => {
    const onChange = jest.fn()
    render(<GenderFilter value="male" onChange={onChange} />)

    const select = screen.getByRole("combobox")
    expect(select).toHaveValue("male")
  })

  it("handles null value by displaying empty string", () => {
    const onChange = jest.fn()
    render(<GenderFilter value={null} onChange={onChange} />)

    const select = screen.getByRole("combobox")
    expect(select).toHaveValue("")
  })

  it("calls onChange with selected value when changed", () => {
    const onChange = jest.fn()
    render(<GenderFilter value="" onChange={onChange} />)

    const select = screen.getByRole("combobox")
    fireEvent.change(select, { target: { value: "female" } })

    expect(onChange).toHaveBeenCalledWith("female")
  })

  it('calls onChange with null when "All Genders" is selected', () => {
    const onChange = jest.fn()
    render(<GenderFilter value="male" onChange={onChange} />)

    const select = screen.getByRole("combobox")
    fireEvent.change(select, { target: { value: "" } })

    expect(onChange).toHaveBeenCalledWith("")
  })
})
