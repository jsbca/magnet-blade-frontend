import Header from "../../Header/AdminHeader"
import Sidebar from "../../sidebar"

const STYLES = `
.adminPage {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: radial-gradient(circle at top, rgba(32, 37, 50, 0.6), transparent 55%), #0b0d12;
  color: #f8fafc;
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

.topRow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 12px;
}

.backLink {
  color: #cbd5f5;
  font-size: 13px;
  text-decoration: none;
}

.orderTitle {
  margin: 4px 0;
  font-size: 26px;
  font-weight: 800;
  letter-spacing: 0.02em;
}

.statusPill {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 999px;
  background: #22d3ee;
  color: #0b0d12;
  font-size: 12px;
  font-weight: 700;
  margin-left: 8px;
}

.subText {
  color: #94a3b8;
  font-size: 12px;
}

.printBtn {
  background: linear-gradient(135deg, #fb7185, #f472b6);
  border: none;
  color: #0b0d12;
  padding: 10px 16px;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
}

.grid {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(0, 0.75fr);
  gap: 18px;
}

.card {
  background: #151821;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 18px;
  padding: 16px 18px;
  box-shadow: 0 16px 30px rgba(0, 0, 0, 0.35);
}

.cardTitle {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  font-size: 14px;
  margin-bottom: 12px;
}

.cardTitle span {
  width: 28px;
  height: 28px;
  border-radius: 10px;
  background: #1f2430;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #93c5fd;
  font-size: 14px;
}

.twoCol {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.timeline {
  display: grid;
  gap: 12px;
}

.timelineItem {
  display: grid;
  grid-template-columns: 24px 1fr;
  gap: 10px;
  align-items: start;
}

.timelineDot {
  width: 18px;
  height: 18px;
  border-radius: 999px;
  background: #22d3ee;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #0b0d12;
  font-size: 12px;
  font-weight: 700;
}

.productRow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.productInfo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.productBadge {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: #1f2430;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #e2e8f0;
  font-weight: 700;
}

.pill {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  background: #1f2937;
  color: #86efac;
}

.summaryRow {
  display: flex;
  justify-content: space-between;
  margin: 6px 0;
  color: #cbd5f5;
}

@media (max-width: 1100px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 1024px) {
  .adminBody {
    flex-direction: column;
  }
}
`

export default function Invoice() {
  return (
    <div className="adminPage">
      <style>{STYLES}</style>
      <Header showAuth={false} />
      <div className="adminBody">
        <Sidebar />
        <main className="adminMain">
          <div className="topRow">
            <a className="backLink" href="/admin/orders">← Back to Orders</a>
            <button className="printBtn">Print Invoice</button>
          </div>

          <div>
            <div className="orderTitle">
              ORDER #7821 <span className="statusPill">Delivered</span>
            </div>
            <div className="subText">Placed on October 24, 2025 10:30 AM</div>
          </div>

          <div className="grid" style={{ marginTop: "18px" }}>
            <div className="twoCol">
              <div className="card">
                <div className="cardTitle">
                  <span>👤</span> Customer Information
                </div>
                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <div className="productBadge">JC</div>
                  <div>
                    <div style={{ fontWeight: 700 }}>Jane Cooper</div>
                    <div className="subText">Customer</div>
                  </div>
                </div>
                <div className="subText" style={{ marginTop: "10px" }}>
                  Email: jane.cooper@example.com
                </div>
                <div className="subText">Phone: +1 (555) 123-4567</div>
              </div>

              <div className="card">
                <div className="cardTitle">
                  <span>🕒</span> Order Timeline
                </div>
                <div className="timeline">
                  {[
                    ["Order Placed", "Oct 24, 10:30 AM"],
                    ["Processing", "Oct 24, 11:00 AM"],
                    ["Shipped", "Oct 25, 2:00 PM"],
                    ["Out for Delivery", "Oct 27, 8:00 AM"],
                    ["Delivered", "Oct 27, 4:30 PM"],
                  ].map((item) => (
                    <div key={item[0]} className="timelineItem">
                      <div className="timelineDot">✓</div>
                      <div>
                        <div style={{ fontWeight: 700 }}>{item[0]}</div>
                        <div className="subText">{item[1]}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <div className="cardTitle">
                  <span>🎧</span> Product Details
                </div>
                <div className="productRow">
                  <div className="productInfo">
                    <div className="productBadge">SB</div>
                    <div>
                      <div style={{ fontWeight: 700 }}>Sonic Bass Pro</div>
                      <div className="subText">SKU: SBP-2900</div>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div className="subText">Qty 2</div>
                    <div className="subText">Unit $149.99</div>
                  </div>
                  <div style={{ fontWeight: 800 }}>$299.98</div>
                </div>
              </div>

              <div className="card">
                <div className="cardTitle">
                  <span>📍</span> Shipping Address
                </div>
                <div className="subText">123 Market Street</div>
                <div className="subText">San Francisco, CA 94103</div>
                <div className="subText">United States</div>
              </div>
            </div>

            <div style={{ display: "grid", gap: "16px" }}>
              <div className="card">
                <div className="cardTitle">
                  <span>💳</span> Payment Info
                </div>
                <div className="summaryRow">
                  <span>Status</span>
                  <span className="pill">Paid</span>
                </div>
                <div className="summaryRow">
                  <span>Method</span>
                  <span>Credit Card</span>
                </div>
                <div className="summaryRow">
                  <span>Card</span>
                  <span>•••• 4242</span>
                </div>
                <div className="summaryRow">
                  <span>Transaction ID</span>
                  <span>TXN23456789</span>
                </div>
              </div>

              <div className="card">
                <div className="cardTitle">
                  <span>🧾</span> Order Summary
                </div>
                <div className="summaryRow">
                  <span>Subtotal</span>
                  <span>$249.98</span>
                </div>
                <div className="summaryRow">
                  <span>Shipping</span>
                  <span>$20.00</span>
                </div>
                <div className="summaryRow">
                  <span>Tax</span>
                  <span>$30.00</span>
                </div>
                <div className="summaryRow" style={{ fontWeight: 800, color: "#f8fafc" }}>
                  <span>Total</span>
                  <span>$299.98</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
