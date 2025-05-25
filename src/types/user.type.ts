export const genderOptions = ["male", "female", ""] as const
export type Gender = (typeof genderOptions)[number]

export interface FetchUsersResponse {
  results: ApiUser[]
  info: { page: number; results: number; seed: string }
}

export type FetchUsersParams = {
  page: number
  results: number
  gender?: Gender | null
  nat?: string | null
  seed?: string | null
}

export interface User {
  id: string
  firstName: string
  lastName: string
  username: string
  gender: Gender
  email: string
  phone: string
  picture: string
  nationality: string
  address: string
}

export interface ApiUser {
  login: { uuid: string; username: string }
  name: { first: string; last: string }
  gender: Gender
  email: string
  phone: string
  picture: { medium: string }
  nat: string
  location: {
    street: { number: number; name: string }
    city: string
    state: string
    country: string
    postcode: string | number
  }
}
