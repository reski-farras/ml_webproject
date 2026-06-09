import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

// 1. Import Komponen Global
import Navbar from './components/Navbar';
import { MouseTracker, AnimatedBackground, ScrollProgress } from './components/UI';

// 2. Import Semua Halaman
import Home from './pages/Home';
import About from './pages/About';
import Dataset from './pages/Dataset';
import Akurasi from './pages/Akurasi';
import Testing from './pages/Testing';

function App() {
  return (
    <Router>
      {/* Komponen yang selalu muncul di setiap halaman */}
      <MouseTracker />
      <AnimatedBackground /> {/* Ganti jadi <VideoBackground /> kalau lu udah pakai video */}
      <ScrollProgress />
      <Navbar />

      {/* Rute Halaman (Berganti-ganti sesuai klik) */}
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