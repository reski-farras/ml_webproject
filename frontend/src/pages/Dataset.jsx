import { PageTransition, StaggerReveal } from '../components/UI';

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


export default Dataset;



