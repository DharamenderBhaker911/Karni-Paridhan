/**
 * SizeGuidePage — Karni Paridhan
 * Full measurement guide and size chart for all product categories
 */
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartDrawer from "../components/CartDrawer";

const suitSizes = [
  { size: "XS", bust: "32", waist: "26", hip: "34", length: "46" },
  { size: "S",  bust: "34", waist: "28", hip: "36", length: "47" },
  { size: "M",  bust: "36", waist: "30", hip: "38", length: "48" },
  { size: "L",  bust: "38", waist: "32", hip: "40", length: "49" },
  { size: "XL", bust: "40", waist: "34", hip: "42", length: "50" },
  { size: "2XL", bust: "42", waist: "36", hip: "44", length: "51" },
  { size: "3XL", bust: "44", waist: "38", hip: "46", length: "52" },
  { size: "4XL", bust: "46", waist: "40", hip: "48", length: "53" },
];

const poshakSizes = [
  { size: "S",   waist: "26–28", hip: "34–36", ghaghra: "40–42", choli: "32–34" },
  { size: "M",   waist: "28–30", hip: "36–38", ghaghra: "42–44", choli: "34–36" },
  { size: "L",   waist: "30–32", hip: "38–40", ghaghra: "44–46", choli: "36–38" },
  { size: "XL",  waist: "32–34", hip: "40–42", ghaghra: "46–48", choli: "38–40" },
  { size: "2XL", waist: "34–36", hip: "42–44", ghaghra: "48–50", choli: "40–42" },
  { size: "3XL", waist: "36–38", hip: "44–46", ghaghra: "50–52", choli: "42–44" },
];

const tips = [
  { icon: "📏", tip: "Always measure yourself over light innerwear or a thin garment." },
  { icon: "🔄", tip: "Measure bust at the fullest point, keeping the tape snug but not tight." },
  { icon: "📐", tip: "Waist measurement should be at the narrowest point of your torso." },
  { icon: "📝", tip: "If you're between sizes, size up for a more comfortable fit." },
  { icon: "💬", tip: "For custom sizing, WhatsApp us with your measurements before ordering." },
];

export default function SizeGuidePage() {
  return (
    <>
      <Header />
      <CartDrawer />

      <div className="inner-page-hero">
        <div className="container-narrow">
          <span className="eyebrow">Fit Guide</span>
          <h1 className="inner-page-title serif">Size Guide</h1>
          <p className="inner-page-sub">Find your perfect fit using our detailed size charts.</p>
        </div>
      </div>

      <section className="size-guide-section section-pad">
        <div className="container-narrow">

          {/* Measurement Tips */}
          <div className="size-tips-grid">
            {tips.map((t) => (
              <div className="size-tip-card" key={t.tip}>
                <span className="size-tip-icon">{t.icon}</span>
                <p className="size-tip-text">{t.tip}</p>
              </div>
            ))}
          </div>

          {/* Suits / Kurta Sets / Anarkali */}
          <div className="size-table-block">
            <h2 className="size-table-title serif">Suits, Kurta Sets & Anarkali</h2>
            <p className="size-table-sub">All measurements in inches.</p>
            <div className="size-table-wrap">
              <table className="size-table">
                <thead>
                  <tr>
                    <th>Size</th>
                    <th>Bust</th>
                    <th>Waist</th>
                    <th>Hip</th>
                    <th>Kurta Length</th>
                  </tr>
                </thead>
                <tbody>
                  {suitSizes.map((r) => (
                    <tr key={r.size}>
                      <td><strong>{r.size}</strong></td>
                      <td>{r.bust}"</td>
                      <td>{r.waist}"</td>
                      <td>{r.hip}"</td>
                      <td>{r.length}"</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Rajputi Poshak */}
          <div className="size-table-block">
            <h2 className="size-table-title serif">Rajputi Poshak (Ghaghra-Choli)</h2>
            <p className="size-table-sub">All measurements in inches. Ghaghra comes fully stitched with elastic waist for comfort.</p>
            <div className="size-table-wrap">
              <table className="size-table">
                <thead>
                  <tr>
                    <th>Size</th>
                    <th>Waist</th>
                    <th>Hip</th>
                    <th>Ghaghra Length</th>
                    <th>Choli Bust</th>
                  </tr>
                </thead>
                <tbody>
                  {poshakSizes.map((r) => (
                    <tr key={r.size}>
                      <td><strong>{r.size}</strong></td>
                      <td>{r.waist}"</td>
                      <td>{r.hip}"</td>
                      <td>{r.ghaghra}"</td>
                      <td>{r.choli}"</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* How to Measure */}
          <div className="how-to-measure">
            <h2 className="size-table-title serif">How to Measure Yourself</h2>
            <div className="htom-grid">
              <div className="htom-step">
                <div className="htom-num">1</div>
                <h4>Bust</h4>
                <p>Measure around the fullest part of your chest. Keep the tape parallel to the floor.</p>
              </div>
              <div className="htom-step">
                <div className="htom-num">2</div>
                <h4>Waist</h4>
                <p>Measure around the narrowest part of your waist, usually just above your belly button.</p>
              </div>
              <div className="htom-step">
                <div className="htom-num">3</div>
                <h4>Hip</h4>
                <p>Stand with feet together. Measure around the fullest part of your hips and seat.</p>
              </div>
              <div className="htom-step">
                <div className="htom-num">4</div>
                <h4>Length</h4>
                <p>From the base of your neck (shoulder) straight down to where you want the garment to end.</p>
              </div>
            </div>
          </div>

          {/* Custom Sizing CTA */}
          <div className="size-custom-cta">
            <span className="size-custom-icon">✂️</span>
            <div>
              <h3>Need a Custom Size?</h3>
              <p>We offer custom stitching on select designs. WhatsApp your measurements to our team and we'll help you get the perfect fit.</p>
            </div>
            <a
              href="https://wa.me/919999999999?text=Hi%2C%20I%20need%20a%20custom%20size"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              WhatsApp Us
            </a>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}
