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
        background: "#ffffff",
        color: "#111111",
        borderTop: "1px solid rgba(17,17,17,0.1)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "5px",
          padding: "10px 24px 10px",
        }}
      >
        <div>
          <h3 style={{ marginTop: 0 }}>Contact Us</h3>
          <p style={{ color: "rgba(17,17,17,0.7)", margin: "8px 0" }}>
            Email: {email}
          </p>
          <p style={{ color: "rgba(17,17,17,0.7)", margin: "8px 0" }}>
            Phone: {phone}
          </p>
          <p style={{ color: "rgba(17,17,17,0.7)", margin: "8px 0" }}>
            Address: {officeAddress}
          </p>
        </div>

        <div>
          <h3 style={{ marginTop: 0 }}>Quick Links</h3>
          <p style={{ color: "rgba(17,17,17,0.7)", margin: "8px 0" }}>Home</p>
          {/* <p style={{ color: "rgba(17,17,17,0.7)", margin: "8px 0" }}>About</p>
          <p style={{ color: "rgba(17,17,17,0.7)", margin: "8px 0" }}>Services</p> */}
          <p style={{ color: "rgba(17,17,17,0.7)", margin: "8px 0" }}>Contact</p>
          <p style={{ color: "rgba(17,17,17,0.7)", margin: "8px 0" }}>Products</p>
        </div>

        <div>
          <h3 style={{ marginTop: 0 }}>Follow Us</h3>
          <div style={{ display: "flex", gap: "12px", marginTop: "10px" }}>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              style={{ display: "inline-flex", color: "inherit" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M14 8.5h2.5V6h-2.5C12 6 10.5 7.5 10.5 9.5V12H8v2.5h2.5V19h2.5v-4.5H15l.5-2.5h-2.5V9.5c0-.6.4-1 1-1Z"
                  fill="currentColor"
                />
              </svg>
            </a>

            <a
              href="https://www.instagram.com/#"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              style={{ display: "inline-flex", color: "inherit" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7.5 3.5h9a4 4 0 0 1 4 4v9a4 4 0 0 1-4 4h-9a4 4 0 0 1-4-4v-9a4 4 0 0 1 4-4Zm0 2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-9Zm4.5 2.5a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm4.75-.75a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5Z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "14px",
          padding: "0 48px 14px",
          flexWrap: "wrap",
        }}
      >
        <input
          type="email"
          placeholder="Enter your email"
          style={{
            minWidth: "280px",
            padding: "10px 14px",
            borderRadius: "2px",
            border: "1px solid rgba(17,17,17,0.2)",
            background: "#ffffff",
            color: "#111111",
            outline: "none",
          }}
        />
        <button
          style={{
            padding: "10px 18px",
            borderRadius: "2px",
            border: "none",
            background: "#51a2e8",
            color: "#ffffff",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Subscribe
        </button>
      </div>

      <div
        style={{
          background: "#84c0f1",
          color: "#111111",
          padding: "10px 12px",
          textAlign: "center",
          fontSize: "14px",
        }}
      >
        © {new Date().getFullYear()} {companyName}. All Rights Reserved.
      </div>
    </footer>
  )
}
