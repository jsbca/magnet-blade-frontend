import { useState } from 'react'
import type { ReactElement } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Header from './components/user/PrimaryHeader'
import SecondaryHeader from './components/user/SecondaryHeader'
import Footer from './components/user/Footer'
import Login from './components/e-commerce/Login'
import Register from './components/e-commerce/Register'
import AdminDashboard from './components/admin/Dashboard/AdminDashboard'
import ProductsList from './components/admin/CRUD/product/productslist'
import OrdersList from './components/admin/CRUD/order/orderslist'
import UsersList from './components/admin/CRUD/users/users'
import Categories from './components/admin/CRUD/category/categories'
import Inventory from './components/admin/CRUD/inventory'
import AddProduct from './components/admin/CRUD/product/addproduct'
import AddCategory from './components/admin/CRUD/category/addcategory'
import Invoice from './components/admin/CRUD/invoice/invoice'
import Purchase from './components/admin/CRUD/purchases/purchase'
import b1 from './assets/images/b1.jpg'
import b2 from './assets/images/b2.jpg'
import b3 from './assets/images/b3.jpg'
import b4 from './assets/images/b4.jpg'
import b5 from './assets/images/b5.jpg'
import b6 from './assets/images/b6.jpg'
import b7 from './assets/images/b7.jpg'
import b8 from './assets/images/b8.jpg'
import b9 from './assets/images/b9.jpg'
import b10 from './assets/images/b10.jpg'
import {
  APP_BACKGROUND,
  CARD_BACKGROUND,
} from './constants/colors'
import UserDashboard from './components/user/UserDashboard'
import { ensureRole, getStoredRole } from './utils/auth'

const APP_STYLES = `
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: var(--app-bg, #0b0e14);
}

.main {
  flex: 1;
  padding: 1.5rem 1.25rem 2rem;
}

.products {
  display: grid;
  grid-template-columns: repeat(4, minmax(220px, 1fr));
  gap: 1rem;
}

@media (max-width: 920px) {
  .products {
    grid-template-columns: repeat(2, minmax(220px, 1fr));
  }
}

@media (max-width: 520px) {
  .products {
    grid-template-columns: 1fr;
  }
}

.productCard {
  padding: 1.1rem;
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: var(--card-bg, rgba(3, 175, 144, 0.35));
  display: flex;
  flex-direction: column;
  gap: 0.8rem;  
}

.productImage {
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.05);
  display: block;
  object-fit: cover;
}

.productDescription {
  margin: 0;
  color: rgba(255, 255, 255, 0.75);
  min-height: 3rem;
}

.productFooter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
}

.productPrice {
  font-weight: 600;
}

.addButton {
  padding: 0.55rem 0.85rem;
  border-radius: 0.7rem;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(100, 255, 215, 0.1);
  color: rgba(255, 255, 255, 0.9);
  cursor: pointer;
}

.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 1.25rem;
  font-size: 0.9rem;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
}

.footer a {
  color: rgba(100, 255, 215, 0.9);
  text-decoration: none;
}

.footer a:hover {
  text-decoration: underline;
}
`

export type Product = {
  id: string
  name: string
  price: number
  description: string
  image: string
  category: string
}

export const PRODUCTS: Product[] = [
  {
    id: 'magnet-hoodie',
    name: 'Magnet Blade Hoodie',
    price: 49.99,
    description: 'Soft, premium hoodie with a sleek magnet blade logo.',
    image: b1,
    category: 'Apparel',
  },
  {
    id: 'magnet-tshirt',
    name: 'Magnet Blade Tee',
    price: 24.99,
    description: 'Classic tee with bold branding for everyday wear.',
    image: b2,
    category: 'Apparel',
  },
  {
    id: 'magnet-cap',
    name: 'Magnet Blade Cap',
    price: 19.99,
    description: 'Adjustable cap with embroidered logo.',
    image: b3,
    category: 'Accessories',
  },
  {
    id: 'magnet-socks',
    name: 'Magnet Blade Socks',
    price: 12.99,
    description: 'Comfortable crew socks with repeating logo pattern.',
    image: b4,
    category: 'Apparel',
  },
  {
    id: 'magnet-sticker-pack',
    name: 'Magnet Blade Sticker Pack',
    price: 7.99,
    description: 'A set of premium vinyl stickers for laptops and gear.',
    image: b5,
    category: 'Collectibles',
  },
  {
    id: 'magnet-mug',
    name: 'Magnet Blade Mug',
    price: 14.99,
    description: 'Ceramic mug featuring the Magnet Blade emblem.',
    image: b6,
    category: 'Home',
  },
  {
    id: 'magnet-water-bottle',
    name: 'Magnet Blade Water Bottle',
    price: 21.99,
    description: 'Insulated bottle to keep drinks cold for hours.',
    image: b7,
    category: 'Home',
  },
  {
    id: 'magnet-notebook',
    name: 'Magnet Blade Notebook',
    price: 11.99,
    description: 'Lined notebook with a durable cover and branding.',
    image: b8,
    category: 'Stationery',
  },
  {
    id: 'magnet-phone-case',
    name: 'Magnet Blade Phone Case',
    price: 18.99,
    description: 'Protective case with a sleek matte finish.',
    image: b9,
    category: 'Accessories',
  },
  {
    id: 'magnet-keychain',
    name: 'Magnet Blade Keychain',
    price: 9.99,
    description: 'Metal keychain with a laser-etched logo.',
    image: b10,
    category: 'Accessories',
  },
]

