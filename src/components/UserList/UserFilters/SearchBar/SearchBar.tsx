interface SearchBarProps {
  value: string | null
  onChange: (value: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => (
  <input
    className="search-bar"
    type="text"
    placeholder="Search by nationality (e.g. US, IT, FR)"
    value={value ?? ""}
    onChange={(e) => onChange(e.target.value.toUpperCase())}
    aria-label="Search by nationality"
  />
)

export default SearchBar
