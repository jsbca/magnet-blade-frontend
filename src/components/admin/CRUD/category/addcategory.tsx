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

          <div className="card">
            <label className="label">
              Category name <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <input className="input" placeholder="Category name" />

            <label className="label">Upload images</label>
            <div className="uploadBox">
              <div style={{ fontSize: "24px" }}>☁</div>
              <div>
                Drop your images here or select <span style={{ textDecoration: "underline" }}>click to browse</span>
              </div>
            </div>

            <div className="actionsRow">
              <button className="primaryBtn">Add Category</button>
              <button className="ghostBtn">Cancel</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
