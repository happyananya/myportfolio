import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { RESUME_PDF_HREF } from "../constants";

const bentoItems = [
  {
    area: "edu1",
    icon: import.meta.env.BASE_URL + "assets/education.png",
    title: "New York University",
    subtitle: "M.S. in Computer Science",
    detail: "CGPA: 3.78/4",
    period: "Sept. 2025 \u2013 May 2027",
    accent: "var(--btn-bg)",
  },
  {
    area: "edu2",
    icon: import.meta.env.BASE_URL + "assets/education.png",
    title: "VIT",
    subtitle: "B.Tech in Computer Science",
    detail: "CGPA: 3.7/4",
    period: "Sept. 2021 \u2013 May 2025",
    accent: "var(--link-hover)",
  },
  {
    area: "exp",
    icon: import.meta.env.BASE_URL + "assets/experience.png",
    title: "Experience",
    subtitle: "Software Engineer @ NYU VIDA Lab",
    detail: "+ 4 Prior Internships",
    period: "Samsung \u00b7 Aidash \u00b7 UTP \u00b7 NAL",
    accent: "var(--btn-bg)",
  },
  {
    area: "cert",
    icon: import.meta.env.BASE_URL + "assets/checkmark.png",
    title: "Certification",
    subtitle: "AWS Certified Solutions Architect",
    detail: "Associate \u2013 SAA-C03",
    period: "",
    accent: "var(--link-hover)",
  },
  {
    area: "stats",
    stats: [
      { value: "5+", label: "Internships" },
      { value: "6", label: "Projects" },
      { value: "34", label: "Skills" },
    ],
  },
];

function BentoCard({ item, index }) {
  if (item.stats) {
    return (
      <motion.div
        className={`bento-card bento-${item.area}`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <div className="bento-stats">
          {item.stats.map((stat) => (
            <div className="bento-stat" key={stat.label}>
              <span className="bento-stat-value">{stat.value}</span>
              <span className="bento-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`bento-card bento-${item.area}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="bento-accent" style={{ background: item.accent }} />
      <img src={item.icon} alt={item.title} className="bento-icon" />
      <h3 className="bento-title">{item.title}</h3>
      <p className="bento-subtitle">{item.subtitle}</p>
      <p className="bento-detail">{item.detail}</p>
      {item.period && <span className="bento-period">{item.period}</span>}
    </motion.div>
  );
}

function Hero() {
  const reduceMotion = useReducedMotion();
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="profile">
      <div className="hero-layout">
        <div className="hero-left">
          <motion.div
            className="section__pic-container"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={reduceMotion ? undefined : { scale: 1.02 }}
            transition={
              reduceMotion
                ? { duration: 0.2 }
                : { type: "spring", stiffness: 70, damping: 18, mass: 0.9 }
            }
          >
            <img
              className="section__pic-img"
              src={import.meta.env.BASE_URL + "assets/profile-hero.png"}
              alt="Portrait of Ananya Agarwal with the Golden Gate Bridge in the background"
            />
          </motion.div>
          <motion.div
            className="section_text hero-intro"
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              reduceMotion
                ? { duration: 0.2 }
                : {
                    type: "spring",
                    stiffness: 80,
                    damping: 20,
                    delay: 0.12,
                    mass: 0.8,
                  }
            }
          >
            <p className="section__text__p1">Hello, I&apos;m</p>
            <h1 className="title">Ananya Agarwal</h1>
            <p className="section__text__p2">M.S. Computer Science @ NYU</p>
            <p className="section__text__tagline">
              Building reliable systems: full-stack apps, data
              pipelines, and evaluation-driven ML.
              <br />
              Looking for Summer or Fall 2026 internships.
            </p>
            <div className="btn-container">
              <a
                className="btn btn-color-2"
                href={RESUME_PDF_HREF}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download CV
              </a>
              <button type="button" className="btn btn-color-1" onClick={scrollToContact}>
                Contact
              </button>
            </div>
            <div id="socials-container">
              <a
                href="https://www.linkedin.com/in/ananya-agarwal03/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Ananya Agarwal on LinkedIn"
              >
                <img src={import.meta.env.BASE_URL + "assets/linkedin.png"} alt="" className="icon" width={32} height={32} />
              </a>
              <a
                href="https://github.com/happyananya"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Ananya Agarwal on GitHub"
              >
                <img src={import.meta.env.BASE_URL + "assets/github.png"} alt="" className="icon" width={32} height={32} />
              </a>
            </div>
          </motion.div>
        </div>

        <div className="hero-about">
          <div className="bento-grid">
            {bentoItems.map((item, index) => (
              <BentoCard item={item} index={index} key={item.area} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
