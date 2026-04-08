import { useEffect, useMemo, useState } from "react"
import Header from "./PrimaryHeader"
import Footer from "../e-commerce/Footer"

type CartItem = {
  id: number
  productId: number
  name: string
  price: number
  quantity: number
  image?: string
}

const STYLES = `
.cartPage {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  color: #111111;
}

.cartMain {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 20px 64px;
  flex: 1;
}

.cartHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 18px;
}

.cartTitle {
  margin: 0;
  font-size: 26px;
}

.cartGrid {
  display: grid;
  gap: 12px;
}

.cartRow {
  display: grid;
  grid-template-columns: 60px 1.4fr 0.8fr 0.6fr 0.6fr;
  gap: 12px;
  align-items: center;
  padding: 12px;
  border: 1px solid rgba(17, 17, 17, 0.1);
  border-radius: 14px;
  background: #ffffff;
}

.thumb {
  width: 54px;
  height: 54px;
  border-radius: 10px;
  object-fit: cover;
  background: #f3f4f6;
}

.muted {
  color: rgba(17, 17, 17, 0.6);
  font-size: 12px;
}

.qtyInput {
  width: 70px;
  padding: 8px 10px;
  border-radius: 10px;
  border: 1px solid rgba(17, 17, 17, 0.2);
}

.btn {
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid rgba(17, 17, 17, 0.2);
  background: #111111;
  color: #ffffff;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
}

.btn.ghost {
  background: #ffffff;
  color: #111111;
}

.summary {
  margin-top: 18px;
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  align-items: center;
}

@media (max-width: 820px) {
  .cartRow {
    grid-template-columns: 60px 1fr;
  }

  .summary {
    justify-content: flex-start;
    flex-wrap: wrap;
  }
}
`

const API_BASE = "http://localhost:8080"

const decodeJwtPayload = (token: string) => {
  try {
    const payload = token.split(".")[1]
    if (!payload) return null
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/")
    const json = atob(base64)
    return JSON.parse(json) as Record<string, unknown>
  } catch {
    return null
  }
}

const getUserIdFromToken = () => {
  const token = localStorage.getItem("token")
  if (!token) return null
  const cleanToken = token.trim().replace(/^"+|"+$/g, "")
  const payload = decodeJwtPayload(cleanToken)
  const rawId = payload?.userId ?? payload?.user_id ?? payload?.id ?? null
  if (rawId === null || rawId === undefined) return null
  const id = Number(rawId)
  return Number.isFinite(id) ? id : null
}

const resolveImageUrl = (value?: string) => {
  if (!value) return ""
  const trimmed = value.trim()
  if (!trimmed) return ""
  if (trimmed.startsWith("data:") || trimmed.startsWith("blob:")) return trimmed
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  if (trimmed.startsWith("/")) return `${API_BASE}${trimmed}`
  if (trimmed.startsWith("uploads/")) return `${API_BASE}/${trimmed}`
  return `${API_BASE}/uploads/${trimmed}`
}

