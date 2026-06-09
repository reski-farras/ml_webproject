// --- TARUH INI DI BARIS PALING ATAS UI.jsx ---
import { useState, useEffect, useRef } from 'react';

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

export { 
  MouseTracker, AnimatedBackground, ScrollProgress, 
  TiltCard, AnimatedCounter, TypeWriter, 
  RippleButton, StaggerReveal, PageTransition, HologramCarousel 
};