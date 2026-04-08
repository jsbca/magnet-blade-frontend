import { useEffect, useState } from "react"
import Header from "../../Header/AdminHeader"
import Sidebar from "../../sidebar"
import { Link } from "react-router-dom"

type CategoryRow = {
  id: string
  name: string
  icon: string
  description: string
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

.modalOverlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 20;
}

.modalCard {
  width: min(520px, 100%);
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.18);
  padding: 18px;
}

.modalTitle {
  margin: 0 0 12px;
  font-size: 16px;
  font-weight: 700;
  color: #111827;
}

.modalField {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 12px;
}

.modalLabel {
  font-size: 12px;
  color: #6b7280;
  font-weight: 600;
}

.modalInput,
.modalTextarea {
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 10px 12px;
  font-size: 13px;
  outline: none;
}

.modalTextarea {
  min-height: 90px;
  resize: vertical;
}

.modalActions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.modalBtn {
  padding: 8px 14px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  cursor: pointer;
}

.modalBtn.primary {
  border: none;
  background: #2563eb;
  color: #ffffff;
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

const DEFAULT_ICON = "🏷️"

const formatDate = (value: unknown) => {
  if (!value) return "—"
  const date = value instanceof Date ? value : new Date(String(value))
  if (Number.isNaN(date.getTime())) return "—"
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

const normalizeCategories = (input: unknown): CategoryRow[] => {
  if (!Array.isArray(input)) return []

  return input
    .map((item, index) => {
      if (typeof item === "string") {
        return {
          id: `cat-${index}-${item}`,
          name: item,
          icon: DEFAULT_ICON,
          description: "—",
        }
      }

      if (item && typeof item === "object") {
        const record = item as Record<string, unknown>
        const name = String(
          record.name ??
            record.title ??
            record.category ??
            record.categoryName ??
            record.category_name ??
            "Untitled category"
        )

        const descriptionRaw =
          record.description ??
          record.desc ??
          record.details ??
          record.summary ??
          record.notes ??
          ""

        return {
          id: String(record.id ?? record._id ?? record.slug ?? `cat-${index}-${name}`),
          name,
          icon: String(record.icon ?? record.emoji ?? record.symbol ?? DEFAULT_ICON),
          description: descriptionRaw ? String(descriptionRaw).trim() : "—",
        }
      }

      return null
    })
    .filter((row): row is CategoryRow => Boolean(row))
}

export default function Categories() {
  const [rows, setRows] = useState<CategoryRow[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isEditLoading, setIsEditLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [editError, setEditError] = useState("")
  const [selectedId, setSelectedId] = useState("")
  const [editName, setEditName] = useState("")
  const [editDescription, setEditDescription] = useState("")

  const loadCategories = async () => {
    const token = localStorage.getItem("token")
    const cleanToken = token ? token.trim().replace(/^"+|"+$/g, "") : ""
    const res = await fetch("http://localhost:8080/api/categories", {
      headers: {
        ...(cleanToken ? { Authorization: `Bearer ${cleanToken}` } : {}),
      },
    })
    if (!res.ok) {
      throw new Error("Failed to load categories")
    }
    return res.json()
  }

  useEffect(() => {
    let isMounted = true

    loadCategories()
      .then((data) => {
        if (isMounted) {
          setRows(normalizeCategories(data))
          setHasError(false)
        }
      })
      .catch(() => {
        if (isMounted) {
          setRows([])
          setHasError(true)
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  const extractDescription = (record: Record<string, unknown>) => {
    const value =
      record.description ??
      record.desc ??
      record.details ??
      record.summary ??
      record.notes ??
      ""
    return value ? String(value).trim() : ""
  }

  const handleOpenEdit = async (id: string) => {
    setSelectedId(id)
    setIsEditOpen(true)
    setIsEditLoading(true)
    setEditError("")

    try {
      const token = localStorage.getItem("token")
      const cleanToken = token ? token.trim().replace(/^"+|"+$/g, "") : ""
      const res = await fetch(`http://localhost:8080/api/categories/${id}`, {
        headers: {
          ...(cleanToken ? { Authorization: `Bearer ${cleanToken}` } : {}),
        },
      })
      if (!res.ok) {
        throw new Error("Failed to load category")
      }
      const data = await res.json()
      if (data && typeof data === "object") {
        const record = data as Record<string, unknown>
        setEditName(
          String(
            record.name ??
              record.title ??
              record.category ??
              record.categoryName ??
              record.category_name ??
              ""
          )
        )
        setEditDescription(extractDescription(record))
      } else {
        setEditName(String(data ?? ""))
        setEditDescription("")
      }
    } catch (error) {
      console.error(error)
      setEditError("Unable to load category details.")
      setEditName("")
      setEditDescription("")
    } finally {
      setIsEditLoading(false)
    }
  }

  const handleCloseEdit = () => {
    if (isSaving) return
    setIsEditOpen(false)
    setSelectedId("")
    setEditName("")
    setEditDescription("")
    setEditError("")
  }

  const handleUpdateCategory = async () => {
    if (!selectedId) return
    if (!editName.trim()) {
      setEditError("Category name is required.")
      return
    }

    setIsSaving(true)
    setEditError("")
    try {
      const token = localStorage.getItem("token")
      const cleanToken = token ? token.trim().replace(/^"+|"+$/g, "") : ""
      const payload = {
        name: editName.trim(),
        description: editDescription.trim() || undefined,
      }

      let res = await fetch(`http://localhost:8080/api/categories/${selectedId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(cleanToken ? { Authorization: `Bearer ${cleanToken}` } : {}),
        },
        body: JSON.stringify(payload),
      })

      if (res.status === 405) {
        res = await fetch(`http://localhost:8080/api/categories/${selectedId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            ...(cleanToken ? { Authorization: `Bearer ${cleanToken}` } : {}),
          },
          body: JSON.stringify(payload),
        })
      }

      if (!res.ok) {
        throw new Error("Failed to update category")
      }
      const data = await loadCategories()
      setRows(normalizeCategories(data))
      setIsEditOpen(false)
      setSelectedId("")
    } catch (error) {
      console.error(error)
      setEditError("Unable to update category.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteCategory = async (id: string) => {
    const confirmed = window.confirm("Delete this category?")
    if (!confirmed) return

    try {
      const token = localStorage.getItem("token")
      const cleanToken = token ? token.trim().replace(/^"+|"+$/g, "") : ""
      const res = await fetch(`http://localhost:8080/api/categories/${id}`, {
        method: "DELETE",
        headers: {
          ...(cleanToken ? { Authorization: `Bearer ${cleanToken}` } : {}),
        },
      })
      if (!res.ok) {
        throw new Error("Failed to delete category")
      }
      const data = await loadCategories()
      setRows(normalizeCategories(data))
    } catch (error) {
      console.error(error)
      alert("Unable to delete category.")
    }
  }

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
                    <th>Description</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.id}>
                      <td>
                        <div className="row">
                          <div className="thumb">{row.icon}</div>
                          <strong>{row.name}</strong>
                        </div>
                      </td>
                      <td className="muted">{row.description || "—"}</td>
                      <td>
                        <span className="actionsCell">
                          <button
                            className="actionIcon edit"
                            aria-label="Edit"
                            onClick={() => handleOpenEdit(row.id)}
                          >
                            ✎
                          </button>
                          <button
                            className="actionIcon delete"
                            aria-label="Delete"
                            onClick={() => handleDeleteCategory(row.id)}
                          >
                            🗑
                          </button>
                        </span>
                      </td>
                    </tr>
                  ))}
                  {!isLoading && rows.length === 0 && (
                    <tr>
                      <td className="muted" colSpan={3}>
                        {hasError ? "Unable to load categories." : "No categories found."}
                      </td>
                    </tr>
                  )}
                  {isLoading && (
                    <tr>
                      <td className="muted" colSpan={3}>
                        Loading categories...
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
      {isEditOpen && (
        <div className="modalOverlay" role="dialog" aria-modal="true">
          <div className="modalCard">
            <h3 className="modalTitle">Update category</h3>
            {isEditLoading ? (
              <div className="muted">Loading category...</div>
            ) : (
              <>
                <label className="modalField">
                  <span className="modalLabel">Category name</span>
                  <input
                    className="modalInput"
                    value={editName}
                    onChange={(event) => setEditName(event.target.value)}
                    placeholder="Category name"
                  />
                </label>
                <label className="modalField">
                  <span className="modalLabel">Description</span>
                  <textarea
                    className="modalTextarea"
                    value={editDescription}
                    onChange={(event) => setEditDescription(event.target.value)}
                    placeholder="Optional description"
                  />
                </label>
                {editError && <div className="muted">{editError}</div>}
                <div className="modalActions">
                  <button className="modalBtn" onClick={handleCloseEdit} disabled={isSaving}>
                    Cancel
                  </button>
                  <button
                    className="modalBtn primary"
                    onClick={handleUpdateCategory}
                    disabled={isSaving}
                  >
                    {isSaving ? "Updating..." : "Update category"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
