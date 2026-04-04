import { Link, useLocation } from "react-router-dom"

const SIDEBAR_STYLES = `
.adminSidebar {
  width: 240px;
  min-height: calc(100vh - 72px);
  background: linear-gradient(180deg, #f5f6fb, #eef1f8);
  border-right: 1px solid #e5e7eb;
  padding: 18px 14px;
  border-radius: 18px;
}

.sidebarGroup {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sidebarItem {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 12px;
  color: #111827;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: background 0.2s ease, color 0.2s ease;
}

.sidebarItem:hover {
  background: #e9ecf6;
}

.sidebarItem.active {
  background: linear-gradient(135deg, #c4b5fd, #8b5cf6);
  color: #ffffff;
  box-shadow: 0 8px 18px rgba(139, 92, 246, 0.25);
}

.sidebarIcon {
  width: 28px;
  height: 28px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  color: inherit;
  font-size: 14px;
  box-shadow: 0 4px 10px rgba(15, 23, 42, 0.06);
}

.sidebarItem.active .sidebarIcon {
  background: rgba(255, 255, 255, 0.2);
}

@media (max-width: 1024px) {
  .adminSidebar {
    width: 200px;
  }
}

@media (max-width: 820px) {
  .adminSidebar {
    width: 100%;
    min-height: auto;
    border-right: none;
  }
}
`

const NAV_ITEMS = [
  { label: "Dashboard", to: "/admin", icon: "⬚" },
  { label: "Products", to: "/admin/products", icon: "📦" },
  { label: "Category", to: "/admin/category", icon: "📁" },
  { label: "Inventory", to: "/admin/inventory", icon: "🧾" },
  { label: "Orders", to: "/admin/orders", icon: "🛒" },
  { label: "Invoices", to: "/admin/invoices", icon: "🧾" },
  { label: "Users", to: "/admin/users", icon: "👤" },
  { label: "Settings", to: "/admin/settings", icon: "⚙" },
]

export default function Sidebar() {
  const location = useLocation()

  return (
    <aside className="adminSidebar">
      <style>{SIDEBAR_STYLES}</style>
      <nav className="sidebarGroup" aria-label="Admin sidebar">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.to
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`sidebarItem${isActive ? " active" : ""}`}
            >
              <span className="sidebarIcon" aria-hidden="true">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
