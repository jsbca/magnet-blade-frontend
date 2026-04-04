import { useState } from "react"
import Header from "../../Header/AdminHeader"
import Sidebar from "../../sidebar"
import { resolveRoleFromToken } from "../../../../utils/auth"

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
  margin-bottom: 18px;
}

.pageTitle {
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  color: #111827;
}

.headerActions {
  display: flex;
  gap: 10px;
  align-items: center;
}

.ghostBtn,
.primaryBtn {
  padding: 8px 14px;
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
  background: #4f46e5;
  color: #ffffff;
}

.grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px;
  gap: 18px;
}

.card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.06);
}

.cardTitle {
  margin: 0 0 12px;
  font-size: 16px;
  font-weight: 700;
  color: #111827;
}

.formGrid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.label {
  font-size: 12px;
  color: #6b7280;
  font-weight: 600;
}

.input,
.select,
.textarea {
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 10px 12px;
  font-size: 13px;
  outline: none;
}

.textarea {
  min-height: 110px;
  resize: vertical;
}

.uploadPreview {
  width: 100%;
  height: 180px;
  border-radius: 14px;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  font-size: 13px;
  margin-bottom: 12px;
}

.thumbRow {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.thumb {
  height: 70px;
  border-radius: 12px;
  background: #eef2ff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4f46e5;
  font-weight: 700;
}

.twoCol {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

@media (max-width: 1024px) {
  .adminBody {
    flex-direction: column;
  }

  .grid {
    grid-template-columns: 1fr;
  }
}
`

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    status: "ACTIVE",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")

  const decodeJwtPayload = (token: string) => {
    try {
      const payload = token.split(".")[1]
      if (!payload) return null
      const base64 = payload.replace(/-/g, "+").replace(/_/g, "/")
      const json = atob(base64)
      return JSON.parse(json)
    } catch {
      return null
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    setImageFile(file)
    if (file) {
      const previewUrl = URL.createObjectURL(file)
      setImagePreview(previewUrl)
    } else {
      setImagePreview("")
    }
  }

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault()
    }

    if (!form.name.trim() || !form.category.trim()) {
      alert("Please fill in product name and category.")
      return
    }
    if (!imageFile) {
      alert("Please select an image file.")
      return
    }

    const formData = new FormData()
    formData.append("name", form.name.trim())
    formData.append("category", form.category.trim())
    formData.append("price", String(Number(form.price)))
    formData.append("stock", String(Number(form.stock)))
    formData.append("status", form.status)
    formData.append("image", imageFile)

    try {
      setIsSubmitting(true)
      const token = localStorage.getItem("token")
      if (!token) {
        alert("No token found. Please login again.")
        return
      }
      const cleanToken = token.trim().replace(/^"+|"+$/g, "")

      const tokenRole = resolveRoleFromToken(token)
      console.log("Add product role:", tokenRole)
      console.log("Add product token (trimmed):", cleanToken)
      const decoded = decodeJwtPayload(cleanToken)
      console.log("Add product token payload:", decoded)
      if (decoded?.exp) {
        const expMs = decoded.exp * 1000
        const nowMs = Date.now()
        console.log("Add product token exp:", new Date(expMs).toISOString())
        console.log("Add product token now:", new Date(nowMs).toISOString())
        console.log("Add product token expired:", nowMs >= expMs)
      }

      const res = await fetch("http://localhost:8080/api/products", {
        method: "POST",
        headers: {
          ...(cleanToken ? { Authorization: `Bearer ${cleanToken}` } : {}),
        },
        body: formData,
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
          `Failed to add product (status ${res.status})${details ? `: ${details}` : ""}`
        )
      }

      alert("Product added successfully")
      setForm({
        name: "",
        category: "",
        price: "",
        stock: "",
        status: "ACTIVE",
      })
      setImageFile(null)
      setImagePreview("")
    } catch (error) {
      console.error(error)
      alert((error as Error).message || "Unable to add product")
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
          <form onSubmit={handleSubmit}>
            <div className="pageHeader">
              <h1 className="pageTitle">Add New Product</h1>
              <div className="headerActions">
                <button className="ghostBtn" type="button">
                  Save Draft
                </button>
                <button className="primaryBtn" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Adding..." : "Add Product"}
                </button>
              </div>
            </div>

            <div className="grid">
              <div className="card">
                <h2 className="cardTitle">General Information</h2>
                <div className="formGrid">
                  <label className="field">
                    <span className="label">Product Name</span>
                    <input
                      className="input"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="T-Shirt"
                    />
                  </label>
                </div>
                <label className="field" style={{ marginTop: "12px" }}>
                  <span className="label">Category</span>
                  <input
                    className="input"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    placeholder="Women Cloths"
                  />
                </label>

                <div className="cardTitle" style={{ marginTop: "18px" }}>
                  Pricing & Stock
                </div>
                <div className="formGrid">
                  <label className="field">
                    <span className="label">Price</span>
                    <input
                      className="input"
                      name="price"
                      type="number"
                      value={form.price}
                      onChange={handleChange}
                      placeholder="79.8"
                    />
                  </label>
                  <label className="field">
                    <span className="label">Status</span>
                    <select
                      className="select"
                      name="status"
                      value={form.status}
                      onChange={handleChange}
                    >
                      <option value="ACTIVE">ACTIVE</option>
                      <option value="INACTIVE">INACTIVE</option>
                    </select>
                  </label>
                <label className="field">
                  <span className="label">Stock Quantity</span>
                  <input
                    className="input"
                    name="stock"
                    type="number"
                    value={form.stock}
                    onChange={handleChange}
                    placeholder="79"
                  />
                </label>
              </div>
            </div>

            <div className="card">
              <h2 className="cardTitle">Upload Image</h2>
              <div className="uploadPreview">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "14px",
                      }}
                    />
                  ) : (
                    "Main Image Preview"
                  )}
                </div>
              <label className="field" style={{ marginBottom: "12px" }}>
                <span className="label">Select Image</span>
                <input
                  className="input"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
                <div className="thumbRow">
                  <div className="thumb">+</div>
                  <div className="thumb">+</div>
                  <div className="thumb">+</div>
                </div>

                <div className="cardTitle" style={{ marginTop: "18px" }}>
                  Preview
                </div>
                <div className="twoCol">
                  <label className="field">
                    <span className="label">Name</span>
                    <input className="input" value={form.name} readOnly />
                  </label>
                  <label className="field">
                    <span className="label">Category</span>
                    <input className="input" value={form.category} readOnly />
                  </label>
                </div>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  )
}
