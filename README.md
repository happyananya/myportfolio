# 🌐 Ananya Agarwal — Personal Portfolio

A modern, responsive developer portfolio built with **React 18** and **Vite**, featuring smooth Framer Motion animations, a dark/light theme toggle, and a bento-grid layout.

🔗 **Live:** [happyananya.github.io](https://happyananya.github.io/myportfolio/)

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12-FF0055?logo=framer&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Features

| Feature | Details |
|---|---|
| **Bento-Grid Hero** | Education, experience, certifications, and stats displayed in a responsive grid layout |
| **Dark / Light Theme** | One-click toggle with `localStorage` persistence |
| **Animated Sections** | Scroll-triggered entrance animations via Framer Motion |
| **Skills Dashboard** | Categorized skill pills with a highlighted core stack |
| **Project Showcase** | Featured project cards + expandable "More on GitHub" list |
| **Responsive Design** | Mobile-first CSS with dedicated media-query breakpoints |
| **Accessibility** | `prefers-reduced-motion` respected; semantic HTML throughout |

---

## 🗂️ Project Structure

```
src/
├── App.jsx                 # Root component — theme state, layout shell
├── constants.js            # Shared constants (resume path, etc.)
├── main.jsx                # Vite entry point
├── components/
│   ├── Hero.jsx            # Bento-grid intro section
│   ├── Experience.jsx      # Timeline of work experience
│   ├── SkillConstellation.jsx  # Categorized skills display
│   ├── Projects.jsx        # Featured + additional projects
│   ├── Contact.jsx         # Email, LinkedIn, GitHub links
│   ├── Navbar.jsx          # Navigation bar
│   ├── Footer.jsx          # Animated footer
│   ├── ThemeToggle.jsx     # Dark/light mode switch
│   ├── ScrollReveal.jsx    # Scroll-triggered reveal wrapper
│   └── WaveDivider.jsx     # SVG wave section divider
├── pages/
│   └── LandingPage.jsx     # Composes all sections
└── styles/
    ├── style.css           # Main stylesheet
    └── mediaqueries.css    # Responsive breakpoints
```

---

## 🚀 How to Run Locally

**Prerequisites:** [Node.js](https://nodejs.org/) v24+ and npm.

```bash
# 1. Clone the repository
git clone https://github.com/happyananya/myportfolio.git
cd myportfolio

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build    # outputs to dist/
npm run preview  # preview the production build locally
```

---

## 🛠️ Tech Stack

- **Framework:** React 18
- **Bundler:** Vite 5
- **Animations:** Framer Motion 12
- **Styling:** Vanilla CSS with CSS custom properties for theming
- **Deployment:** GitHub Pages 

---

## 📬 Contact

- **Email:** [aa13549@nyu.edu](mailto:aa13549@nyu.edu)
- **LinkedIn:** [ananya-agarwal03](https://www.linkedin.com/in/ananya-agarwal03/)
- **GitHub:** [happyananya](https://github.com/happyananya)
