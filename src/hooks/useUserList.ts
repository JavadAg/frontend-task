import { useState, useEffect } from "react"
import type { User } from "@/types/user.type"
import { fetchUsers } from "@/services/user.service"
import { genderOptions } from "@/types/user.type"
import { PAGE_SIZE } from "@/constants/user.constant"

type Gender = (typeof genderOptions)[number]

export const useUserList = (initialUsers: User[], seed: string) => {
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [page, setPage] = useState(2)

  useEffect(() => {
    setUsers(initialUsers)
  }, [initialUsers])

  const loadMoreUsers = async (gender?: Gender | null, nat?: string | null) => {
    if (!isLoading && hasMore) {
      setIsLoading(true)

      const newUsers = await fetchUsers({
        page,
        results: PAGE_SIZE,
        gender: gender || undefined,
        nat: nat || undefined,
        seed
      })

      setUsers((prev) => [...prev, ...newUsers.users])
      setHasMore(newUsers.results === PAGE_SIZE)
      setPage(newUsers.page + 1)
      setIsLoading(false)
    }
  }

  return {
    users,
    isLoading,
    hasMore,
    loadMoreUsers
  }
}
