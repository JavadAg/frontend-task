import type { User } from "@/types/user.type"
import FavoriteButton from "@/components/UserList/UserCard/FavoriteButton"
import Image from "next/image"
import { memo } from "react"
import { useFavorites } from "@/hooks/useFavorites"
import { useRouter } from "next/navigation"

interface UserCardProps {
  index: number
  isProfilePage?: boolean
  user: User
}

const UserCard: React.FC<UserCardProps> = memo(
  ({ index, user, isProfilePage = false }) => {
    const {
      isFavorite,
      addFavorite,
      isLoaded: isFavoritesLoaded
    } = useFavorites()
    const router = useRouter()

    const handleProfileClick = () => {
      if (!isProfilePage) {
        // Store user data in localStorage
        localStorage.setItem("selectedUser", JSON.stringify(user))
        router.push(`/profile/${user.id}`)
      }
    }

    return (
      <div className="user-card">
        <span className="user-card__id">{index + 1}</span>
        <div className="user-card__avatar">
          <Image
            src={user.picture}
            alt={`Avatar of ${user.firstName} ${user.lastName}`}
            width={100}
            height={100}
            priority={index < 5}
            unoptimized
          />
        </div>

        <div className="user-card__info">
          <button
            className="user-card__name"
            onClick={handleProfileClick}
            aria-label={`View profile of ${user.firstName} ${user.lastName}`}
          >
            {user.firstName} {user.lastName}
          </button>
          <div className="user-card__meta">
            <span className="user-card__username">{user.username}</span> /{" "}
            <span className="user-card__gender">{user.gender}</span>
          </div>
        </div>

        <div className="user-card__details">
          <span className="user-card__phone">{user.phone}</span>
          <span className="user-card__email">{user.email}</span>
          <div className="user-card__address">{user.address}</div>
        </div>

        <Image
          className="user-card__flag"
          src={`/flags/${user.nationality.toLowerCase()}.png`}
          alt={`Flag of ${user.nationality}`}
          width={24}
          height={16}
          unoptimized
        />
        {isFavoritesLoaded && (
          <FavoriteButton
            isFavorite={isFavorite(user)}
            onClick={() => addFavorite(user)}
          />
        )}
      </div>
    )
  }
)

UserCard.displayName = "UserCard"

export default UserCard
