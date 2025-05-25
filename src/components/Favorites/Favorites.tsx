"use client"

import { useFavorites } from "@/hooks/useFavorites"
import UserCard from "@/components/UserList/UserCard/UserCard"

const Favorites = () => {
  const { favorites, isLoaded } = useFavorites()

  if (!isLoaded) {
    return (
      <div className="user-list__loading" aria-live="polite">
        Loading favorites...
      </div>
    )
  }

  return (
    <div className="user-list">
      <h2>Favorites</h2>
      {favorites.length === 0 ? (
        <div className="user-list__end" aria-live="polite">
          No favorites yet. Add some users to your favorites!
        </div>
      ) : (
        <div className="user-list__items">
          {favorites.map((user, index) => (
            <UserCard index={index} key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Favorites
