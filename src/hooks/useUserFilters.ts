import { useState, useEffect } from "react"
import { parseAsString, parseAsStringLiteral, useQueryState } from "nuqs"
import { genderOptions } from "@/types/user.type"
import { useDebounce } from "./useDebounce"

export const useUserFilters = () => {
  const [nat, setNat] = useQueryState(
    "nat",
    parseAsString.withOptions({
      shallow: false
    })
  )

  const [gender, setGender] = useQueryState(
    "gender",
    parseAsStringLiteral(genderOptions).withOptions({
      shallow: false
    })
  )

  const [search, setSearch] = useState(nat)
  const debouncedValue = useDebounce(search)

  useEffect(() => {
    setNat(debouncedValue)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue])

  return {
    nat,
    gender,
    search,
    setSearch,
    setGender
  }
}
