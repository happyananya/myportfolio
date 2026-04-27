import React from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const experiences = [
  {
    company: "New York University - VIDA Lab",
    role: "Software Engineer",
    location: "New York, USA",
    period: "Feb. 2026 – Present",
    color: "#0d9488",
    bullets: [
      "Modernized a large-scale image intelligence platform from Angular 4 to Angular 20, migrating 31 components, 9 services, and 8 data models to a modular standalone architecture integrated with Firebase (Auth, Realtime DB, Cloud Storage).",
      "Designed backend data processing pipelines and Cloud Functions (Node.js) for image transformation, metadata ingestion, and access control, enabling scalable handling of high-volume media and structured data.",
      "Implemented evaluation-driven workflows for validating annotation consistency and system outputs, improving reliability of human-in-the-loop data labeling systems.",
    ],
  },
  {
    company: "Universiti Teknologi PETRONAS",
    role: "Machine Learning Engineering Intern",
    location: "Seri Iskandar, Perak, Malaysia",
    period: "Jan. 2025 – May 2025",
    color: "#7c3aed",
    bullets: [
      "Developed a scalable code analysis pipeline to detect AI-generated C programs using 9+ software engineering metrics, including Cyclomatic Complexity, Halstead metrics, and entropy-based features.",
      "Engineered feature extraction and clustering workflows on structured code datasets, achieving a Silhouette Score of 0.48 and identifying distinguishable structural patterns in generated vs human-written code.",
      "Built automated parsing and preprocessing pipelines for unstructured source code data, enabling downstream ML modeling and evaluation.",
    ],
  },
  {
    company: "Samsung Research",
    role: "Machine Learning Engineering Intern",
    location: "Remote",
    period: "June 2024 – Dec. 2024",
    color: "#2563eb",
    bullets: [
      "Engineered an incremental learning pipeline in PyTorch to mitigate catastrophic forgetting in evolving classification systems, retaining 85% accuracy after integrating new data classes.",
      "Evaluated CNN and Vision Transformer (ViT) architectures under continual learning constraints, analyzing trade-offs in knowledge retention, generalization, and model stability.",
      "Designed experimental evaluation frameworks to benchmark model performance across sequential datasets, improving robustness of model selection decisions.",
    ],
  },
  {
    company: "Aidash",
    role: "Data Science Intern",
    location: "Bangalore, Karnataka, India",
    period: "June 2024 – July 2024",
    color: "#dc2626",
    bullets: [
      "Implemented YOLOv8 architecture to detect alligator cracks on roads, achieving a precision of 91.26%.",
      "Boosted model recall by 50% using Canny edge detection and CLAHE (adaptive histogram equalization) preprocessing on a 25,000-image dataset.",
    ],
  },
  {
    company: "National Aerospace Laboratories",
    role: "AI/ML Research Intern",
    location: "Remote",
    period: "Oct. 2023 – Dec. 2023",
    color: "#d97706",
    bullets: [
      "Spearheaded VGG19 algorithm implementation, attaining 70% accuracy in symbol and shape recognition using a dataset of 90,000 images.",
      "Utilized innovative techniques to develop a grid-based display system, achieving an 80% accuracy rate in identifying coordinates for various shapes and symbols.",
    ],
  },
];

function Experience() {
  return (
    <section id="experience">
      <ScrollReveal>
        <h1 className="title">Experience</h1>
      </ScrollReveal>

      <div className="exp-stack">
        {experiences.map((exp, index) => (
          <motion.article
            className="exp-row"
            key={`${exp.company}-${exp.period}`}
            style={{ "--exp-accent": exp.color }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: index * 0.06 }}
          >
            <div className="exp-row-accent" aria-hidden="true" />
            <div className="exp-row-body">
              <header className="exp-row-header">
                <h2 className="exp-row-company">{exp.company}</h2>
                <p className="exp-row-meta">
                  <span className="exp-row-role">{exp.role}</span>
                  <span className="exp-row-sep" aria-hidden="true">
                    ·
                  </span>
                  <span className="exp-row-period">{exp.period}</span>
                  <span className="exp-row-sep" aria-hidden="true">
                    ·
                  </span>
                  <span className="exp-row-location">{exp.location}</span>
                </p>
              </header>
              <ul className="exp-row-bullets">
                {exp.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export default Experience;
