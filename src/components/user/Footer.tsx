export type FooterProps = {
  companyName: string
  description: string
  officeAddress: string
  branchAddress: string
  phone: string
  email: string
  linkUrl: string
  linkLabel: string
}

import { FOOTER_TEXT } from "../../constants/colors"

export default function Footer({
  companyName,
  description,
  officeAddress,
  branchAddress,
  phone,
  email,
  linkUrl,
  linkLabel,
}: FooterProps) {
  return (
    <footer
      style={{
        background: "#2b2b2b",
        color: "#f0f0f0",
        padding: "48px 60px 36px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(260px, 1.2fr) minmax(260px, 1fr)",
          gap: "32px",
          alignItems: "center",
          paddingBottom: "28px",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          marginBottom: "36px",
        }}
      >
        <div>
          <h2 style={{ margin: 0, fontSize: "22px" }}>Many desktop publishing</h2>
          <p style={{ marginTop: "10px", color: "rgba(255,255,255,0.65)" }}>
            Do you want to receive exclusive email offers? Subscribe to our newsletter!
            You will receive a unique promo code which gives you a 20% discount on all
            our products in 10 minutes.
          </p>
        </div>
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            justifyContent: "flex-end",
          }}
        >
          <input
            type="email"
            placeholder="Enter your email"
            style={{
              minWidth: "260px",
              padding: "12px 14px",
              borderRadius: "0",
              border: "1px solid rgba(255,255,255,0.2)",
              background: "#ffffff",
              color: "#111",
              outline: "none",
            }}
          />
          <button
            style={{
              padding: "12px 22px",
              borderRadius: "0",
              border: "none",
              background: "#b8734b",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Subscribe
          </button>
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "32px",
        }}
      >
        <div>
          <h3 style={{ marginTop: 0 }}>{companyName}</h3>
          <p style={{ color: "rgba(255,255,255,0.65)" }}>{description}</p>
          <div style={{ display: "flex", gap: "14px", marginTop: "18px" }}>
            <span style={{ fontWeight: 700 }}>G</span>
            <span style={{ fontWeight: 700 }}>T</span>
            <span style={{ fontWeight: 700 }}>in</span>
            <span style={{ fontWeight: 700 }}>f</span>
          </div>
        </div>

        <div>
          <h4 style={{ marginTop: 0 }}>Company</h4>
          <p style={{ color: "rgba(255,255,255,0.65)" }}>What We Do</p>
          <p style={{ color: "rgba(255,255,255,0.65)" }}>Available Services</p>
          <p style={{ color: "rgba(255,255,255,0.65)" }}>Latest Posts</p>
          <p style={{ color: "rgba(255,255,255,0.65)" }}>FAQs</p>
        </div>

        <div>
          <h4 style={{ marginTop: 0 }}>My Account</h4>
          <p style={{ color: "rgba(255,255,255,0.65)" }}>Sign In</p>
          <p style={{ color: "rgba(255,255,255,0.65)" }}>View Cart</p>
          <p style={{ color: "rgba(255,255,255,0.65)" }}>Order Tracking</p>
          <p style={{ color: "rgba(255,255,255,0.65)" }}>Help & Support</p>
        </div>

        <div>
          <h4 style={{ marginTop: 0 }}>Customer Service</h4>
          <p style={{ color: "rgba(255,255,255,0.65)" }}>Help & Contact Us</p>
          <p style={{ color: "rgba(255,255,255,0.65)" }}>Returns & Refunds</p>
          <p style={{ color: "rgba(255,255,255,0.65)" }}>Online Stores</p>
          <p style={{ color: "rgba(255,255,255,0.65)" }}>Terms & Conditions</p>
        </div>
      </div>

      {/* Bottom Line */}
      <div
        style={{
          marginTop: "36px",
          borderTop: "1px solid rgba(255,255,255,0.15)",
          paddingTop: "18px",
          textAlign: "center",
          fontSize: "14px",
          color: "rgba(255,255,255,0.6)",
        }}
      >
        © {new Date().getFullYear()} {companyName}. All Rights Reserved.
      </div>
    </footer>
  )
}
