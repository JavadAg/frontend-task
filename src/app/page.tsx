import UserList from "@/components/UserList/UserList"
import { fetchUsers } from "@/services/user.service"
import type { FetchUsersParams } from "@/types/user.type"

export default async function Home({
  searchParams
}: {
  searchParams: Promise<FetchUsersParams>
}) {
  const { page, results, gender, nat } = await searchParams

  const users = await fetchUsers({
    page,
    results,
    gender,
    nat
  })

  return (
    <UserList initialUsers={users.users} page={users.page} seed={users.seed} />
  )
}
