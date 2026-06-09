import { useState } from 'react';
import { PageTransition, RippleButton } from '../components/UI';

function Testing() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState({
    storage: '', req_cpu: '', act_cpu: '', cpu_util: '',
    region: '', billing: '', service: '', status: ''
  });

  const handleInputChange = (e) => { 
    setFormData({ ...formData, [e.target.name]: e.target.value }); 
  };

  // KODE TERBARU: Menembak API Django
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);

    try {
      // Pastikan URL ini sesuai dengan endpoint Django lu nanti
      const response = await fetch('http://localhost:8000/api/predict/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error("Gagal terhubung ke ML Server");
      
      const data = await response.json();
      setResult({
        pred_cost: data.pred_cost,
        opt: data.optimization,
        cpu_efficiency: data.cpu_efficiency,
        rec: data.recommendation
      });

      setTimeout(() => {
        document.getElementById('output-focus')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);

    } catch (error) {
      console.error(error);
      alert("Error: Server Django (Backend AI) belum menyala atau ada gangguan jaringan.");
    } finally {
      setIsLoading(false);
    }
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


export default Testing;