import { useState } from "react"
import Header from "../../Header/AdminHeader"
import Sidebar from "../../sidebar"

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

.pageHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
}

.pageTitle {
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  color: #111827;
}

.breadcrumb {
  color: #6b7280;
  font-size: 12px;
}

.card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 18px;
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.06);
}

.label {
  font-size: 12px;
  color: #111827;
  font-weight: 600;
  margin-bottom: 6px;
  display: block;
}

.input {
  width: 100%;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 10px 12px;
  font-size: 13px;
  margin-bottom: 16px;
}

.uploadBox {
  border: 2px dashed #f4b7a9;
  border-radius: 14px;
  height: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #f97316;
  background: #fff7ed;
  font-size: 13px;
}

.actionsRow {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}

.primaryBtn,
.ghostBtn {
  padding: 10px 16px;
  border-radius: 12px;
  border: 1px solid #f97316;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}

.primaryBtn {
  background: #f97316;
  color: #ffffff;
}

.ghostBtn {
  background: #ffffff;
  color: #f97316;
}

@media (max-width: 1024px) {
  .adminBody {
    flex-direction: column;
  }
}
`

export default function AddCategory() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      alert("Please enter a category name.")
      return
    }
    try {
      setIsSubmitting(true)
      const token = localStorage.getItem("token")
      if (!token) {
        alert("No token found. Please login again.")
        return
      }
      const cleanToken = token.trim().replace(/^"+|"+$/g, "")

      const res = await fetch("http://localhost:8080/api/categories", {
        method: "POST",
        headers: {
          ...(cleanToken ? { Authorization: `Bearer ${cleanToken}` } : {}),
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: name.trim(),
          description: description.trim(),
        }),
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
        throw new Error(
          `Failed to add category (status ${res.status})${details ? `: ${details}` : ""}`
        )
      }

      alert("Category added successfully")
      setName("")
      setDescription("")
    } catch (error) {
      console.error(error)
      alert((error as Error).message || "Unable to add category")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="adminPage">
      <style>{STYLES}</style>
      <Header showAuth={false} />
      <div className="adminBody">
        <Sidebar />
        <main className="adminMain">
          <div className="pageHeader">
            <h1 className="pageTitle">Add Category</h1>
            <div className="breadcrumb">Dashboard &gt; Category &gt; Add Category</div>
          </div>

          <form className="card" onSubmit={handleSubmit}>
            <label className="label">
              Category name <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <input
              className="input"
              placeholder="Category name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label className="label">Description</label>
            <textarea
              className="input"
              placeholder="All electronic items"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              style={{ resize: "vertical" }}
            />

            <div className="actionsRow">
              <button className="primaryBtn" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Adding..." : "Add Category"}
              </button>
              <button
                className="ghostBtn"
                type="button"
                onClick={() => {
                  setName("")
                  setDescription("")
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  )
}
