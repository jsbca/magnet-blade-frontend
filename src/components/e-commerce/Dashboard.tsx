import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PRODUCTS } from '../../App'
import Header from './PrimaryHeader'
import Footer from './Footer'
import { clearStoredRole } from '../../utils/auth'

export default function Dashboard() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    clearStoredRole()
    navigate('/login')
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background:
          "radial-gradient(circle at top, rgba(178, 204, 111, 0.22), transparent 60%), #0f1218",
      }}
    >
      <Header showAuth={true} />
      <div
        style={{
          width: "100%",
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "28px 20px 56px",
          flex: 1,
          color: "#f5f5f5",
        }}
      >
        <div
          style={{
            padding: "24px 26px",
            borderRadius: "20px",
            background:
              "linear-gradient(180deg, rgba(19, 24, 32, 0.98), rgba(14, 18, 24, 0.92))",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            boxShadow: "0 18px 36px rgba(0, 0, 0, 0.35)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <div>
              <p
                style={{
                  margin: 0,
                  fontSize: "12px",
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.55)",
                }}
              >
                Magnet Blade
              </p>
              <h1 style={{ margin: "8px 0 6px", fontSize: "30px" }}>
                Welcome to the Magnet Blade
              </h1>
             
            </div>
            <button
              onClick={handleLogout}
              style={{
                padding: "12px 18px",
                borderRadius: "12px",
                border: "1px solid rgba(255, 255, 255, 0.18)",
                background: "transparent",
                color: "#f5f5f5",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
           
            </button>
          </div>

          <div
            style={{
              marginTop: "22px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "18px",
            }}
          >
            {PRODUCTS.map((product) => (
              <div
                key={product.id}
                style={{
                  padding: "14px",
                  borderRadius: "16px",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  background: "rgba(255, 255, 255, 0.05)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "100%",
                    aspectRatio: "1 / 1",
                    objectFit: "cover",
                    borderRadius: "12px",
                  }}
                />
                <div style={{ fontWeight: 600 }}>{product.name}</div>
                <div style={{ color: "rgba(255,255,255,0.65)", fontSize: "13px" }}>
                  {product.description}
                </div>
                <div style={{ fontWeight: 600, color: "rgba(255,255,255,0.9)" }}>
                  ${product.price.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer
        companyName="Magnet Blade"
        description="Magnet Blade is committed to happy customers, through quality blades, including circle, square, and rectangular blades."
        officeAddress="Tower A, Connaught Place, New Delhi, India"
        branchAddress="Sector 62, Noida, Uttar Pradesh, India"
        phone="+91 98765 43210"
        email="support@magnetblade.com"
        linkUrl="https://vitejs.dev"
        linkLabel="Powered by Magnet Blade"
      />
    </div>
  )
}
