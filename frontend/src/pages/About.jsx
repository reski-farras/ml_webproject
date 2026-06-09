import { PageTransition, HologramCarousel } from '../components/UI';

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

export default About;