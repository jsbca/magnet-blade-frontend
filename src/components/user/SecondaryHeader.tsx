const SECONDARY_HEADER_STYLES = `
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
  return (
    <>
      <style>{SECONDARY_HEADER_STYLES}</style>

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
