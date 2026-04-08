import Header from "../user/PrimaryHeader"
import Footer from "./Footer"

const STYLES = `
.contactPage {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  color: #111111;
}

.contactMain {
  width: 100%;
  max-width: 980px;
  margin: 0 auto;
  padding: 40px 20px 72px;
  flex: 1;
}

.contactTitle {
  margin: 0 0 12px;
  font-size: 64px;
  font-weight: 500;
  text-align: center;
  font-family: "Times New Roman", serif;
}

.contactIntro {
  max-width: 720px;
  margin: 0 auto 36px;
  text-align: center;
  color: #6b7280;
  line-height: 1.7;
}

.contactIntro a {
  color: inherit;
  text-decoration: underline;
}

.formGrid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px 22px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.fieldFull {
  grid-column: 1 / -1;
}

.input,
.textarea {
  border: 1px solid rgba(15, 18, 24, 0.35);
  border-radius: 2px;
  padding: 14px 16px;
  font-size: 15px;
  outline: none;
  background: #ffffff;
}

.textarea {
  min-height: 140px;
  resize: vertical;
}

.submitBtn {
  margin-top: 8px;
  padding: 12px 28px;
  border: none;
  border-radius: 2px;
  background: #111111;
  color: #ffffff;
  font-size: 15px;
  cursor: pointer;
}

@media (max-width: 720px) {
  .contactTitle {
    font-size: 44px;
  }

  .formGrid {
    grid-template-columns: 1fr;
  }
}
`

export default function Contact() {
  return (
    <div className="contactPage">
      <style>{STYLES}</style>
      <Header showAuth />

      <main className="contactMain">
        <h1 className="contactTitle">Contact Us</h1>
        <p className="contactIntro">
          If you have any questions or need assistance, please don’t hesitate to reach out to us
          through our <a href="#contact-form">contact form</a>. We’re here to help and look forward
          to connecting with you!
        </p>

        <form id="contact-form" className="formGrid">
          <label className="field">
            <input className="input" type="text" placeholder="Name" />
          </label>
          <label className="field">
            <input className="input" type="email" placeholder="Email *" />
          </label>
          <label className="field fieldFull">
            <input className="input" type="tel" placeholder="Phone number" />
          </label>
          <label className="field fieldFull">
            <textarea className="textarea" placeholder="Comment" />
          </label>
          <button className="submitBtn" type="button">Send</button>
        </form>
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
