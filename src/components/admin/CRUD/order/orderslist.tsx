import { useMemo } from "react"
import Header from "../../Header/AdminHeader"
import Sidebar from "../../sidebar"

type OrderRow = {
  id: string
  product: string
  customer: string
  price: string
  date: string
  status: "Shipped" | "Refunded" | "Cancelled" | "Completed"
  image: string
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

.ordersPage {
  color: #111827;
  font-family: "Segoe UI", system-ui, sans-serif;
}

.ordersHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
}

.ordersTitle {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
}

.controls {
  display: flex;
  gap: 10px;
  align-items: center;
}

.selectBox,
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
}

.selectBox select,
.searchBox input {
  border: none;
  outline: none;
  font-size: 13px;
  background: transparent;
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
  width: 36px;
  height: 36px;
  border-radius: 10px;
  object-fit: cover;
  background: #f3f4f6;
}

.muted {
  color: #6b7280;
  font-size: 12px;
}

.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  border: 1px solid transparent;
}

.badge.shipped {
  color: #92400e;
  background: #fff7ed;
  border-color: #fed7aa;
}

.badge.refunded {
  color: #4b5563;
  background: #f3f4f6;
  border-color: #e5e7eb;
}

.badge.cancelled {
  color: #b91c1c;
  background: #fee2e2;
  border-color: #fecaca;
}

.badge.completed {
  color: #047857;
  background: #ecfdf3;
  border-color: #a7f3d0;
}

.actionLink {
  color: #6d28d9;
  text-decoration: none;
  font-weight: 600;
}

.footerRow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
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
}
`

const SAMPLE_ROWS: OrderRow[] = [
  {
    id: "OR001",
    product: "Basic Crew T-Shirt",
    customer: "John Maxwell",
    price: "$50.00",
    date: "08-12-2023",
    status: "Shipped",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=120&auto=format&fit=crop",
  },
  {
    id: "OR002",
    product: "Jackets",
    customer: "John Maxwell",
    price: "$50.00",
    date: "04-30-2024",
    status: "Refunded",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=120&auto=format&fit=crop",
  },
  {
    id: "OR003",
    product: "QuickSell Essentials",
    customer: "John Maxwell",
    price: "$50.00",
    date: "11-05-2023",
    status: "Cancelled",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=120&auto=format&fit=crop",
  },
  {
    id: "OR004",
    product: "SmartCart Solutions",
    customer: "John Maxwell",
    price: "$69.00",
    date: "07-22-2024",
    status: "Completed",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=120&auto=format&fit=crop",
  },
  {
    id: "OR005",
    product: "SecureSell Vault",
    customer: "John Maxwell",
    price: "$69.00",
    date: "01-18-2023",
    status: "Completed",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=120&auto=format&fit=crop",
  },
  {
    id: "OR006",
    product: "eCommerceExpress Kit",
    customer: "Chris Gaffney",
    price: "$69.00",
    date: "09-09-2023",
    status: "Refunded",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=120&auto=format&fit=crop",
  },
  {
    id: "OR007",
    product: "SellixSync Connect",
    customer: "John Maxwell",
    price: "$69.00",
    date: "06-27-2024",
    status: "Cancelled",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=120&auto=format&fit=crop",
  },
  {
    id: "OR008",
    product: "ClicknSell Dynamics",
    customer: "John Maxwell",
    price: "$50.00",
    date: "03-14-2023",
    status: "Shipped",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=120&auto=format&fit=crop",
  },
]

export default function OrdersList() {
  const rows = useMemo(() => SAMPLE_ROWS, [])

  return (
    <div className="adminPage">
      <style>{STYLES}</style>
      <Header showAuth={false} />
      <div className="adminBody">
        <Sidebar />
        <main className="adminMain">
          <div className="ordersPage">
            <div className="ordersHeader">
              <h2 className="ordersTitle">Orders</h2>
              <div className="controls">
                <label className="selectBox">
                  <span>All Statuses</span>
                  <select defaultValue="all" aria-label="Filter status">
                    <option value="all">All Statuses</option>
                    <option value="shipped">Shipped</option>
                    <option value="refunded">Refunded</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="completed">Completed</option>
                  </select>
                </label>
                <label className="searchBox">
                  <span>🔍</span>
                  <input placeholder="Search" />
                </label>
              </div>
            </div>

            <div className="card">
              <table className="table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Product</th>
                    <th>Customer Name</th>
                    <th>Price</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th> </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.id}>
                      <td className="muted">{row.id}</td>
                      <td>
                        <div className="row">
                          <img src={row.image} alt={row.product} />
                          <div>
                            <div>{row.product}</div>
                            <div className="muted">Short Description</div>
                          </div>
                        </div>
                      </td>
                      <td className="muted">{row.customer}</td>
                      <td>{row.price}</td>
                      <td className="muted">{row.date}</td>
                      <td>
                        <span
                          className={`badge ${
                            row.status === "Shipped"
                              ? "shipped"
                              : row.status === "Refunded"
                              ? "refunded"
                              : row.status === "Cancelled"
                              ? "cancelled"
                              : "completed"
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td>
                        <a className="actionLink" href="#">
                          ⋮
                        </a>
                      </td>
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
