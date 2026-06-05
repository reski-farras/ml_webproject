import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import './index.css';

/* =============================================
   REUSABLE INTERACTIVE COMPONENTS
============================================= */

// 1. Custom Cursor Glow
function MouseTracker() {
  const glowRef = useRef(null);
  useEffect(() => {
    const handler = (e) => {
      if (glowRef.current) {
        glowRef.current.style.left = e.clientX + 'px';
        glowRef.current.style.top = e.clientY + 'px';
      }
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);
  return <div ref={glowRef} className="cursor-glow" />;
}

// 2. Animated Background + Grain
function AnimatedBackground() {
  return (
    <>
      <div className="animated-bg">
        <div className="grid-overlay" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>
      <div className="grain-overlay" />
    </>
  );
}

// 3. Scroll Progress Bar
function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handler = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setProgress(height > 0 ? (winScroll / height) * 100 : 0);
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return <div className="scroll-progress" style={{ width: `${progress}%` }} />;
}

// 4. 3D Tilt Card
function TiltCard({ children, className = '' }) {
  const cardRef = useRef(null);
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -(y - centerY) / 18;
    const rotateY = (x - centerX) / 18;
    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.setProperty('--mouse-x', `${percentX}%`);
    card.style.setProperty('--mouse-y', `${percentY}%`);
  };
  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  };
  return (
    <div ref={cardRef} className={`tilt-card ${className}`} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <div className="tilt-card-shine" />
      {children}
    </div>
  );
}

