import Header from "../../Header/AdminHeader"
import Sidebar from "../../sidebar"
import { Link } from "react-router-dom"

type CategoryRow = {
  id: string
  name: string
  icon: string
  quantity: string
  sale: string
  startDate: string
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

.categoriesPage {
  color: #111827;
  font-family: "Segoe UI", system-ui, sans-serif;
}

.pageHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
}

.pageTitle {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: #111827;
}

.breadcrumb {
  font-size: 12px;
  color: #6b7280;
}

.controlsRow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.controlsLeft {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 12px;
  color: #6b7280;
}

.select {
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 6px 10px;
  background: #ffffff;
  font-size: 12px;
  color: #374151;
}

.searchBox {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 8px 12px;
  background: #ffffff;
  min-width: 260px;
}

.searchBox input {
  border: none;
  outline: none;
  font-size: 12px;
  background: transparent;
  width: 180px;
}

.muted {
  color: #6b7280;
}

.addBtn {
  padding: 8px 14px;
  border-radius: 12px;
  border: 1px solid #dbeafe;
  background: #ffffff;
  font-size: 13px;
  font-weight: 600;
  color: #2563eb;
  cursor: pointer;
}

.listCard {
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
  padding: 12px 14px;
  background: #f8fafc;
  border-bottom: 1px solid #eef2f7;
}

.table tbody td {
  padding: 12px 14px;
  border-bottom: 1px solid #eef2f7;
  font-size: 13px;
  color: #111827;
  vertical-align: middle;
}

.row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.thumb {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: #e2e8f0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}

.actionsCell {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.actionIcon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid #e5e7eb;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: #ffffff;
  font-size: 12px;
}

.actionIcon.view {
  color: #2563eb;
  border-color: #bfdbfe;
}

.actionIcon.edit {
  color: #16a34a;
  border-color: #bbf7d0;
}

.actionIcon.delete {
  color: #ef4444;
  border-color: #fecaca;
}

@media (max-width: 1024px) {
  .adminBody {
    flex-direction: column;
  }
}

`

const ROWS: CategoryRow[] = [
  { id: "c1", name: "Dried food", icon: "🥫", quantity: "1,638", sale: "20", startDate: "20 Nov 2023" },
  { id: "c2", name: "Wet food", icon: "🥣", quantity: "1,638", sale: "20", startDate: "20 Nov 2023" },
  { id: "c3", name: "Supplemental food", icon: "🍲", quantity: "1,638", sale: "20", startDate: "20 Nov 2023" },
  { id: "c4", name: "Puppy food", icon: "🐶", quantity: "1,638", sale: "20", startDate: "20 Nov 2023" },
  { id: "c5", name: "Food for adult dogs", icon: "🐕", quantity: "1,638", sale: "20", startDate: "20 Nov 2023" },
  { id: "c6", name: "Food for elderly dogs", icon: "🐕‍🦺", quantity: "1,638", sale: "20", startDate: "20 Nov 2023" },
  { id: "c7", name: "Kitten food", icon: "🐱", quantity: "1,638", sale: "20", startDate: "20 Nov 2023" },
  { id: "c8", name: "Food for adult cats", icon: "🐈", quantity: "1,638", sale: "20", startDate: "20 Nov 2023" },
  { id: "c9", name: "Food for elderly cats", icon: "🐈‍⬛", quantity: "1,638", sale: "20", startDate: "20 Nov 2023" },
]

export default function Categories() {
  return (
    <div className="adminPage">
      <style>{STYLES}</style>
      <Header showAuth={false} />
      <div className="adminBody">
        <Sidebar />
        <main className="adminMain">
          <div className="categoriesPage">
            <div className="pageHeader">
              <div>
                <h2 className="pageTitle">All category</h2>
                <div className="breadcrumb">Dashboard &gt; Category &gt; All category</div>
              </div>
            </div>

            <div className="controlsRow">
              <div className="controlsLeft">
                <span>Showing</span>
                <select className="select" defaultValue="10">
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
                <span>entries</span>
                <label className="searchBox">
                  <span className="muted">🔍</span>
                  <input placeholder="Search here..." />
                </label>
              </div>
              <Link className="addBtn" to="/admin/category/add">+ Add new</Link>
            </div>

            <div className="listCard">
              <table className="table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Icon</th>
                    <th>Quantity</th>
                    <th>Sale</th>
                    <th>Start date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((row) => (
                    <tr key={row.id}>
                      <td>
                        <div className="row">
                          <div className="thumb">{row.icon}</div>
                          <strong>{row.name}</strong>
                        </div>
                      </td>
                      <td className="muted">{row.icon}</td>
                      <td>{row.quantity}</td>
                      <td className="muted">{row.sale}</td>
                      <td className="muted">{row.startDate}</td>
                      <td>
                        <span className="actionsCell">
                          <button className="actionIcon view" aria-label="View">👁</button>
                          <button className="actionIcon edit" aria-label="Edit">✎</button>
                          <button className="actionIcon delete" aria-label="Delete">🗑</button>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
