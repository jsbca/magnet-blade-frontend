import { useMemo } from "react"
import Header from "../../Header/AdminHeader"
import Sidebar from "../../sidebar"

type UserRow = {
  id: string
  name: string
  email: string
  orders: number
  spent: string
  country: string
  avatar: string
}

const STYLES = `
.adminPage {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background:
    radial-gradient(circle at top, rgba(188, 181, 255, 0.35), transparent 60%),
    #f5f6fb;
}

.adminBody {
  display: flex;
  gap: 24px;
  padding: 24px;
  flex: 1;
}

.adminMain {
  flex: 1;
}

.usersPage {
  color: #111827;
  font-family: "Segoe UI", system-ui, sans-serif;
}

.pageHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 12px;
}

.pageTitle {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
}

.headerActions {
  display: flex;
  gap: 10px;
  align-items: center;
}

.ghostBtn,
.primaryBtn {
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  cursor: pointer;
}

.primaryBtn {
  border: none;
  background: #2563eb;
  color: #ffffff;
}

.tabRow {
  display: flex;
  gap: 8px;
  margin: 8px 0 14px;
}

.tabBtn {
  padding: 6px 12px;
  border-radius: 999px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  cursor: pointer;
}

.tabBtn.active {
  background: #eef2ff;
  color: #4f46e5;
  border-color: #e0e7ff;
}

.toolsRow {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.searchBox {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  font-size: 13px;
  color: #374151;
  min-width: 240px;
}

.searchBox input {
  border: none;
  outline: none;
  font-size: 13px;
  background: transparent;
  width: 160px;
}

.sortSelect {
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  font-size: 13px;
  color: #374151;
}

.card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.06);
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table thead th {
  text-align: left;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: #6b7280;
  padding: 14px 16px;
  background: #f9fafb;
  border-bottom: 1px solid #eef2f7;
}

.table tbody td {
  padding: 14px 16px;
  border-bottom: 1px solid #eef2f7;
  font-size: 14px;
  color: #111827;
  vertical-align: middle;
}

.row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.row img {
  width: 34px;
  height: 34px;
  border-radius: 999px;
  object-fit: cover;
  background: #f3f4f6;
}

.muted {
  color: #6b7280;
  font-size: 12px;
}

.footerRow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  font-size: 13px;
  color: #6b7280;
}

.pager {
  display: flex;
  align-items: center;
  gap: 8px;
}

.pageBtn {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  cursor: pointer;
  color: #6b7280;
  font-weight: 600;
}

.pageBtn.active {
  background: #eef2ff;
  color: #4f46e5;
  border-color: #e0e7ff;
}

@media (max-width: 1024px) {
  .adminBody {
    flex-direction: column;
  }

  .toolsRow {
    flex-direction: column;
    align-items: flex-start;
  }
}
`

const SAMPLE_ROWS: UserRow[] = [
  {
    id: "CUS-0009879",
    name: "Rakib Kowsher",
    email: "hellorakibk@gmail.com",
    orders: 138,
    spent: "$24,068",
    country: "Switzerland",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop",
  },
  {
    id: "CUS-0009878",
    name: "Kelly Smith",
    email: "kelly.098@gmail.com",
    orders: 45,
    spent: "$4,234",
    country: "United States",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop",
  },
  {
    id: "CUS-0009877",
    name: "Tyler Nick",
    email: "typer.sm@gmail.com",
    orders: 24,
    spent: "$6,087",
    country: "Austria",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=120&auto=format&fit=crop",
  },
  {
    id: "CUS-0009876",
    name: "Angela Mia",
    email: "angela.mm@gmail.com",
    orders: 12,
    spent: "$1,490",
    country: "United States",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop",
  },
  {
    id: "CUS-0009875",
    name: "Liam Hmesy",
    email: "liamnoo@gmail.com",
    orders: 24,
    spent: "$3,094",
    country: "Brazil",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop",
  },
  {
    id: "CUS-0009874",
    name: "Lucy Style",
    email: "lucy.style@gmail.com",
    orders: 66,
    spent: "$9,381",
    country: "India",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop",
  },
]

export default function UsersList() {
  const rows = useMemo(() => SAMPLE_ROWS, [])

  return (
    <div className="adminPage">
      <style>{STYLES}</style>
      <Header showAuth={false} />
      <div className="adminBody">
        <Sidebar />
        <main className="adminMain">
          <div className="usersPage">
            <div className="pageHeader">
              <h2 className="pageTitle">Customers</h2>
              <div className="headerActions">
                <button className="ghostBtn">November 2024</button>
                <button className="ghostBtn">Export</button>
                <button className="primaryBtn">+ Add Customer</button>
              </div>
            </div>

            <div className="tabRow">
              <button className="tabBtn active">All</button>
              <button className="tabBtn">Deleted</button>
            </div>

            <div className="toolsRow">
              <label className="searchBox">
                <span>🔍</span>
                <input placeholder="Search by ID, Name" />
              </label>
              <select className="sortSelect" defaultValue="sort">
                <option value="sort">Sort by</option>
                <option value="name">Name</option>
                <option value="orders">Orders</option>
                <option value="spent">Total spent</option>
              </select>
            </div>

            <div className="card">
              <table className="table">
                <thead>
                  <tr>
                    <th>Client Photo + Name</th>
                    <th>Customer ID</th>
                    <th>Email / Phone</th>
                    <th>Total Orders</th>
                    <th>Total Spent</th>
                    <th>Country</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.id}>
                      <td>
                        <div className="row">
                          <img src={row.avatar} alt={row.name} />
                          <div>
                            <div>{row.name}</div>
                            <div className="muted">{row.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="muted">#{row.id}</td>
                      <td className="muted">{row.email}</td>
                      <td>{row.orders}</td>
                      <td>{row.spent}</td>
                      <td>{row.country}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="footerRow">
                <span>Page 1 of 10</span>
                <div className="pager">
                  <button className="pageBtn">←</button>
                  <button className="pageBtn active">1</button>
                  <button className="pageBtn">2</button>
                  <button className="pageBtn">3</button>
                  <span className="muted">…</span>
                  <button className="pageBtn">8</button>
                  <button className="pageBtn">9</button>
                  <button className="pageBtn">10</button>
                  <button className="pageBtn">→</button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
