"use client"

import { useEffect, useState } from "react"
import type { User } from "@/types/user.type"
import UserCard from "../UserList/UserCard/UserCard"

const Profile = () => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("selectedUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  if (!user) {
    return (
      <div className="profile-page">
        <div className="profile-page__error">User not found</div>
      </div>
    )
  }

  return <UserCard index={0} user={user} isProfilePage />
}

export default Profile
