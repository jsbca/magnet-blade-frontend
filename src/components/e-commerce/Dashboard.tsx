import { useEffect, useState } from 'react'
import Header from '../user/PrimaryHeader'
import SecondaryHeader from '../user/SecondaryHeader'
import Footer from './Footer'

type Product = {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
}

export default function Dashboard() {
  const API_BASE = "http://localhost:8080"
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [activeCategory, setActiveCategory] = useState("All")
  const [addingId, setAddingId] = useState<string | null>(null)
  const [addError, setAddError] = useState("")
  const [addSuccess, setAddSuccess] = useState("")

  const normalizeProducts = (input: unknown): Product[] => {
    if (!Array.isArray(input)) return []
    return input
      .map((item, index) => {
        if (!item || typeof item !== 'object') return null
        const record = item as Record<string, unknown>
        const name = String(record.name ?? record.title ?? record.productName ?? '')
        const description = String(
          record.description ?? record.desc ?? record.details ?? record.summary ?? ''
        )
        const priceValue = Number(record.price ?? record.amount ?? 0)
        const image =
          String(record.image ?? record.imageUrl ?? record.thumbnail ?? record.photo ?? '') || ''
        const category = String(record.category ?? record.categoryName ?? record.category_name ?? '')
        return {
          id: String(record.id ?? record._id ?? record.slug ?? `p-${index}-${name}`),
          name: name || 'Untitled product',
          description,
          price: Number.isFinite(priceValue) ? priceValue : 0,
          image,
          category: category || "Uncategorized",
        }
      })
      .filter((item): item is Product => Boolean(item))
  }

  const resolveImageUrl = (value: string) => {
    if (!value) return ""
    const trimmed = value.trim()
    if (!trimmed) return ""
    if (trimmed.startsWith("data:") || trimmed.startsWith("blob:")) return trimmed
    if (/^https?:\/\//i.test(trimmed)) return trimmed
    if (trimmed.startsWith("/")) return `${API_BASE}${trimmed}`
    if (trimmed.startsWith("uploads/")) return `${API_BASE}/${trimmed}`
    return `${API_BASE}/uploads/${trimmed}`
  }

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

  const handleAddToCart = async (product: Product) => {
    const userId = getUserIdFromToken()
    try {
      setAddError("")
      setAddSuccess("")
      setAddingId(product.id)

      if (!userId) {
        const raw = localStorage.getItem("guestCart")
        const list = raw ? (JSON.parse(raw) as Product & { quantity?: number }[]) : []
        const existing = list.find((item) => String(item.id) === String(product.id))
        if (existing) {
          existing.quantity = (existing.quantity ?? 1) + 1
        } else {
          list.push({ ...product, quantity: 1 })
        }
        localStorage.setItem("guestCart", JSON.stringify(list))
        const count = list.reduce((sum, item) => sum + (item.quantity ?? 1), 0)
        localStorage.setItem("cartCount", String(count))
        window.dispatchEvent(new CustomEvent("cart-updated", { detail: { count } }))
        setAddSuccess(`Added ${product.name} to cart`)
        setTimeout(() => setAddSuccess(""), 2000)
        return
      }

      const token = localStorage.getItem("token")
      const cleanToken = token ? token.trim().replace(/^"+|"+$/g, "") : ""
      const res = await fetch("http://localhost:8080/api/cart/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(cleanToken ? { Authorization: `Bearer ${cleanToken}` } : {}),
        },
        body: JSON.stringify({
          userId,
          productId: Number(product.id),
          quantity: 1,
        }),
      })
      if (!res.ok) {
        let details = ""
        try {
          const contentType = res.headers.get("content-type") ?? ""
          if (contentType.includes("application/json")) {
            const errJson = await res.json()
            details = typeof errJson === "string" ? errJson : JSON.stringify(errJson)
          } else {
            details = await res.text()
          }
        } catch {
          // ignore parsing errors
        }
        throw new Error(
          `Failed to add to cart (status ${res.status})${details ? `: ${details}` : ""}`
        )
      }
      const existingCount = Number(localStorage.getItem("cartCount") ?? "0")
      const nextCount = Number.isFinite(existingCount) ? existingCount + 1 : 1
      localStorage.setItem("cartCount", String(nextCount))
      window.dispatchEvent(new CustomEvent("cart-updated", { detail: { count: nextCount } }))
      setAddSuccess(`Added ${product.name} to cart`)
      setTimeout(() => setAddSuccess(""), 2000)
    } catch (error) {
      console.error(error)
      setAddError((error as Error).message || "Unable to add to cart")
    } finally {
      setAddingId(null)
    }
  }

  useEffect(() => {
    let isMounted = true

    const loadProducts = async () => {
      const token = localStorage.getItem('token')
      const cleanToken = token ? token.trim().replace(/^"+|"+$/g, '') : ''
      const res = await fetch('http://localhost:8080/api/products', {
        headers: {
          ...(cleanToken ? { Authorization: `Bearer ${cleanToken}` } : {}),
        },
      })
      if (!res.ok) {
        throw new Error('Failed to load products')
      }
      return res.json()
    }

    loadProducts()
      .then((data) => {
        if (isMounted) {
          setProducts(normalizeProducts(data))
          setHasError(false)
        }
      })
      .catch(() => {
        if (isMounted) {
          setProducts([])
          setHasError(true)
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  const categories = ["All", ...new Set(products.map((product) => product.category))]
  const visibleProducts =
    activeCategory === "All"
      ? products
      : products.filter((product) => product.category === activeCategory)

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#ffffff",
      }}
    >
      <Header showAuth={true} />
      <div
        style={{
          width: "100%",
          maxWidth: "100%",
          margin: "0",
          padding: "28px 40px 56px",
          flex: 1,
          color: "#111111",
        }}
      >
        {addSuccess && (
          <div
            style={{
              position: "fixed",
              top: "90px",
              right: "24px",
              background: "#111111",
              color: "#ffffff",
              padding: "10px 14px",
              borderRadius: "10px",
              boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
              zIndex: 50,
            }}
          >
            {addSuccess}
          </div>
        )}
        <SecondaryHeader
          title="Shop by category"
          subtitle="Filter the product list by category."
          categories={categories}
          activeCategory={activeCategory}
          onCategorySelect={setActiveCategory}
        />
        <div
          style={{
            padding: "24px 26px",
            borderRadius: "20px",
            background: "#ffffff",
            border: "1px solid rgba(17, 17, 17, 0.1)",
            boxShadow: "0 18px 36px rgba(17, 17, 17, 0.08)",
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
                  color: "rgba(17,17,17,0.55)",
                }}
              >
                Magnet Blade
              </p>
              <h1 style={{ margin: "8px 0 6px", fontSize: "30px" }}>
                Welcome to the Magnet Blade
              </h1>
             
            </div>
           
          </div>

          <div
            style={{
              marginTop: "22px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "18px",
            }}
          >
            {visibleProducts.map((product) => (
              <div
                key={product.id}
                style={{
                  padding: "14px",
                  borderRadius: "16px",
                  border: "1px solid rgba(17, 17, 17, 0.12)",
                  background: "#ffffff",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <img
                  src={
                    resolveImageUrl(product.image) ||
                    "https://via.placeholder.com/300x300?text=Product"
                  }
                  alt={product.name}
                  style={{
                    width: "100%",
                    aspectRatio: "1 / 1",
                    objectFit: "cover",
                    borderRadius: "12px",
                  }}
                  onError={(event) => {
                    const target = event.currentTarget
                    if (target.dataset.fallbackApplied) return
                    target.dataset.fallbackApplied = "true"
                    target.src = "https://via.placeholder.com/300x300?text=Product"
                  }}
                />
                <div style={{ fontWeight: 600 }}>{product.name}</div>
                {product.description && (
                  <div style={{ color: "rgba(17,17,17,0.65)", fontSize: "13px" }}>
                    {product.description}
                  </div>
                )}
                <div style={{ fontWeight: 600, color: "rgba(17,17,17,0.9)" }}>
                  ₹{product.price.toFixed(2)}
                </div>
                <button
                  type="button"
                  style={{
                    marginTop: "6px",
                    padding: "8px 12px",
                    borderRadius: "10px",
                    border: "1px solid rgba(17, 17, 17, 0.18)",
                    background: "#111111",
                    color: "#ffffff",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                    opacity: addingId === product.id ? 0.7 : 1,
                  }}
                  onClick={() => handleAddToCart(product)}
                  disabled={addingId === product.id}
                >
                  {addingId === product.id ? "Adding..." : "Add to cart"}
                </button>
                {addError && addingId !== product.id && (
                  <div style={{ color: "#b91c1c", fontSize: "12px" }}>{addError}</div>
                )}
              </div>
            ))}
            {!isLoading && products.length === 0 && (
              <div style={{ color: "rgba(17,17,17,0.7)" }}>
                {hasError ? "Unable to load products." : "No products found."}
              </div>
            )}
            {isLoading && (
              <div style={{ color: "rgba(17,17,17,0.7)" }}>Loading products...</div>
            )}
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
