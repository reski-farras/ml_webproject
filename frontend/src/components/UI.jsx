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

// 10. Hologram Carousel
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