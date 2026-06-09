// --- TARUH INI DI BARIS PALING ATAS Navbar.jsx ---
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

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

// --- TARUH INI DI BARIS PALING BAWAH Navbar.jsx ---
export default Navbar;