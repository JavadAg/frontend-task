import { api } from "@/configs/api"
import { query } from "@/libs/interceptor"
import {
  ApiUser,
  FetchUsersParams,
  FetchUsersResponse,
  User
} from "@/types/user.type"
import { PAGE_SIZE } from "@/constants/user.constant"

export async function fetchUsers({
  page = 1,
  results = PAGE_SIZE,
  gender,
  nat,
  seed
}: FetchUsersParams): Promise<{
  users: User[]
  page: number
  results: number
  seed: string
}> {
  const { data, ok, message } = await query<FetchUsersResponse>(
    api.user.all({ page, results, gender, nat, seed }),
    {
      cache: "force-cache",
      revalidate: 60 * 60 // 1 hour,
    }
  )

  if (!ok) {
    console.error("Error fetching users", message)
    return {
      users: [],
      page: 1,
      results: 0,
      seed: ""
    }
  }

  return {
    users: data.results.map(mapApiUserToUser),
    page: data.info.page,
    results: data.info.results,
    seed: data.info.seed
  }
}

function mapApiUserToUser(apiUser: ApiUser): User {
  return {
    id: apiUser.login.uuid,
    firstName: apiUser.name.first,
    lastName: apiUser.name.last,
    username: apiUser.login.username,
    gender: apiUser.gender,
    email: apiUser.email,
    phone: apiUser.phone,
    picture: apiUser.picture.medium,
    nationality: apiUser.nat,
    address: `${apiUser.location.street.number} ${apiUser.location.street.name}, ${apiUser.location.city}, ${apiUser.location.state}, ${apiUser.location.country}, ${apiUser.location.postcode}`
  }
}
