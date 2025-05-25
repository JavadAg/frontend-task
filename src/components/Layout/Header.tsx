import Link from "next/link"

const Header = () => {
  return (
    <header className="header">
      <nav className="main-nav" role="navigation" aria-label="Main navigation">
        <div className="main-nav__container">
          <Link href="/" className="main-nav__link">
            Home
          </Link>
          <Link href="/favorites" className="main-nav__link">
            Favorites
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Header