const CATEGORIES = ['All', ...new Set(PRODUCTS.map((product) => product.category))]

function formatCurrency(amount: number) {
  return amount.toLocaleString(undefined, {
    style: 'currency',
    currency: 'USD',
  })
}
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <RequireRole role="user">
            <UserDashboard />
          </RequireRole>
        }
      />
      <Route
        path="/admin"
        element={
          <RequireRole role="admin">
            <AdminDashboard />
          </RequireRole>
        }
      />
      <Route
        path="/admin/products"
        element={
          <RequireRole role="admin">
            <ProductsList />
          </RequireRole>
        }
      />
      <Route
        path="/admin/products/add"
        element={
          <RequireRole role="admin">
            <AddProduct />
          </RequireRole>
        }
      />
      <Route
        path="/admin/category"
        element={
          <RequireRole role="admin">
            <Categories />
          </RequireRole>
        }
      />
      <Route
        path="/admin/category/add"
        element={
          <RequireRole role="admin">
            <AddCategory />
          </RequireRole>
        }
      />
      <Route
        path="/admin/inventory"
        element={
          <RequireRole role="admin">
            <Inventory />
          </RequireRole>
        }
      />
      <Route
        path="/admin/orders"
        element={
          <RequireRole role="admin">
            <OrdersList />
          </RequireRole>
        }
      />
      <Route
        path="/admin/users"
        element={
          <RequireRole role="admin">
            <UsersList />
          </RequireRole>
        }
      />
      <Route
        path="/admin/invoices"
        element={
          <RequireRole role="admin">
            <Invoice />
          </RequireRole>
        }
      />
      <Route
        path="/admin/purchases"
        element={
          <RequireRole role="admin">
            <Purchase />
          </RequireRole>
        }
      />
    </Routes>
  )
}

type RequireRoleProps = {
  role: 'admin' | 'user'
  children: ReactElement
}

function RequireRole({ role, children }: RequireRoleProps) {
  const token = localStorage.getItem('token')
  if (!token) {
    return <Navigate to="/login" replace />
  }

  const storedRole = getStoredRole()
  const currentRole = storedRole ?? ensureRole()

  if (currentRole && currentRole !== role) {
    const redirect = currentRole === 'admin' ? '/admin' : '/dashboard'
    return <Navigate to={redirect} replace />
  }

  return children
}

function Home() {
  const isLoggedIn = Boolean(localStorage.getItem('token'))
  const [activeCategory, setActiveCategory] = useState('All')

  const visibleProducts =
    activeCategory === 'All'
      ? PRODUCTS
      : PRODUCTS.filter((product) => product.category === activeCategory)

  return (
    <div
      className="app"
      style={{
        background: APP_BACKGROUND,
        '--card-bg': CARD_BACKGROUND,
      } as React.CSSProperties}
    >
      <style>{APP_STYLES}</style>

      <Header showAuth={!isLoggedIn} />
      <main className="main">
        <SecondaryHeader
          title="Shop by category"
          subtitle="Filter the product list by category."
          categories={CATEGORIES}
          activeCategory={activeCategory}
          onCategorySelect={setActiveCategory}
        />

        <section className="products">
          {visibleProducts.map((product) => (
            <article key={product.id} className="productCard">
              <img className="productImage" src={product.image} alt={product.name} />
              <h2>{product.name}</h2>
              <p className="productDescription">{product.description}</p>

              <div className="productFooter">
                <span className="productPrice">{formatCurrency(product.price)}</span>
              </div>
            </article>
          ))}
        </section>
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