export default function Cart() {
  const [items, setItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  )

  const totalCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  )

  const syncCartCount = (count: number) => {
    localStorage.setItem("cartCount", String(count))
    window.dispatchEvent(new CustomEvent("cart-updated", { detail: { count } }))
  }

  const normalizeItems = (data: unknown): CartItem[] => {
    const list = Array.isArray(data) ? data : (data as { items?: unknown[] })?.items
    if (!Array.isArray(list)) return []
    return list
      .map((item) => {
        if (!item || typeof item !== "object") return null
        const record = item as Record<string, unknown>
        const product = (record.product ?? record.productDto ?? {}) as Record<string, unknown>
        const name = String(record.productName ?? product.name ?? record.name ?? "Product")
        const price = Number(record.price ?? product.price ?? 0)
        return {
          id: Number(record.itemId ?? record.id ?? 0),
          productId: Number(record.productId ?? product.id ?? 0),
          name,
          price: Number.isFinite(price) ? price : 0,
          quantity: Number(record.quantity ?? 1),
          image: String(record.image ?? product.image ?? product.imageUrl ?? ""),
        }
      })
      .filter((row): row is CartItem => Boolean(row && row.id))
  }

  const enrichImagesFromProducts = async (rows: CartItem[]) => {
    const missing = rows.filter((row) => !row.image).map((row) => row.productId)
    if (missing.length === 0) return rows

    const token = localStorage.getItem("token")
    const cleanToken = token ? token.trim().replace(/^"+|"+$/g, "") : ""
    const res = await fetch("http://localhost:8080/api/products", {
      headers: {
        ...(cleanToken ? { Authorization: `Bearer ${cleanToken}` } : {}),
      },
    })
    if (!res.ok) return rows
    const data = await res.json()
    if (!Array.isArray(data)) return rows

    const imageMap = new Map<number, string>()
    data.forEach((product) => {
      if (!product || typeof product !== "object") return
      const record = product as Record<string, unknown>
      const id = Number(record.id ?? record._id ?? 0)
      if (!Number.isFinite(id) || !id) return
      const image = String(record.image ?? record.imageUrl ?? record.thumbnail ?? record.photo ?? "")
      if (image) {
        imageMap.set(id, image)
      }
    })

    return rows.map((row) => ({
      ...row,
      image: row.image || imageMap.get(row.productId) || "",
    }))
  }

  const loadCart = async () => {
    const userId = getUserIdFromToken()
    if (!userId) {
      const raw = localStorage.getItem("guestCart")
      const list = raw ? (JSON.parse(raw) as CartItem[]) : []
      setItems(list)
      syncCartCount(list.reduce((sum, item) => sum + item.quantity, 0))
      setLoading(false)
      return
    }
    try {
      setError("")
      setLoading(true)
      const token = localStorage.getItem("token")
      const cleanToken = token ? token.trim().replace(/^"+|"+$/g, "") : ""
      const res = await fetch(`http://localhost:8080/api/cart/${userId}`, {
        headers: {
          ...(cleanToken ? { Authorization: `Bearer ${cleanToken}` } : {}),
        },
      })
      if (!res.ok) {
        throw new Error("Failed to load cart")
      }
      const data = await res.json()
      const normalized = normalizeItems(data)
      const enriched = await enrichImagesFromProducts(normalized)
      setItems(enriched)
      syncCartCount(enriched.reduce((sum, item) => sum + item.quantity, 0))
    } catch (err) {
      console.error(err)
      setError((err as Error).message || "Unable to load cart")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCart()
  }, [])

  const updateQuantity = async (itemId: number, quantity: number) => {
    if (quantity < 1) return
    if (!getUserIdFromToken()) {
      setItems((prev) => {
        const next = prev.map((item) =>
          item.id === itemId ? { ...item, quantity } : item
        )
        localStorage.setItem("guestCart", JSON.stringify(next))
        syncCartCount(next.reduce((sum, item) => sum + item.quantity, 0))
        return next
      })
      return
    }
    try {
      const token = localStorage.getItem("token")
      const cleanToken = token ? token.trim().replace(/^"+|"+$/g, "") : ""
      const res = await fetch(
        `http://localhost:8080/api/cart/items/${itemId}?quantity=${quantity}`,
        {
          method: "PUT",
          headers: {
            ...(cleanToken ? { Authorization: `Bearer ${cleanToken}` } : {}),
          },
        }
      )
      if (!res.ok) throw new Error("Failed to update cart item")
      await loadCart()
    } catch (err) {
      console.error(err)
      setError((err as Error).message || "Unable to update item")
    }
  }

  const removeItem = async (itemId: number) => {
    if (!getUserIdFromToken()) {
      setItems((prev) => {
        const next = prev.filter((item) => item.id !== itemId)
        localStorage.setItem("guestCart", JSON.stringify(next))
        syncCartCount(next.reduce((sum, item) => sum + item.quantity, 0))
        return next
      })
      return
    }
    try {
      const token = localStorage.getItem("token")
      const cleanToken = token ? token.trim().replace(/^"+|"+$/g, "") : ""
      const res = await fetch(`http://localhost:8080/api/cart/items/${itemId}`, {
        method: "DELETE",
        headers: {
          ...(cleanToken ? { Authorization: `Bearer ${cleanToken}` } : {}),
        },
      })
      if (!res.ok) throw new Error("Failed to remove item")
      await loadCart()
    } catch (err) {
      console.error(err)
      setError((err as Error).message || "Unable to remove item")
    }
  }

  const clearCart = async () => {
    const userId = getUserIdFromToken()
    if (!userId) {
      setItems([])
      localStorage.removeItem("guestCart")
      syncCartCount(0)
      return
    }
    try {
      const token = localStorage.getItem("token")
      const cleanToken = token ? token.trim().replace(/^"+|"+$/g, "") : ""
      const res = await fetch(`http://localhost:8080/api/cart/user/${userId}`, {
        method: "DELETE",
        headers: {
          ...(cleanToken ? { Authorization: `Bearer ${cleanToken}` } : {}),
        },
      })
      if (!res.ok) throw new Error("Failed to clear cart")
      setItems([])
      syncCartCount(0)
    } catch (err) {
      console.error(err)
      setError((err as Error).message || "Unable to clear cart")
    }
  }

  return (
    <div className="cartPage">
      <style>{STYLES}</style>
      <Header showAuth />
      <main className="cartMain">
        <div className="cartHeader">
          <h1 className="cartTitle">Your Cart</h1>
          <button className="btn ghost" onClick={clearCart}>
            Clear cart
          </button>
        </div>

        {loading && <div className="muted">Loading cart...</div>}
        {error && <div style={{ color: "#b91c1c" }}>{error}</div>}

        {!loading && items.length === 0 && !error && (
          <div className="muted">Your cart is empty.</div>
        )}

        <div className="cartGrid">
          {items.map((item) => (
            <div className="cartRow" key={item.id}>
              <img
                className="thumb"
                src={
                  resolveImageUrl(item.image) ||
                  "https://via.placeholder.com/80x80?text=Item"
                }
                alt={item.name}
                onError={(event) => {
                  const target = event.currentTarget
                  if (target.dataset.fallbackApplied) return
                  target.dataset.fallbackApplied = "true"
                  target.src = "https://via.placeholder.com/80x80?text=Item"
                }}
              />
              <div>
                <div style={{ fontWeight: 600 }}>{item.name}</div>
                <div className="muted">Product ID: {item.productId}</div>
              </div>
              <div>₹{item.price.toFixed(2)}</div>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <input
                  className="qtyInput"
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                  onBlur={(event) => updateQuantity(item.id, Number(event.target.value))}
                />
                <button className="btn ghost" onClick={() => removeItem(item.id)}>
                  Remove
                </button>
              </div>
              <div>₹{(item.price * item.quantity).toFixed(2)}</div>
            </div>
          ))}
        </div>

        <div className="summary">
          <div className="muted">Items: {totalCount}</div>
          <div style={{ fontWeight: 700 }}>Total: ₹{total.toFixed(2)}</div>
          <button className="btn" type="button">
            Checkout
          </button>
        </div>
      </main>
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
