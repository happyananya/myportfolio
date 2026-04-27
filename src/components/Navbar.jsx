import React, { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import { RESUME_PDF_HREF } from "../constants";

const navBarTransition = {
  type: "spring",
  stiffness: 100,
  damping: 22,
  mass: 0.8,
};

const NAV_SECTIONS = ["experience", "skills", "projects", "contact"];

const navLinks = [
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

function Navbar({ darkMode, onToggleTheme }) {
  const reduceMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const visibleSections = useRef(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
      if (scrollTop < 80) setActiveSection("");
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_SECTIONS.map((id) =>
      document.getElementById(id)
    ).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (isIntersecting) {
            visibleSections.current.add(target.id);
          } else {
            visibleSections.current.delete(target.id);
          }
        });
        const active = NAV_SECTIONS.find((id) =>
          visibleSections.current.has(id)
        );
        if (active) setActiveSection(active);
      },
      { rootMargin: "0px 0px -60% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const toggleMenu = () => setMenuOpen((current) => !current);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div
        className="scroll-progress-bar"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <motion.nav
        id="desktop-nav"
        initial={reduceMotion ? false : { y: -28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={reduceMotion ? { duration: 0 } : navBarTransition}
      >
        <a href="#profile" className="logo">
          Ananya Agarwal
        </a>
        <div>
          <ul className="nav-links">
            {navLinks.map(({ href, label }) => {
              const sectionId = href.slice(1);
              const isActive = activeSection === sectionId;
              return (
                <li key={href}>
                  <a
                    href={href}
                    className={isActive ? "nav-link--active" : undefined}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
            <li>
              <a
                href={RESUME_PDF_HREF}
                target="_blank"
                rel="noopener noreferrer"
              >
                Resume
              </a>
            </li>
            <li>
              <ThemeToggle darkMode={darkMode} onToggle={onToggleTheme} />
            </li>
          </ul>
        </div>
      </motion.nav>

      <motion.nav
        id="hamburger-nav"
        initial={reduceMotion ? false : { y: -28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={reduceMotion ? { duration: 0 } : navBarTransition}
      >
        <a href="#profile" className="logo">
          Ananya Agarwal
        </a>
        <div className="nav-right">
          <ThemeToggle darkMode={darkMode} onToggle={onToggleTheme} />
          <div className="hamburger-menu">
            <div
              className={`hamburger-icon ${menuOpen ? "open" : ""}`}
              onClick={toggleMenu}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
            <ul className={`menu-links ${menuOpen ? "open" : ""}`}>
              {navLinks.map(({ href, label }) => {
                const sectionId = href.slice(1);
                const isActive = activeSection === sectionId;
                return (
                  <li key={href}>
                    <a
                      href={href}
                      className={isActive ? "nav-link--active" : undefined}
                      onClick={closeMenu}
                    >
                      {label}
                    </a>
                  </li>
                );
              })}
              <li>
                <a
                  href={RESUME_PDF_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                >
                  Resume
                </a>
              </li>
            </ul>
          </div>
        </div>
      </motion.nav>
    </>
  );
}

export default Navbar;
