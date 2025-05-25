"use client"

import type { User } from "@/types/user.type"
import UserCard from "@/components/UserList/UserCard/UserCard"
import { useUserList } from "@/hooks/useUserList"
import { useUserFilters } from "@/hooks/useUserFilters"
import SearchBar from "./UserFilters/SearchBar/SearchBar"
import GenderFilter from "./UserFilters/GenderFilter/GenderFilter"
import DownloadButton from "./DownloadButton/DownloadButton"
import { Virtuoso } from "react-virtuoso"

interface UserListProps {
  initialUsers: User[]
  page: number
  seed: string
}

const UserList: React.FC<UserListProps> = ({ initialUsers, page, seed }) => {
  const { users, isLoading, hasMore, loadMoreUsers } = useUserList(
    initialUsers,
    seed
  )

  const { gender, search, setSearch, setGender } = useUserFilters()

  return (
    <div className="user-list">
      <div className="user-list__controls">
        <SearchBar value={search} onChange={setSearch} />
        <GenderFilter value={gender} onChange={setGender} />
        <DownloadButton
          users={users}
          page={page}
          gender={gender}
          seed={seed}
          nat={search}
        />
      </div>
      <div
        style={{
          height: "calc(100vh - 200px)"
        }}
      >
        <Virtuoso
          data={users}
          useWindowScroll={true}
          endReached={() => loadMoreUsers(gender, search)}
          overscan={20}
          itemContent={(index, user) => (
            <UserCard index={index} key={user.id} user={user} />
          )}
          components={{
            Footer: () => (
              <>
                {isLoading && (
                  <div className="user-list__loading" aria-live="polite">
                    Loading...
                  </div>
                )}
                {!hasMore && (
                  <div className="user-list__end" aria-live="polite">
                    No more users
                  </div>
                )}
              </>
            )
          }}
        />
      </div>
    </div>
  )
}

export default UserList
