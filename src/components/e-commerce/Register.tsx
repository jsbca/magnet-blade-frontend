import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Register() {

  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const navigate = useNavigate()

  const handleRegister = async () => {

    try {

      const response = await axios.post(
        "http://localhost:8080/api/users/register",
        {
          name: name,
          email: email,
          password: password
        }
      )

      alert("User Registered Successfully")

      console.log(response.data)

      navigate("/login") // redirect to login page

    } catch (error) {

      console.error(error)

      alert("Registration Failed")

    }

  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 16px",
        background:
          "radial-gradient(circle at top, rgba(178, 204, 111, 0.25), transparent 55%), #f7f8fb",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "28px",
          borderRadius: "20px",
          background: "#ffffff",
          border: "1px solid rgba(15, 18, 24, 0.08)",
          boxShadow: "0 20px 40px rgba(15, 18, 24, 0.12)",
          color: "#111111",
        }}
      >
        <div style={{ marginBottom: "18px" }}>
          <p
            style={{
              margin: 0,
              fontSize: "12px",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "rgba(17,17,17,0.55)",
            }}
          >
            Magnet Blade
          </p>
          <h2 style={{ margin: "8px 0 6px", fontSize: "28px" }}>
            Create your account
          </h2>
          <p style={{ margin: 0, color: "rgba(17,17,17,0.7)" }}>
            Join us to track orders and manage your profile.
          </p>
        </div>

        <label style={{ display: "block", marginBottom: "14px" }}>
          <span style={{ fontSize: "13px", color: "rgba(17,17,17,0.7)" }}>
            Name
          </span>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: "100%",
              marginTop: "6px",
              padding: "12px 14px",
              borderRadius: "10px",
              border: "1px solid rgba(15, 18, 24, 0.12)",
              background: "#f2f4f8",
              color: "#111111",
              outline: "none",
            }}
          />
        </label>

        <label style={{ display: "block", marginBottom: "14px" }}>
          <span style={{ fontSize: "13px", color: "rgba(17,17,17,0.7)" }}>
            Email
          </span>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              marginTop: "6px",
              padding: "12px 14px",
              borderRadius: "10px",
              border: "1px solid rgba(15, 18, 24, 0.12)",
              background: "#f2f4f8",
              color: "#111111",
              outline: "none",
            }}
          />
        </label>

        <label style={{ display: "block", marginBottom: "20px" }}>
          <span style={{ fontSize: "13px", color: "rgba(17,17,17,0.7)" }}>
            Password
          </span>
          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              marginTop: "6px",
              padding: "12px 14px",
              borderRadius: "10px",
              border: "1px solid rgba(15, 18, 24, 0.12)",
              background: "#f2f4f8",
              color: "#111111",
              outline: "none",
            }}
          />
        </label>

        <button
          onClick={handleRegister}
          style={{
            width: "100%",
            padding: "12px 16px",
            borderRadius: "12px",
            border: "none",
            background: "linear-gradient(135deg, #b2cc6f, #6fd1b7)",
            color: "#0f1218",
            fontWeight: 700,
            fontSize: "15px",
            cursor: "pointer",
          }}
        >
          Register
        </button>
      </div>
    </div>
  )
}