// 5. Animated Counter
function AnimatedCounter({ target, suffix = '', prefix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const counted = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          const start = performance.now();
          const step = (timestamp) => {
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(eased * target);
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);
  const isDecimal = String(target).includes('.');
  const decimals = isDecimal ? (String(target).split('.')[1] || '').length : 0;
  const display = isDecimal ? count.toFixed(decimals) : Math.floor(count);
  return <span ref={ref} className="animated-counter">{prefix}{display}{suffix}</span>;
}

// 6. TypeWriter
function TypeWriter({ text, speed = 55 }) {
  const [displayed, setDisplayed] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  useEffect(() => {
    let i = 0;
    setDisplayed('');
    const interval = setInterval(() => {
      if (i < text.length) { setDisplayed(text.substring(0, i + 1)); i++; }
      else clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  useEffect(() => {
    const blink = setInterval(() => setShowCursor((prev) => !prev), 530);
    return () => clearInterval(blink);
  }, []);
  return <span>{displayed}<span className="typewriter-cursor" style={{ opacity: showCursor ? 1 : 0 }}>|</span></span>;
}

// 7. Ripple Button
function RippleButton({ children, onClick, className = '', disabled = false, type = 'button' }) {
  const btnRef = useRef(null);
  const handleClick = (e) => {
    if (disabled) return;
    const btn = btnRef.current;
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple-effect';
    ripple.style.left = (e.clientX - rect.left) + 'px';
    ripple.style.top = (e.clientY - rect.top) + 'px';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
    if (onClick) onClick(e);
  };
  return (
    <button ref={btnRef} className={`ripple-btn ${className}`} onClick={handleClick} disabled={disabled} type={type}>
      {children}
    </button>
  );
}

// 8. Stagger Reveal
function StaggerReveal({ children, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={`stagger-container ${visible ? 'stagger-visible' : ''} ${className}`}>
      {children}
    </div>
  );
}

// 9. Page Transition
function PageTransition({ children }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setShow(true));
    return () => { cancelAnimationFrame(frame); setShow(false); };
  }, []);
  return <div className={`page-transition ${show ? 'page-enter' : ''}`}>{children}</div>;
}

// 10. Hologram Carousel — shows 1 member at a time, rotates on scroll
function HologramCarousel({ members }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [glitching, setGlitching] = useState(false);
  const sectionRef = useRef(null);
  const prevIndex = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const viewportH = window.innerHeight;

      // How far we've scrolled into this section
      const scrolledIn = -rect.top;
      const maxScroll = sectionHeight - viewportH;

      if (maxScroll <= 0) return;

      const progress = Math.max(0, Math.min(0.999, scrolledIn / maxScroll));
      const newIndex = Math.min(
        Math.floor(progress * members.length),
        members.length - 1
      );

      if (newIndex !== prevIndex.current && newIndex >= 0) {
        prevIndex.current = newIndex;
        setGlitching(true);
        setTimeout(() => {
          setActiveIndex(newIndex);
          setTimeout(() => setGlitching(false), 280);
        }, 120);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [members.length]);

  const member = members[activeIndex];

  return (
    <div ref={sectionRef} className="hologram-section" style={{ height: `${members.length * 100}vh` }}>
      <div className="hologram-sticky">
        <div className="hologram-projector">
          <div className="hologram-beam-up" />
          <div className={`hologram-display ${glitching ? 'hologram-glitch' : ''}`}>
            <div className="hologram-scanlines" />
            <div className="hologram-content">
              <div className="hologram-avatar">
                <i className={member.icon}></i>
              </div>
              <h4 className="hologram-name">{member.name}</h4>
              <p className="hologram-role">{member.role}</p>
              <p className="hologram-counter-text">
                <strong>{activeIndex + 1}</strong> / {members.length}
              </p>
            </div>
          </div>
          <div className="hologram-base">
            <div className="hologram-base-ring" />
            <div className="hologram-base-ring hologram-base-ring-2" />
          </div>
        </div>

        <div className="hologram-nav">
          {members.map((_, i) => (
            <div key={i} className={`hologram-dot ${i === activeIndex ? 'active' : ''}`} />
          ))}
        </div>

        <p className="hologram-scroll-hint">
          <i className="fa-solid fa-computer-mouse"></i> Scroll untuk melihat anggota lainnya
        </p>
      </div>
    </div>
  );
}

/* =============================================
   NAVBAR
============================================= */
function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="nav-container">
        <div className="logo">
          <i className="fa-solid fa-cloud-bolt fa-bounce" style={{ animationDuration: '3s' }}></i>
          FinOps<span>Predictor</span>
        </div>
        <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
          <i className={isMobileMenuOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars-staggered'}></i>
        </div>
        <ul className={isMobileMenuOpen ? 'nav-links active-mobile' : 'nav-links'}>
          <li><NavLink to="/" onClick={closeMobileMenu} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Home</NavLink></li>
          <li><NavLink to="/about" onClick={closeMobileMenu} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>About</NavLink></li>
          <li><NavLink to="/dataset" onClick={closeMobileMenu} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Dataset</NavLink></li>
          <li><NavLink to="/akurasi" onClick={closeMobileMenu} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Akurasi</NavLink></li>
          <li><NavLink to="/testing" onClick={closeMobileMenu} className={({ isActive }) => isActive ? 'nav-item btn-nav active' : 'nav-item btn-nav'}>Testing <i className="fa-solid fa-vial"></i></NavLink></li>
        </ul>
      </div>
    </nav>
  );
}

/* =============================================
   PAGES
============================================= */

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

// ───── ABOUT ─────
function About() {
  const members = [
    { icon: 'fa-solid fa-user-astronaut', name: 'Reski Farras Adiefa', role: 'Lead Developer\nS1 Teknik Telekomunikasi' },
    { icon: 'fa-solid fa-user-shield', name: 'Anggota 2', role: 'ML Engineer' },
    { icon: 'fa-solid fa-user-gear', name: 'Anggota 3', role: 'UI/UX Designer' },
    { icon: 'fa-solid fa-user-ninja', name: 'Anggota 4', role: 'Data Analyst' },
  ];

  return (
    <PageTransition>
      <section className="about-header-section">
        <div className="container">
          <div className="section-header">
            <h2><i className="fa-solid fa-circle-info"></i> Tentang Aplikasi & Tim</h2>
            <p>Mengenal lebih dekat sistem arsitektur dan para pengembang di balik platform ini.</p>
          </div>
          <div className="team-showcase-box">
            <div className="showcase-img-wrapper">
              <div style={{ textAlign: 'center' }}>
                <i className="fa-solid fa-image fa-3x" style={{ marginBottom: '15px' }}></i>
                <p style={{ fontWeight: '600' }}>Tempat Foto Tim</p>
              </div>
            </div>
            <div className="showcase-desc">
              <h3>Sistem Analitik FinOps Terintegrasi</h3>
              <p>Kami merancang platform ini untuk menjembatani antara kebutuhan performa sistem dan efisiensi finansial arsitektur cloud. Melalui pemrosesan metrik utilitas secara real-time, sistem mampu memotong pengeluaran yang tidak perlu tanpa mengorbankan performa.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="hologram-wrapper">
        <div className="container">
          <h3 className="sub-title"><i className="fa-solid fa-user-group"></i> Anggota Kelompok</h3>
        </div>
      </div>

      <HologramCarousel members={members} />
    </PageTransition>
  );
}

// ───── DATASET ─────
function Dataset() {
  return (
    <PageTransition>
      <section className="content-section">
        <div className="container">
          <div className="section-header">
            <h2><i className="fa-solid fa-database"></i> Proses Data & Dataset</h2>
            <p>Dari data mentah hingga model siap prediksi — tiga tahap kunci pipeline Machine Learning kami.</p>
          </div>

          <div className="pipeline-timeline">
            {/* ──── STEP 1: Data Cleaning ──── */}
            <div className="pipeline-step">
              <div className="pipeline-step-number">1</div>
              <div className="pipeline-step-header">
                <h3><span className="step-emoji">🧹</span> Pembersihan Data (Data Cleaning)</h3>
              </div>
              <p className="pipeline-step-desc">
                Kami menggunakan <strong>Cloud Storage & FinOps Dataset</strong> yang berisi puluhan ribu rekaman transaksi server.
                Sebelum dipelajari oleh AI, data ini harus dibersihkan dari "sampah" agar model tidak salah belajar:
              </p>
              <StaggerReveal className="pipeline-cards">
                <div className="pipeline-card">
                  <div className="pipeline-card-icon"><i className="fa-solid fa-trash-can"></i></div>
                  <h4>Penghapusan Data Tidak Relevan</h4>
                  <p>Kolom seperti Instance_ID dan nomor urut dibuang karena tidak memiliki nilai prediktif.</p>
                </div>
                <div className="pipeline-card">
                  <div className="pipeline-card-icon"><i className="fa-solid fa-spell-check"></i></div>
                  <h4>Perbaikan Typo (Kategorisasi)</h4>
                  <p>Terdapat ribuan salah ketik pada jenis layanan. Kami menyaring dan menstandarisasi 20 layanan teratas, lalu mengelompokkan sisanya ke dalam kategori "Other".</p>
                </div>
                <div className="pipeline-card">
                  <div className="pipeline-card-icon"><i className="fa-solid fa-fill-drip"></i></div>
                  <h4>Penanganan Data Kosong</h4>
                  <p>Data numerik yang kosong diisi dengan nilai tengah (Median), sedangkan data teks diisi dengan nilai yang paling sering muncul (Mode).</p>
                </div>
                <div className="pipeline-card">
                  <div className="pipeline-card-icon"><i className="fa-solid fa-chart-bar"></i></div>
                  <h4>Penjinakan Outlier</h4>
                  <p>Untuk tagihan yang nilainya tidak masuk akal, kami menggunakan metode statistik IQR (Interquartile Range) Capping. Nilai ekstrem dibatasi ke ambang wajar agar AI tidak bias.</p>
                </div>
              </StaggerReveal>
            </div>

            {/* ──── STEP 2: Feature Engineering ──── */}
            <div className="pipeline-step">
              <div className="pipeline-step-number">2</div>
              <div className="pipeline-step-header">
                <h3><span className="step-emoji">🧪</span> Rekayasa Fitur (Feature Engineering)</h3>
              </div>
              <p className="pipeline-step-desc">
                AI butuh bantuan logika bisnis untuk memahami data. Pada tahap ini, kami menciptakan fitur baru dan mengubah format data:
              </p>
              <StaggerReveal className="pipeline-cards">
                <div className="pipeline-card">
                  <div className="pipeline-card-icon"><i className="fa-solid fa-gauge-high"></i></div>
                  <h4>Pembuatan Fitur CPU_Efficiency</h4>
                  <p>Kami membagi CPU yang terpakai dengan CPU yang diminta. Rasio ini menjadi indikator utama untuk mendeteksi apakah server Underutilized (Mubazir) atau Optimal.</p>
                </div>
                <div className="pipeline-card">
                  <div className="pipeline-card-icon"><i className="fa-solid fa-filter"></i></div>
                  <h4>Seleksi 9 Fitur Esensial</h4>
                  <p>Dari puluhan variabel, kami mengerucutkan data menjadi 9 parameter paling krusial untuk mencegah data leakage (kebocoran kunci jawaban ke model).</p>
                </div>
                <div className="pipeline-card">
                  <div className="pipeline-card-icon"><i className="fa-solid fa-code"></i></div>
                  <h4>Label Encoding</h4>
                  <p>Karena komputer hanya memahami angka, seluruh data teks seperti Region dan Status disandikan menjadi format numerik menggunakan algoritma khusus yang kamusnya disimpan permanen.</p>
                </div>
              </StaggerReveal>
            </div>

            {/* ──── STEP 3: Data Modeling ──── */}
            <div className="pipeline-step">
              <div className="pipeline-step-number">3</div>
              <div className="pipeline-step-header">
                <h3><span className="step-emoji">🤖</span> Pelatihan Model (Data Modeling)</h3>
              </div>
              <p className="pipeline-step-desc">
                Kami membagi data menjadi dua bagian: <strong>80% untuk bahan belajar (Training)</strong> dan <strong>20% untuk ujian (Testing)</strong>.
                Kami tidak hanya menebak algoritma, melainkan mengadu dua algoritma yang berbeda:
              </p>
              <StaggerReveal className="pipeline-cards">
                <div className="pipeline-card">
                  <div className="pipeline-card-icon"><i className="fa-solid fa-bolt"></i></div>
                  <h4>XGBoost (Extreme Gradient Boosting)</h4>
                  <p>Algoritma Ensemble Tree yang sangat kuat untuk menangani pola non-linear dan kompleks pada harga cloud.</p>
                  <span className="algo-badge primary"><i className="fa-solid fa-trophy"></i> Model Utama</span>
                </div>
                <div className="pipeline-card">
                  <div className="pipeline-card-icon"><i className="fa-solid fa-scale-balanced"></i></div>
                  <h4>Ridge Regression</h4>
                  <p>Algoritma regresi linear dengan penalti (regularization) yang bertindak sebagai baseline (standar pembanding) yang cepat dan stabil.</p>
                  <span className="algo-badge secondary"><i className="fa-solid fa-scale-balanced"></i> Baseline</span>
                </div>
                <div className="pipeline-card">
                  <div className="pipeline-card-icon"><i className="fa-solid fa-sliders"></i></div>
                  <h4>Hyperparameter Tuning</h4>
                  <p>Kami menggunakan teknik RandomizedSearchCV untuk mencoba puluhan kombinasi "setelan mesin" secara otomatis guna mencari konfigurasi paling optimal.</p>
                </div>
              </StaggerReveal>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

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

// ───── TESTING ─────
function Testing() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState({
    storage: '', req_cpu: '', act_cpu: '', cpu_util: '',
    region: '', billing: '', service: '', status: ''
  });

  const handleInputChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);
    setTimeout(() => {
      setIsLoading(false);
      setResult({
        pred_cost: '245.50', opt: '85.20',
        cpu_efficiency: '0.45', rec: '⚠️ Underutilized (Overprovisioned)'
      });
      setTimeout(() => {
        document.getElementById('output-focus')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }, 1800);
  };

  return (
    <PageTransition>
      <section className="main-section">
        <div className="container">
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
              <RippleButton type="submit" className={`action-btn-glow ${isLoading ? 'loading' : ''}`} disabled={isLoading}>
                {isLoading ? <><i className="fa-solid fa-gear fa-spin"></i> Mengeksekusi Mesin AI...</> : <><i className="fa-solid fa-bolt"></i> Jalankan Analitik Prediktif</>}
              </RippleButton>
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
    </PageTransition>
  );
}

/* =============================================
   APP ROOT
============================================= */
function App() {
  return (
    <Router>
      <MouseTracker />
      <AnimatedBackground />
      <ScrollProgress />
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