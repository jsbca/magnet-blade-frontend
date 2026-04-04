import logo from "../../../assets/Logo.png"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { clearStoredRole } from "../../../utils/auth"

const HEADER_TITLE = "Admin Header"
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

.announcementBar {
  width: 100%;
  background: #8eada2;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 600;
  margin: 0;
}

.announcementButton {
  border: 1px solid rgba(255, 255, 255, 0.6);
  background: transparent;
  color: #ffffff;
  width: 28px;
  height: 28px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.announcementText {
  letter-spacing: 0.01em;
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

.adminWelcome {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
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

  .announcementBar {
    font-size: 12px;
    gap: 10px;
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
  const offers = [
    "Chumbak Express - Same day delivery in Bangalore",
    "Flat 20% off on all home decor orders above ₹999",
    "Free shipping on prepaid orders this weekend",
  ]
  const [offerIndex, setOfferIndex] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setInterval(() => {
      setOfferIndex((prev) => (prev + 1) % offers.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [offers.length])

  const handleLogout = () => {
    localStorage.removeItem("token")
    clearStoredRole()
    navigate("/login")
  }

  return (
    <div className="headerWrapper">
      <style>{HEADER_STYLES}</style>

      <div className="announcementBar">
        <button
          className="announcementButton"
          aria-label="Previous offer"
          onClick={() =>
            setOfferIndex((prev) => (prev - 1 + offers.length) % offers.length)
          }
        >
          ‹
        </button>
        <span className="announcementText">{offers[offerIndex]}</span>
        <button
          className="announcementButton"
          aria-label="Next offer"
          onClick={() => setOfferIndex((prev) => (prev + 1) % offers.length)}
        >
          ›
        </button>
      </div>

      <header className="header">
        <Link className="brand" to="/">
          <img className="brandLogo" src={logo} alt="Magnet Blade logo" />
          <span className="title">{HEADER_TITLE}</span>
        </Link>

        <div className="actions">
          <div className="adminWelcome">Welcome Admin Dashboard</div>
          {showAuth && (
            <button className="auth" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </header>
    </div>
  )
}
