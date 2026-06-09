import { PageTransition, StaggerReveal, TiltCard, AnimatedCounter } from '../components/UI';

// ───── AKURASI ─────
function Akurasi() {
  return (
    <PageTransition>
      <section className="main-section">
        <div className="container">
          <div className="section-header">
            <h2><i className="fa-solid fa-bullseye"></i> Performa & Akurasi Model</h2>
            <p>Hasil evaluasi metrik XGBoost pasca-pelatihan.</p>
          </div>
          <StaggerReveal className="metrics-display-grid">
            <TiltCard className="metric-glass-card">
              <div className="icon-box"><i className="fa-solid fa-chart-line"></i></div>
              <span className="metric-num"><AnimatedCounter target={98.5} suffix="%" duration={2500} /></span>
              <span className="metric-title">R-Squared (R²) Score</span>
              <p>Menunjukkan tingkat kecocokan model yang sangat tinggi dalam memprediksi fluktuasi tagihan layanan cloud.</p>
            </TiltCard>
            <TiltCard className="metric-glass-card">
              <div className="icon-box"><i className="fa-solid fa-calculator"></i></div>
              <span className="metric-num">± $<AnimatedCounter target={1.20} duration={2000} /></span>
              <span className="metric-title">Mean Absolute Error (MAE)</span>
              <p>Tingkat deviasi rata-rata prediksi biaya sangat tipis, menjamin hasil estimasi uang tetap aman mendekati realita.</p>
            </TiltCard>
          </StaggerReveal>
        </div>
      </section>
    </PageTransition>
  );
}


export default Akurasi;