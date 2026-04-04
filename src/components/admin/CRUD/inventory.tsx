import { useMemo, useState } from "react"
import Header from "../Header/AdminHeader"
import Sidebar from "../sidebar"

type InventoryRow = {
  id: string
  item: string
  stockDate: string
  qty: number
  vessel: string
  terminal: string
  productType: string
  nomination: string
  locationStatus: string
  loadedDate: string
  offloadedDate: string
  status: "In Stock" | "Low Stock" | "Out of Stock"
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

.inventoryPage {
  color: #111827;
  font-family: "Segoe UI", system-ui, sans-serif;
}

.headerRow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 14px;
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

.pillBtn,
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
  background: #0f2a52;
  color: #ffffff;
}

.statGrid {
  display: grid;
  grid-template-columns: repeat(5, minmax(180px, 1fr));
  gap: 14px;
  margin-bottom: 16px;
}

.statCard {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 14px;
  box-shadow: 0 10px 20px rgba(15, 23, 42, 0.05);
}

.statLabel {
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 6px;
}

.statValue {
  font-size: 18px;
  font-weight: 700;
  color: #111827;
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
  padding: 12px 12px;
  background: #eff6ff;
  border-bottom: 1px solid #e5e7eb;
  white-space: nowrap;
}

.table tbody td {
  padding: 12px 12px;
  border-bottom: 1px solid #eef2f7;
  font-size: 12px;
  color: #111827;
  vertical-align: top;
}

.itemTitle {
  font-weight: 600;
}

.itemSub {
  color: #6b7280;
  font-size: 11px;
}

.statusBadge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  background: #ecfdf3;
  color: #047857;
  border: 1px solid #a7f3d0;
}

.actionBtn {
  border: none;
  background: transparent;
  cursor: pointer;
  color: #6b7280;
  font-weight: 700;
}

@media (max-width: 1200px) {
  .statGrid {
    grid-template-columns: repeat(2, minmax(180px, 1fr));
  }
}

@media (max-width: 1024px) {
  .adminBody {
    flex-direction: column;
  }
}
`

const SAMPLE_ROWS: InventoryRow[] = [
  {
    id: "INV-001",
    item: "Women Men Frosted Curved Dress Up Ring Fashion Classical Style",
    stockDate: "08/02/2024 12:05 PM",
    qty: 258,
    vessel: "Vessel name",
    terminal: "Terminal number",
    productType: "Women Dress",
    nomination: "08/02/2024 12:05 PM",
    locationStatus: "In Stock",
    loadedDate: "08/02/2024 12:05 PM",
    offloadedDate: "08/02/2024 12:05 PM",
    status: "In Stock",
  },
  {
    id: "INV-002",
    item: "Men's Leather Wallet Classic Design",
    stockDate: "08/03/2024 10:15 AM",
    qty: 150,
    vessel: "Leather Goods",
    terminal: "Terminal A",
    productType: "Men's Accessories",
    nomination: "08/03/2024 10:15 AM",
    locationStatus: "In Stock",
    loadedDate: "08/03/2024 10:15 AM",
    offloadedDate: "08/03/2024 10:15 AM",
    status: "In Stock",
  },
  {
    id: "INV-003",
    item: "Kids Fun Splash Water Shoes",
    stockDate: "08/04/2024 11:00 AM",
    qty: 320,
    vessel: "Footwear",
    terminal: "Terminal B",
    productType: "Kids Fashion",
    nomination: "08/04/2024 11:00 AM",
    locationStatus: "In Stock",
    loadedDate: "08/04/2024 11:00 AM",
    offloadedDate: "08/04/2024 11:00 AM",
    status: "In Stock",
  },
]

export default function Inventory() {
  const rows = useMemo(() => SAMPLE_ROWS, [])
  const [filter, setFilter] = useState("all")

  return (
    <div className="adminPage">
      <style>{STYLES}</style>
      <Header showAuth={false} />
      <div className="adminBody">
        <Sidebar />
        <main className="adminMain">
          <div className="inventoryPage">
            <div className="headerRow">
              <h2 className="pageTitle">Inventory</h2>
              <div className="headerActions">
                <button className="pillBtn">Vessel name ▾</button>
                <button className="pillBtn" onClick={() => setFilter("all")}>
                  Filter by
                </button>
                <button className="primaryBtn">+ Add Inventory</button>
              </div>
            </div>

            <section className="statGrid">
              <div className="statCard">
                <div className="statLabel">Total products</div>
                <div className="statValue">648</div>
              </div>
              <div className="statCard">
                <div className="statLabel">Total Nom.</div>
                <div className="statValue">CHF 64.2K</div>
              </div>
              <div className="statCard">
                <div className="statLabel">Total Loaded</div>
                <div className="statValue">168%</div>
              </div>
              <div className="statCard">
                <div className="statLabel">Total Offloaded</div>
                <div className="statValue">168%</div>
              </div>
              <div className="statCard">
                <div className="statLabel">Loss</div>
                <div className="statValue">168%</div>
              </div>
            </section>

            <div className="card">
              <table className="table">
                <thead>
                  <tr>
                    <th>#Id</th>
                    <th>Item</th>
                    <th>Stock date</th>
                    <th>Qty.</th>
                    <th>Vessel Name</th>
                    <th>Terminal Number</th>
                    <th>Product type</th>
                    <th>Nomination Date</th>
                    <th>Location Status</th>
                    <th>Loaded date</th>
                    <th>Off-Loaded date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.id}>
                      <td className="itemSub">{row.id}</td>
                      <td>
                        <div className="itemTitle">{row.item}</div>
                        <div className="itemSub">UPC: 1315 2345 15454</div>
                      </td>
                      <td className="itemSub">{row.stockDate}</td>
                      <td>{row.qty}</td>
                      <td className="itemSub">{row.vessel}</td>
                      <td className="itemSub">{row.terminal}</td>
                      <td className="itemSub">{row.productType}</td>
                      <td className="itemSub">{row.nomination}</td>
                      <td>
                        <span className="statusBadge">{row.status}</span>
                      </td>
                      <td className="itemSub">{row.loadedDate}</td>
                      <td className="itemSub">{row.offloadedDate}</td>
                      <td>
                        <button className="actionBtn">⋮</button>
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
