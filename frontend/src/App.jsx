import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import './index.css';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">
          <i className="fa-solid fa-cloud-bolt fa-bounce" style={{animationDuration: '3s'}}></i> FinOps<span>Predictor</span>
        </div>
        
        {/* Ikon Hamburger untuk HP */}
        <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
          <i className={isMobileMenuOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars-staggered"}></i>
        </div>

        {/* Menu Navigasi */}
        <ul className={isMobileMenuOpen ? "nav-links active-mobile" : "nav-links"}>
          <li><NavLink to="/" onClick={closeMobileMenu} className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>Home</NavLink></li>
          <li><NavLink to="/about" onClick={closeMobileMenu} className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>About</NavLink></li>
          <li><NavLink to="/dataset" onClick={closeMobileMenu} className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>Dataset</NavLink></li>
          <li><NavLink to="/akurasi" onClick={closeMobileMenu} className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>Akurasi</NavLink></li>
          <li><NavLink to="/testing" onClick={closeMobileMenu} className={({isActive}) => isActive ? "nav-item btn-nav active" : "nav-item btn-nav"}>Testing <i className="fa-solid fa-vial"></i></NavLink></li>
        </ul>
      </div>
    </nav>
  );
}

function Home() {
  const navigate = useNavigate();
  useEffect(() => { document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible')); }, []);

  return (
    <section className="main-section">
      <div className="hero-content reveal">
        <div className="hero-text">
          <span className="badge"><i className="fa-solid fa-microchip"></i> Machine Learning Platform</span>
          <h1>Optimalisasi Biaya Cloud <br />Dengan Cerdas & Akurat</h1>
          <p>Hindari pemborosan anggaran infrastruktur cloud (*overprovisioning*) menggunakan analisis prediktif. Kendalikan penuh efisiensi resource komputasi Anda sekarang.</p>
          <button onClick={() => navigate('/testing')} className="btn-primary">
            Mulai Pengujian Simulator <i className="fa-solid fa-arrow-right fa-beat-fade"></i>
          </button>
        </div>
        <div className="hero-visual">
          <div className="glow-circle"></div>
          <i className="fa-solid fa-server floating-icon"></i>
        </div>
      </div>
    </section>
  );
}

function About() {
  useEffect(() => { document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible')); }, []);

  return (
    <section className="main-section">
      <div className="container reveal">
        <div className="section-header">
          <h2><i className="fa-solid fa-circle-info"></i> Tentang Aplikasi & Tim</h2>
          <p>Mengenal lebih dekat sistem arsitektur dan para pengembang di balik platform ini.</p>
        </div>

        <div className="team-showcase-box">
          <div className="showcase-img-wrapper" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1f5f9', minHeight: '300px', borderRight: '1px solid var(--border-color)' }}>
            <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
              <i className="fa-solid fa-image fa-3x" style={{ marginBottom: '15px', color: 'var(--primary-green)' }}></i>
              <p style={{ fontWeight: '600' }}>Tempat Foto Tim</p>
            </div>
          </div>
          <div className="showcase-desc">
            <h3>Sistem Analitik FinOps Terintegrasi</h3>
            <p>Kami merancang platform ini untuk menjembatani antara kebutuhan performa sistem dan efisiensi finansial arsitektur cloud. Melalui pemrosesan metrik utilitas secara real-time, sistem mampu memotong pengeluaran yang tidak perlu tanpa mengorbankan performa.</p>
          </div>
        </div>

        <h3 className="sub-title"><i className="fa-solid fa-user-group"></i> Anggota Kelompok</h3>
        <div className="member-grid">
          <div className="member-card">
            <div className="member-avatar"><i className="fa-solid fa-user-astronaut"></i></div>
            <h4>Reski Farras Adiefa</h4>
            <p className="role">Lead Developer<br/>S1 Teknik Telekomunikasi</p>
          </div>
          <div className="member-card">
            <div className="member-avatar"><i className="fa-solid fa-user-shield"></i></div>
            <h4>Anggota 2</h4>
            <p className="role">ML Engineer</p>
          </div>
          <div className="member-card">
            <div className="member-avatar"><i className="fa-solid fa-user-gear"></i></div>
            <h4>Anggota 3</h4>
            <p className="role">UI/UX Designer</p>
          </div>
          <div className="member-card">
            <div className="member-avatar"><i className="fa-solid fa-user-ninja"></i></div>
            <h4>Anggota 4</h4>
            <p className="role">Data Analyst</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Dataset() {
  useEffect(() => { document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible')); }, []);

  return (
    <section className="main-section">
      <div className="container reveal">
        <div className="section-header">
          <h2><i className="fa-solid fa-database"></i> Informasi Dataset</h2>
          <p>Deskripsi dan rekayasa fitur data yang melatih model regresi kami.</p>
        </div>
        
        <div className="glass-container-form" style={{ textAlign: 'left', lineHeight: '1.8' }}>
          <h3 style={{ color: 'var(--text-dark)', marginBottom: '15px' }}><i className="fa-solid fa-file-csv" style={{color: 'var(--primary-green)'}}></i> Sumber Data</h3>
          <p style={{ color: 'var(--text-muted)' }}>Dataset ini mensimulasikan penggunaan resource komputasi cloud (CPU, Storage, RAM) di berbagai region. Memuat fitur krusial yang mempengaruhi tagihan bulanan layanan infrastruktur CSP.</p>
          
          <h3 style={{ color: 'var(--text-dark)', marginTop: '30px', marginBottom: '15px' }}><i className="fa-solid fa-list-check" style={{color: 'var(--primary-green)'}}></i> Fitur Utama (Features)</h3>
          <ul style={{ color: 'var(--text-muted)' }}>
            <li><strong>Storage Used (GB):</strong> Total kapasitas penyimpanan yang terpakai.</li>
            <li><strong>CPU Hours:</strong> Perbandingan waktu komputasi dipesan vs aktual.</li>
            <li><strong>CPU Utilization (%):</strong> Beban kerja rata-rata prosesor.</li>
            <li><strong>Fitur Kategorik:</strong> Region, Billing Period, Service, dan Status.</li>
          </ul>
          
          <div className="custom-alert warning" style={{ marginTop: '30px' }}>
            <i className="fa-solid fa-lightbulb"></i>
            <div>
              <strong>Catatan Model:</strong> Data kategorik pada dataset ini telah di-encode (diubah menjadi angka) menggunakan <em>LabelEncoder</em> sebelum dilatih ke model.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Akurasi() {
  useEffect(() => { document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible')); }, []);

  return (
    <section className="main-section">
      <div className="container reveal">
        <div className="section-header">
          <h2><i className="fa-solid fa-bullseye"></i> Performa & Akurasi Model</h2>
          <p>Hasil evaluasi metrik XGBoost pasca-pelatihan.</p>
        </div>
        <div className="metrics-display-grid">
          <div className="metric-glass-card">
            <div className="icon-box"><i className="fa-solid fa-chart-line"></i></div>
            <span className="metric-num">98.5%</span>
            <span className="metric-title">R-Squared (R²) Score</span>
            <p>Menunjukkan tingkat kecocokan model yang sangat tinggi dalam memprediksi fluktuasi tagihan layanan cloud.</p>
          </div>
          <div className="metric-glass-card">
            <div className="icon-box"><i className="fa-solid fa-calculator"></i></div>
            <span className="metric-num">± $1.20</span>
            <span className="metric-title">Mean Absolute Error (MAE)</span>
            <p>Tingkat deviasi rata-rata prediksi biaya sangat tipis, menjamin hasil estimasi uang tetap aman mendekati realita.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Testing() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState({
    storage: '', req_cpu: '', act_cpu: '', cpu_util: '',
    region: '', billing: '', service: '', status: ''
  });

  useEffect(() => { document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible')); }, []);

  const handleInputChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null); // Reset hasil sebelumnya
    
    setTimeout(() => {
      setIsLoading(false);
      setResult({ pred_cost: '245.50', opt: '85.20', cpu_efficiency: '0.45', rec: '⚠️ Underutilized (Overprovisioned)' });
      setTimeout(() => { document.getElementById('output-focus')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 100);
    }, 1500);
  };

  return (
    <section className="main-section">
      <div className="container reveal">
        <div className="glass-container-form">
          <div className="section-header" style={{ marginBottom: '35px' }}>
            <h2><i className="fa-solid fa-flask"></i> Simulator Uji FinOps</h2>
            <p>Isi parameter matriks di bawah untuk mensimulasikan prediksi.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="responsive-form-grid">
              <div className="input-field-group">
                <label><i className="fa-solid fa-database"></i> Storage Used (GB)</label>
                <input type="number" step="0.1" name="storage" value={formData.storage} onChange={handleInputChange} required placeholder="Misal: 150" />
              </div>
              <div className="input-field-group">
                <label><i className="fa-solid fa-microchip"></i> Required CPU Hrs</label>
                <input type="number" step="0.1" name="req_cpu" value={formData.req_cpu} onChange={handleInputChange} required placeholder="Misal: 720" />
              </div>
              <div className="input-field-group">
                <label><i className="fa-solid fa-server"></i> Actual CPU Hrs</label>
                <input type="number" step="0.1" name="act_cpu" value={formData.act_cpu} onChange={handleInputChange} required placeholder="Misal: 300" />
              </div>
              <div className="input-field-group">
                <label><i className="fa-solid fa-gauge-high"></i> CPU Util (%)</label>
                <input type="number" step="0.1" name="cpu_util" value={formData.cpu_util} onChange={handleInputChange} required placeholder="Misal: 45.5" />
              </div>
              <div className="input-field-group">
                <label><i className="fa-solid fa-globe"></i> Cloud Region</label>
                <select name="region" value={formData.region} onChange={handleInputChange} required>
                  <option value="" disabled>-- Pilih Region --</option>
                  <option value="US-East-1">US-East-1</option>
                  <option value="Asia-Southeast1">Asia-Southeast1</option>
                  <option value="Europe-West3">Europe-West3</option>
                </select>
              </div>
              <div className="input-field-group">
                <label><i className="fa-regular fa-calendar-days"></i> Billing Period</label>
                <select name="billing" value={formData.billing} onChange={handleInputChange} required>
                  <option value="" disabled>-- Pilih Siklus --</option>
                  <option value="Hourly">Hourly</option>
                  <option value="Monthly">Monthly</option>
                </select>
              </div>
              <div className="input-field-group">
                <label><i className="fa-solid fa-cubes"></i> Service Category</label>
                <select name="service" value={formData.service} onChange={handleInputChange} required>
                  <option value="" disabled>-- Pilih Layanan --</option>
                  <option value="Compute">Compute</option>
                  <option value="Storage">Storage</option>
                  <option value="Database">Database</option>
                </select>
              </div>
              <div className="input-field-group">
                <label><i className="fa-solid fa-power-off"></i> Instance Status</label>
                <select name="status" value={formData.status} onChange={handleInputChange} required>
                  <option value="" disabled>-- Pilih Status --</option>
                  <option value="Running">Running</option>
                  <option value="Idle">Idle</option>
                </select>
              </div>
            </div>

            <button type="submit" className={`action-btn-glow ${isLoading ? 'loading' : ''}`} disabled={isLoading}>
              {isLoading ? <><i className="fa-solid fa-gear fa-spin"></i> Mengeksekusi Mesin AI...</> : <><i className="fa-solid fa-bolt"></i> Jalankan Analitik Prediktif</>}
            </button>
          </form>

          {result && (
            <div className="results-wrapper-panel" id="output-focus">
              <h3><i className="fa-solid fa-square-poll-vertical"></i> Dashboard Hasil AI</h3>
              <div className="metrics-display-grid">
                <div className="result-data-card alert-cost">
                  <span className="card-label">Estimasi Total Tagihan</span>
                  <span className="card-val">$ {result.pred_cost}</span>
                </div>
                <div className="result-data-card alert-save">
                  <span className="card-label">Potensi Penghematan</span>
                  <span className="card-val">$ {result.opt}</span>
                </div>
                <div className="result-data-card full-row">
                  <span className="card-label">Efisiensi Kinerja CPU</span>
                  <span className="card-val text-medium">{result.cpu_efficiency}</span>
                </div>
                <div className="result-data-card full-row">
                  <span className="card-label">Rekomendasi Sistem FinOps</span>
                  <span className="card-val text-small">{result.rec}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dataset" element={<Dataset />} />
          <Route path="/akurasi" element={<Akurasi />} />
          <Route path="/testing" element={<Testing />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;