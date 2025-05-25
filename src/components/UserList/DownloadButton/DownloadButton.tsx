import type { User } from "@/types/user.type"
import { apiUrl } from "@/configs/api"

interface DownloadButtonProps {
  users: User[]
  page: number
  gender: string | null
  nat: string | null
  seed: string
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  users,
  page = 1,
  gender,
  seed,
  nat
}) => {
  const handleDownload = () => {
    const results = users.length
    const params = new URLSearchParams({
      page: page.toString(),
      results: results.toString(),
      format: "csv",
      dl: "true",
      seed: seed
    })

    if (gender) params.append("gender", gender)
    if (nat) params.append("nat", nat)

    const url = `${apiUrl}?${params.toString()}`
    window.open(url, "_blank")
  }

  return (
    <button
      className="download-button"
      onClick={handleDownload}
      aria-label="Download current user list as CSV"
    >
      Download
    </button>
  )
}

export default DownloadButton
