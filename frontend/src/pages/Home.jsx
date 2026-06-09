import { useNavigate } from 'react-router-dom';
import { PageTransition, TypeWriter, RippleButton, AnimatedCounter } from '../components/UI';

// ───── HOME ─────
function Home() {
  const navigate = useNavigate();
  return (
    <PageTransition>
      <section className="main-section">
        <div className="hero-content">
          <div className="hero-text">
            <span className="badge"><i className="fa-solid fa-microchip"></i> Machine Learning Platform</span>
            <h1>
              <span className="gradient-text"><TypeWriter text="Optimalisasi Biaya Cloud" speed={50} /></span>
              <br />Dengan Cerdas & Akurat
            </h1>
            <p>Hindari pemborosan anggaran infrastruktur cloud (<em>overprovisioning</em>) menggunakan analisis prediktif. Kendalikan penuh efisiensi resource komputasi Anda sekarang.</p>
            <RippleButton onClick={() => navigate('/testing')} className="btn-primary">
              Mulai Pengujian Simulator <i className="fa-solid fa-arrow-right fa-beat-fade"></i>
            </RippleButton>
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-num"><AnimatedCounter target={98.5} suffix="%" /></span>
                <span className="hero-stat-label">Akurasi Model</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <span className="hero-stat-num"><AnimatedCounter target={3} suffix="+" /></span>
                <span className="hero-stat-label">Algoritma ML</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <span className="hero-stat-num"><AnimatedCounter target={500} suffix="+" /></span>
                <span className="hero-stat-label">Data Points</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="glow-circle"></div>
            <div className="glow-circle-secondary"></div>
            <div className="hero-visual-ring"></div>
            <div className="hero-visual-ring-2"></div>
            <i className="fa-solid fa-server floating-icon"></i>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

export default Home;