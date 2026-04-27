import React, { useState, useEffect, useRef } from "react";

const categoryColors = {
  Languages: { light: "#2a8f6f", dark: "#58e6a6" },
  "AI & Machine Learning": { light: "#c73e1d", dark: "#ff8a7a" },
  "ML & LLM Systems": { light: "#6b3bbd", dark: "#b388ff" },
  "Full-Stack & Data": { light: "#1a7a5e", dark: "#4dffc4" },
  "Cloud & DevOps": { light: "#b86b00", dark: "#ffd24a" },
};

const categoryIcons = {
  Languages: "\u{1F4BB}",
  "AI & Machine Learning": "\u{1F9E0}",
  "ML & LLM Systems": "⚙️",
  "Full-Stack & Data": "\u{1F310}",
  "Cloud & DevOps": "☁️",
};

const CORE_STACK = [
  "Python",
  "JavaScript/TypeScript",
  "SQL (PostgreSQL)",
  "React",
  "PyTorch",
  "AWS",
];

const PRIMARY_SKILL_LABELS = new Set([
  "Python",
  "JavaScript/TypeScript",
  "SQL (PostgreSQL)",
  "React",
  "PyTorch",
  "AWS",
]);

const skillCategories = [
  {
    title: "Languages",
    skills: ["Python", "JavaScript/TypeScript", "SQL (PostgreSQL)", "C/C++", "Java", "HTML/CSS", "Node.js"],
  },
  {
    title: "AI & Machine Learning",
    skills: ["PyTorch", "TensorFlow", "HuggingFace", "YOLOv8", "OpenCV", "Scikit-learn"],
  },
  {
    title: "ML & LLM Systems",
    skills: ["Prompt Engineering", "RAG", "Model Evaluation", "Incremental Learning", "CNN", "Vision Transformers (ViT)", "NLP"],
  },
  {
    title: "Full-Stack & Data",
    skills: ["React", "Angular", "Django", "FastAPI", "Firebase", "D3.js", "Fabric.js", "Pandas", "NumPy"],
  },
  {
    title: "Cloud & DevOps",
    skills: ["AWS", "CI/CD (Travis CI)", "Git", "Linux", "Docker"],
  },
];

const SKILL_BARS = [
  { label: "Python", pct: 92 },
  { label: "PyTorch", pct: 78 },
  { label: "React", pct: 75 },
  { label: "AWS", pct: 60 },
];

function SkillBars() {
  const [triggered, setTriggered] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTriggered(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="skill-bars" ref={ref} aria-label="Core skill proficiency">
      {SKILL_BARS.map(({ label, pct }) => (
        <div className="skill-bar-row" key={label}>
          <span className="skill-bar-label">{label}</span>
          <div className="skill-bar-track" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={`${label} ${pct}%`}>
            <div
              className="skill-bar-fill"
              style={{ width: triggered ? `${pct}%` : "0%" }}
            />
          </div>
          <span className="skill-bar-pct" aria-hidden="true">{pct}%</span>
        </div>
      ))}
    </div>
  );
}

function SkillConstellation({ darkMode }) {
  return (
    <section id="skills">
      <h1 className="title">Skills</h1>
      <p className="skills-intro">
        Core stack below reflects where I have the most shipping experience; other
        tools are grouped by area.
      </p>
      <div className="skills-core" aria-label="Core technical stack">
        <div className="skills-core-panel">
          <span className="skills-core-label">Core stack</span>
          <SkillBars />
          <div className="skills-core-pills">
            {CORE_STACK.map((skill) => (
              <span className="skill-pill skill-pill--core" key={skill}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="skills-cards-grid">
        {skillCategories.map((category) => {
          const colors = categoryColors[category.title];
          const accentColor = darkMode ? colors.dark : colors.light;
          const icon = categoryIcons[category.title];

          return (
            <div className="skill-category-card" key={category.title}>
              <div className="skill-category-header">
                <span className="skill-category-icon">{icon}</span>
                <h3 className="skill-category-title">{category.title}</h3>
                <div
                  className="skill-category-accent"
                  style={{ backgroundColor: accentColor }}
                />
              </div>
              <div className="skill-pills">
                {category.skills.map((skill) => (
                  <span
                    className={`skill-pill${PRIMARY_SKILL_LABELS.has(skill) ? " skill-pill--primary" : ""}`}
                    key={skill}
                    style={{
                      borderColor: accentColor,
                      color: accentColor,
                      "--pill-accent": accentColor,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default SkillConstellation;
