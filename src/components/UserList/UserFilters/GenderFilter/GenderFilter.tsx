import type { Gender } from "@/types/user.type"

interface GenderFilterProps {
  value: Gender | null
  onChange: (value: Gender | null) => void
}

const GenderFilter: React.FC<GenderFilterProps> = ({ value, onChange }) => (
  <select
    className="gender-filter"
    value={value ?? ""}
    onChange={(e) => onChange(e.target.value as Gender | null)}
    aria-label="Filter by gender"
  >
    <option value="">All Genders</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
  </select>
)

export default GenderFilter
