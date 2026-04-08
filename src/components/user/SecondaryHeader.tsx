import { useEffect, useState } from "react"

export const OFFERS = [
  "Magnet Blade - Same day delivery in Delhi, Noida, Ghaziabad",
  "Magnet Blade - Weekend delivery in Varanasi",
  "Magnet Blade - Same day delivery in Gorkhpur",
  "Magnet Blade - Same day delivery in Lal Kuan , Ruderpur city (U.K.)",
  "Flat 20% off on all home decor orders above ₹1999",
  "Free shipping on prepaid orders this weekend",
]

const SECONDARY_HEADER_STYLES = `
.announcementBar {
  width: 100%;
  background: #8eada2;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 16px;
  border-radius: 12px;
}

.announcementButton {
  border: 1px solid rgba(255, 255, 255, 0.6);
  background: transparent;
  color: #ffffff;
  width: 28px;
  height: 28px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.announcementText {
  letter-spacing: 0.01em;
  text-align: center;
}

.secondaryHeader {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
  padding: 16px 18px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.62);
  border: 1px solid rgba(0, 0, 0, 0.08);
}

.secondaryHeaderCopy h2 {
  margin: 0;
  font-size: 22px;
  color: rgba(0, 0, 0, 0.9);
}

.secondaryHeaderCopy p {
  margin: 6px 0 0;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
}

.secondaryHeaderCategories {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.secondaryHeaderButton {
  padding: 8px 14px;
  border: 1px solid rgba(0, 0, 0, 0.14);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.8);
  color: #111;
  font-size: 14px;
  cursor: pointer;
}

.secondaryHeaderButtonActive {
  background: #111;
  color: #fff;
  border-color: #111;
}

@media (max-width: 720px) {
  .announcementBar {
    font-size: 12px;
    gap: 10px;
  }
}
`

export type SecondaryHeaderProps = {
  title: string
  subtitle: string
  categories: string[]
  activeCategory: string
  onCategorySelect: (category: string) => void
}

export default function SecondaryHeader({
  title,
  subtitle,
  categories,
  activeCategory,
  onCategorySelect,
}: SecondaryHeaderProps) {
  const [offerIndex, setOfferIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setOfferIndex((prev) => (prev + 1) % OFFERS.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [OFFERS.length])

  return (
    <>
      <style>{SECONDARY_HEADER_STYLES}</style>

      <div className="announcementBar">
        <button
          className="announcementButton"
          aria-label="Previous offer"
          onClick={() =>
            setOfferIndex((prev) => (prev - 1 + OFFERS.length) % OFFERS.length)
          }
        >
          ‹
        </button>
        <span className="announcementText">{OFFERS[offerIndex]}</span>
        <button
          className="announcementButton"
          aria-label="Next offer"
          onClick={() => setOfferIndex((prev) => (prev + 1) % OFFERS.length)}
        >
          ›
        </button>
      </div>

      <section className="secondaryHeader">
        <div className="secondaryHeaderCopy">
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>

        <div className="secondaryHeaderCategories">
          {categories.map((category) => {
            const isActive = category === activeCategory

            return (
              <button
                key={category}
                className={`secondaryHeaderButton${isActive ? " secondaryHeaderButtonActive" : ""}`}
                onClick={() => onCategorySelect(category)}
                type="button"
              >
                {category}
              </button>
            )
          })}
        </div>
      </section>
    </>
  )
}
