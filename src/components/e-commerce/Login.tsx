import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { ensureRole, normalizeRole, resolveRoleFromToken, setStoredRole } from "../../utils/auth"

export default function Login() {

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) return

    const role = ensureRole()
    if (role === "admin") {
      navigate("/admin", { replace: true })
      return
    }
    if (role === "user") {
      navigate("/dashboard", { replace: true })
    }
  }, [navigate])

  const handleLogin = async () => {

    try {

      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email: email,
          password: password
        }
      )

      const token = response.data?.token ?? response.data

      localStorage.setItem("token", token)

      const roleFromResponse =
        response.data?.role ??
        response.data?.user?.role ??
        response.data?.roles?.[0]

      const role = normalizeRole(roleFromResponse) ?? resolveRoleFromToken(token)

      if (role) {
        setStoredRole(role)
      }

    //   alert("Login Successful")

      const targetPath = role === "admin" ? "/admin" : "/dashboard"
      navigate(targetPath, { replace: true })   // redirect to role dashboard

    } catch (error) {
      const axiosError = error as {
        response?: { status?: number; data?: unknown }
        message?: string
      }

      console.error("Login failed:", {
        status: axiosError.response?.status,
        data: axiosError.response?.data,
        message: axiosError.message,
      })

      const serverMessage =
        typeof axiosError.response?.data === "string"
          ? axiosError.response?.data
          : (axiosError.response?.data as { message?: string })?.message

      alert(serverMessage ?? "Invalid Email or Password")
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
          <h2 style={{ margin: "8px 0 6px", fontSize: "28px" }}>Welcome</h2>
          <p style={{ margin: 0, color: "rgba(17,17,17,0.7)" }}>
            Log in to manage your orders and account.
          </p>
        </div>

        <label style={{ display: "block", marginBottom: "14px" }}>
          <span style={{ fontSize: "13px", color: "rgba(17,17,17,0.7)" }}>
            Email
          </span>
          <input
            type="text"
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
            placeholder="Enter your password"
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
          onClick={handleLogin}
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
          Login
        </button>
        <p
          style={{
            marginTop: "16px",
            marginBottom: 0,
            fontSize: "14px",
            color: "rgba(17,17,17,0.7)",
            textAlign: "center",
          }}
        >
          Don&apos;t have an account?{" "}
          <a
            href="/register"
            style={{
              color: "#b2cc6f",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Create an account
          </a>
        </p>
      </div>
    </div>
  )
}
