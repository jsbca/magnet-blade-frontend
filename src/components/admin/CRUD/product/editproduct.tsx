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

export default function EditProduct() {
  return (
    <div className="adminPage">
      <style>{STYLES}</style>
      <Header showAuth={false} />
      <div className="adminBody">
        <Sidebar />
        <main className="adminMain">
          <div className="pageHeader">
            <h1 className="pageTitle">Edit Product</h1>
            <div className="headerActions">
              <button className="ghostBtn">Save Draft</button>
              <button className="primaryBtn">Update Product</button>
            </div>
          </div>

          <div className="grid">
            <div className="card">
              <h2 className="cardTitle">General Information</h2>
              <div className="formGrid">
                <label className="field">
                  <span className="label">Product Name</span>
                  <input className="input" defaultValue="Beats Solo 2" />
                </label>
                <label className="field">
                  <span className="label">Product ID</span>
                  <input className="input" defaultValue="554762" />
                </label>
              </div>
              <label className="field" style={{ marginTop: "12px" }}>
                <span className="label">Description</span>
                <textarea className="textarea" defaultValue="Type here..." />
              </label>

              <div className="cardTitle" style={{ marginTop: "18px" }}>
                Pricing & Stock
              </div>
              <div className="formGrid">
                <label className="field">
                  <span className="label">Price</span>
                  <input className="input" defaultValue="50 USD" />
                </label>
                <label className="field">
                  <span className="label">Discount Type</span>
                  <select className="select" defaultValue="new-year">
                    <option value="new-year">New Year Discount</option>
                    <option value="festive">Festive Offer</option>
                  </select>
                </label>
                <label className="field">
                  <span className="label">Discount Percentage (%)</span>
                  <input className="input" defaultValue="10" />
                </label>
                <label className="field">
                  <span className="label">Stock Quantity</span>
                  <input className="input" defaultValue="120" />
                </label>
              </div>
            </div>

            <div className="card">
              <h2 className="cardTitle">Upload Image</h2>
              <div className="uploadPreview">Main Image Preview</div>
              <div className="thumbRow">
                <div className="thumb">+</div>
                <div className="thumb">+</div>
                <div className="thumb">+</div>
              </div>

              <div className="cardTitle" style={{ marginTop: "18px" }}>
                Categories & Brand
              </div>
              <div className="twoCol">
                <label className="field">
                  <span className="label">Categories</span>
                  <select className="select" defaultValue="headphones">
                    <option value="headphones">Headphones</option>
                    <option value="accessories">Accessories</option>
                  </select>
                </label>
                <label className="field">
                  <span className="label">Brand Name</span>
                  <input className="input" defaultValue="Beats" />
                </label>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
