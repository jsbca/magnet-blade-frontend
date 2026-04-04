import React from 'react'
import Header from '../../admin/Header/AdminHeader'
import Sidebar from '../../admin/sidebar'

const ADMIN_STYLES = `
.admin {
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
  width: 100%;
  max-width: 1200px;
  padding: 0;
  flex: 1;
  color: #111827;
}

.adminHeader {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
}

.adminTitle {
  margin: 0 0 6px;
  font-size: 22px;
}

.adminSub {
  margin: 0;
  color: rgba(17, 24, 39, 0.7);
}

.statsGrid {
  margin-top: 16px;
  display: grid;
  grid-template-columns: repeat(4, minmax(200px, 1fr));
  gap: 18px;
}

.statCard {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 18px;
  padding: 18px;
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.06);
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.statHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #374151;
  font-weight: 600;
  font-size: 13px;
}

.statIcon {
  width: 34px;
  height: 34px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
}

.statValue {
  font-size: 22px;
  font-weight: 700;
  color: #111827;
}

.statDelta {
  font-size: 12px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.statDelta.up {
  color: #059669;
}

.statDelta.down {
  color: #dc2626;
}

.statMeta {
  color: #6b7280;
  font-size: 12px;
}

.iconBlue {
  background: #e0f2fe;
  color: #0284c7;
}

.iconGreen {
  background: #dcfce7;
  color: #16a34a;
}

.iconPurple {
  background: #ede9fe;
  color: #7c3aed;
}

.iconAmber {
  background: #fef3c7;
  color: #d97706;
}

@media (max-width: 1024px) {
  .adminBody {
    flex-direction: column;
  }

  .statsGrid {
    grid-template-columns: repeat(2, minmax(200px, 1fr));
  }
}

@media (max-width: 640px) {
  .statsGrid {
    grid-template-columns: 1fr;
  }
}
`



export default function AdminInventory() {



  return (
    <div className="admin">
      <style>{ADMIN_STYLES}</style>
      <Header showAuth={true} />
      <div className="adminBody">
        <Sidebar />
        <main className="adminMain">
          <div className="adminHeader">
            <div>
              <h1 className="adminTitle">Admin Dashboard</h1>
              <p className="adminSub">Overview of sales performance</p>
            </div>
          </div>

          <section className="statsGrid">
            <div className="statCard">
              <div className="statHeader">
                <span>Total Sales</span>
                <span className="statIcon iconBlue">$</span>
              </div>
              <div className="statValue">$12,430</div>
              <div className="statDelta up">▲ 12.5% <span className="statMeta">vs last month</span></div>
            </div>

            <div className="statCard">
              <div className="statHeader">
                <span>Orders</span>
                <span className="statIcon iconGreen">🛒</span>
              </div>
              <div className="statValue">1,240</div>
              <div className="statDelta up">▲ 8.2% <span className="statMeta">vs last month</span></div>
            </div>

            <div className="statCard">
              <div className="statHeader">
                <span>Visitors</span>
                <span className="statIcon iconPurple">👥</span>
              </div>
              <div className="statValue">24,000</div>
              <div className="statDelta down">▼ 3.4% <span className="statMeta">vs last month</span></div>
            </div>

            <div className="statCard">
              <div className="statHeader">
                <span>Conversion Rate</span>
                <span className="statIcon iconAmber">%</span>
              </div>
              <div className="statValue">3.1%</div>
              <div className="statDelta up">▲ 2.5% <span className="statMeta">vs last month</span></div>
            </div>
          </section>
        </main>
      </div>

    </div>
  )
}
