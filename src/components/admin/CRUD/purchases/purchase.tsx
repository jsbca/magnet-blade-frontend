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

.card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 18px;
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.06);
}

.muted {
  color: #6b7280;
  font-size: 13px;
}

@media (max-width: 1024px) {
  .adminBody {
    flex-direction: column;
  }
}
`

export default function Purchase() {
  return (
    <div className="adminPage">
      <style>{STYLES}</style>
      <Header showAuth={false} />
      <div className="adminBody">
        <Sidebar />
        <main className="adminMain">
          <div className="pageHeader">
            <h1 className="pageTitle">Purchases</h1>
          </div>
          <div className="card">
            <p className="muted">Purchases page UI placeholder. Share the exact layout you want and I’ll match it.</p>
          </div>
        </main>
      </div>
    </div>
  )
}
