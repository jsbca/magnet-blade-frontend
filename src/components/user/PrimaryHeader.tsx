import logo from "../../assets/Logo.png"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { OFFERS } from "./SecondaryHeader"


const HEADER_TITLE = "Magnet Blade Store"
const HEADER_STYLES = `
.headerWrapper {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.header {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 72px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  background-color: #ffffff;
  color: #111827;
  padding: 0 32px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: inherit;
}

.brandLogo {
  width: 38px;
  height: 38px;
  object-fit: contain;
  display: block;
  border-radius: 10px;
}

.title {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.01em;
}

.nav {
  display: flex;
  align-items: center;
  gap: 26px;
  font-weight: 500;
  color: #6b7280;
}

.navLink {
  color: inherit;
  text-decoration: none;
  font-size: 15px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.navLink:hover {
  color: #111827;
}

.dropdown {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.dropdownToggle {
  color: inherit;
  text-decoration: none;
  font-size: 15px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

.dropdownMenu {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 10px;
  min-width: 180px;
  padding: 10px;
  border-radius: 12px;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 18px 30px rgba(0, 0, 0, 0.08);
  display: none;
  flex-direction: column;
  gap: 8px;
  z-index: 20;
}

.dropdown:hover .dropdownMenu {
  display: flex;
}

.dropdownItem {
  color: #111827;
  text-decoration: none;
  font-size: 14px;
  padding: 6px 8px;
  border-radius: 8px;
}

.dropdownItem:hover {
  background: rgba(17, 24, 39, 0.06);
}

.actions {
  display: flex;
  align-items: center;
  gap: 14px;
}

.searchBox {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border: 1px solid #111827;
  border-radius: 8px;
  min-width: 220px;
  background: #ffffff;
}

.searchIcon {
  font-size: 16px;
}

.searchInput {
  border: none;
  outline: none;
  font-size: 14px;
  width: 160px;
  background: transparent;
}

.iconButton {
  border: none;
  background: transparent;
  font-size: 18px;
  cursor: pointer;
  color: #111827;
  padding: 6px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.iconButton:hover {
  color: #000000;
}

.auth {
  display: inline-flex;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  padding: 8px 12px;
  border-radius: 999px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  cursor: pointer;
  color: #111827;
  text-decoration: none;
  transition: all 0.2s ease;
}

.auth.primary {
  background: #111827;
  color: #ffffff;
}

@media (max-width: 720px) {
  .header {
    padding: 0 16px;
    height: auto;
    gap: 12px;
    flex-wrap: wrap;
    padding-bottom: 12px;
  }

  .nav {
    flex-wrap: wrap;
    justify-content: center;
    gap: 18px;
    padding-bottom: 12px;
  }

  .actions {
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
    padding-bottom: 8px;
  }

  .searchBox {
    min-width: 200px;
  }
}
`

type HeaderProps = {
  showAuth?: boolean
}

export default function Header({ showAuth = true }: HeaderProps) {
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const readCount = () => {
      const raw = Number(localStorage.getItem("cartCount") ?? "0")
      setCartCount(Number.isFinite(raw) ? raw : 0)
    }
    readCount()

    const handleUpdate = () => readCount()
    window.addEventListener("storage", handleUpdate)
    window.addEventListener("cart-updated", handleUpdate as EventListener)
    return () => {
      window.removeEventListener("storage", handleUpdate)
      window.removeEventListener("cart-updated", handleUpdate as EventListener)
    }
  }, [])
  const offers = OFFERS
  return (
    <div className="headerWrapper">
      <style>{HEADER_STYLES}</style>

      <header className="header">
        <Link className="brand" to="/">
          <img className="brandLogo" src={logo} alt="Magnet Blade logo" />
          <span className="title">{HEADER_TITLE}</span>
        </Link>

        <nav className="nav" aria-label="Primary">
          <Link className="navLink" to="/">Home</Link>
         

          <div className="dropdown">
            <span className="dropdownToggle">Magnets ▾</span>
            <div className="dropdownMenu" role="menu">
              <Link className="dropdownItem" to="/about">Most Papular</Link>
              <Link className="dropdownItem" to="/contact">Square Magnets</Link>
              <Link className="dropdownItem" to="/faq">Round Magnets</Link>
              <Link className="dropdownItem" to="/faq">Puzzles</Link>
            </div>
          </div>

          <div className="dropdown">
            <span className="dropdownToggle">Collections ▾</span>
            <div className="dropdownMenu" role="menu">
              <Link className="dropdownItem" to="/shop">School Blade</Link>
              <Link className="dropdownItem" to="/shop/new">Employee Blade</Link>
              <Link className="dropdownItem" to="/shop/sale">Navratri Special</Link>
            </div>
          </div>
           <Link className="navLink" to="/contact">Contact Us</Link>

        </nav>

        <div className="actions">
          <div className="searchBox">
            <span className="searchIcon">🔍</span>
            <input className="searchInput" placeholder="Search For Decor" />
          </div>
          <Link className="iconButton" to="/login" aria-label="Account">👤</Link>
          <Link className="iconButton" to="/cart" aria-label="Cart" style={{ position: "relative" }}>
            🛒
            {cartCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-4px",
                  right: "-6px",
                  background: "#111111",
                  color: "#ffffff",
                  borderRadius: "999px",
                  padding: "2px 6px",
                  fontSize: "10px",
                  fontWeight: 700,
                  lineHeight: 1,
                }}
              >
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </header>
    </div>
  )
}
