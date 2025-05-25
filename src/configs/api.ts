import type { FetchUsersParams } from "@/types/user.type"

export const apiUrl = process.env.NEXT_PUBLIC_API_URL

export const api = {
  user: {
    all: ({ page, results, gender, nat, seed }: FetchUsersParams) =>
      `${apiUrl}?page=${page}&results=${results}${
        gender ? `&gender=${gender}` : ""
      }${nat ? `&nat=${nat}` : ""}${seed ? `&seed=${seed}` : ""}&exc=dob,registered,`
  }
}
