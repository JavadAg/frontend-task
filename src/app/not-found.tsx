import Link from "next/link"
import "../styles/_not-found.scss"

export default function NotFound() {
  return (
    <div className="not-found-wrapper">
      <div className="not-found-card">
        <div className="not-found-card__icon" aria-hidden>
          🔍
        </div>
        <h1 className="not-found-card__heading">404 - Page Not Found</h1>
        <p className="not-found-card__message">
          The page you are looking for does not exist.
        </p>
        <Link href="/" className="main-nav__link">
          Go back home
        </Link>
      </div>
    </div>
  )
}
