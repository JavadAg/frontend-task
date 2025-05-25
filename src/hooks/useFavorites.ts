import type { User } from "@/types/user.type"
import { useState, useEffect } from "react"

const FAVORITES_KEY = "favoriteUsers"

export function useFavorites() {
  const [favorites, setFavorites] = useState<User[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY)
    if (stored) {
      setFavorites(JSON.parse(stored))
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
    }
  }, [favorites, isLoaded])

  const addFavorite = (user: User) => {
    setFavorites((prev) => {
      if (prev.some((fav) => fav.id === user.id)) {
        return prev.filter((fav) => fav.id !== user.id)
      }
      return [...prev, user]
    })
  }

  const isFavorite = (user: User) => favorites.some((fav) => fav.id === user.id)

  return { favorites, addFavorite, isFavorite, isLoaded }
}
