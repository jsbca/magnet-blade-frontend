import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Header from "../../Header/AdminHeader"
import Sidebar from "../../sidebar"
import { resolveRoleFromToken } from "../../../../utils/auth"

type ProductRow = {
  id: string | number
  name: string
  category: string
  price: string | number
  stock: number
  status: "Scheduled" | "Active" | "Draft" | string
  imageUrl?: string
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

.productsPage {
  padding: 0;
  color: #111827;
  font-family: "Segoe UI", system-ui, sans-serif;
}

.productsHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
}

.productsTitle {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
}

.actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

.actionBtn {
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  cursor: pointer;
}

.actionBtn.primary {
  border: none;
  background: #6d28d9;
  color: #ffffff;
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

.badge.active {
  color: #047857;
  background: #ecfdf3;
  border-color: #a7f3d0;
}

.badge.scheduled {
  color: #1d4ed8;
  background: #eff6ff;
  border-color: #bfdbfe;
}

.badge.draft {
  color: #b45309;
  background: #fff7ed;
  border-color: #fed7aa;
}

.actionLink {
  color: #6d28d9;
  text-decoration: none;
  font-weight: 600;
}

.actionLink:hover {
  text-decoration: underline;
}

.actionDelete {
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid #fecaca;
  background: #fee2e2;
  color: #b91c1c;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
}

.actionDelete:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.checkboxCell {
  width: 40px;
}

@media (max-width: 1024px) {
  .adminBody {
    flex-direction: column;
  }
}
`

export default function ProductsList() {
  const [rows, setRows] = useState<ProductRow[]>([])
  const [deletingId, setDeletingId] = useState<string | number | null>(null)
  const imageBaseUrl = "http://localhost:8080/uploads/"
  const apiBaseUrl = "http://localhost:8080/api/products"

  const resolveImageUrl = (imageUrl?: string) => {
    if (!imageUrl) return ""
    if (/^https?:\/\//i.test(imageUrl)) return imageUrl
    return `${imageBaseUrl}${imageUrl.replace(/^\/+/, "")}`
  }

  useEffect(() => {
    let isMounted = true

    fetch(apiBaseUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load products")
        }
        return response.json()
      })
      .then((data: ProductRow[]) => {
        if (isMounted) {
          setRows(Array.isArray(data) ? data : [])
        }
      })
      .catch(() => {
        if (isMounted) {
          setRows([])
        }
      })

    return () => {
      isMounted = false
    }
  }, [apiBaseUrl])

  const handleDelete = async (id: string | number) => {
    const confirmed = window.confirm("Delete this product?")
    if (!confirmed) return

    const token = localStorage.getItem("token")
    if (!token) {
      alert("No token found. Please login again.")
      return
    }
    const cleanToken = token.trim().replace(/^"+|"+$/g, "")
    const tokenRole = resolveRoleFromToken(cleanToken)
    if (tokenRole && tokenRole !== "admin") {
      alert("You are not authorized to delete products.")
      return
    }

    try {
      setDeletingId(id)
      const res = await fetch(`${apiBaseUrl}/${id}`, {
        method: "DELETE",
        headers: {
          ...(cleanToken ? { Authorization: `Bearer ${cleanToken}` } : {}),
        },
      })

      if (!res.ok) {
        let details = ""
        try {
          const contentType = res.headers.get("content-type") ?? ""
          if (contentType.includes("application/json")) {
            const errJson = await res.json()
            details = typeof errJson === "string" ? errJson : JSON.stringify(errJson)
          } else {
            details = await res.text()
          }
        } catch {
          // ignore parsing errors
        }
        if (res.status === 401 || res.status === 403) {
          throw new Error(
            `Not authorized to delete this product (status ${res.status})${
              details ? `: ${details}` : ""
            }`
          )
        }
        throw new Error(
          `Failed to delete product (status ${res.status})${details ? `: ${details}` : ""}`
        )
      }

      setRows((prev) => prev.filter((row) => row.id !== id))
    } catch (error) {
      console.error(error)
      alert((error as Error).message || "Unable to delete product")
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="adminPage">
      <style>{STYLES}</style>
      <Header showAuth={false} />
      <div className="adminBody">
        <Sidebar />
        <main className="adminMain">
          <div className="productsPage">
            <div className="productsHeader">
              <h2 className="productsTitle">Products list</h2>
              <div className="actions">
                <button className="actionBtn">Filter</button>
                <button className="actionBtn">See All</button>
                <Link className="actionBtn primary" to="/admin/products/add">+ Add</Link>
              </div>
            </div>

            <div className="card">
              <table className="table">
                <thead>
                  <tr>
                    <th className="checkboxCell"> </th>
                    <th>S.No</th>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Status</th>
                    <th>Act</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, index) => (
                    <tr key={row.id}>
                      <td className="checkboxCell">
                        <input type="checkbox" />
                      </td>
                      <td>{index + 1}</td>
                      <td>
                        <div className="row">
                          {resolveImageUrl(row.imageUrl) ? (
                            <img src={resolveImageUrl(row.imageUrl)} alt={row.name} />
                          ) : null}
                          <div>
                            <div>{row.name}</div>
                            <div className="muted">{row.category}</div>
                          </div>
                        </div>
                      </td>
                      <td className="muted">{row.category}</td>
                      <td>
                        {typeof row.price === "number"
                          ? `$${row.price.toFixed(2)}`
                          : row.price}
                      </td>
                      <td>{row.stock}</td>
                      <td>
                        {(() => {
                          const statusText = String(row.status || "Draft")
                          const statusKey = statusText.toLowerCase()
                          const badgeClass =
                            statusKey === "active"
                              ? "active"
                              : statusKey === "scheduled"
                              ? "scheduled"
                              : "draft"

                          return (
                            <span className={`badge ${badgeClass}`}>
                              {statusText}
                            </span>
                          )
                        })()}
                      </td>
                      <td>
                        <button
                          className="actionDelete"
                          onClick={() => handleDelete(row.id)}
                          disabled={deletingId === row.id}
                        >
                          {deletingId === row.id ? "Deleting..." : "Del"}
                        </button>
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
