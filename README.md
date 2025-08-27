#  My Portfolio - Shreyash Patil

[![GitHub stars](https://img.shields.io/github/stars/Shreyash-SP80/my-portfolio?style=social)](https://github.com/Shreyash-SP80/my-portfolio) [![GitHub forks](https://img.shields.io/github/forks/Shreyash-SP80/my-portfolio?style=social)](https://github.com/Shreyash-SP80/my-portfolio) [![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000?style=flat&logo=vercel)](https://my-portfolio.vercel.app/)

Welcome to my **personal portfolio website**, built using **React** and **Vite**, styled with **Tailwind CSS**, and enhanced with smooth animations using **Framer Motion** and **GSAP**.  
This portfolio highlights my **projects, skills, and contact methods** to connect with me.

---

## ✨ Features

- Fully responsive and modern design using **Tailwind CSS**  
- Smooth animations with **Framer Motion** and **GSAP**  
- Interactive scrolling and section-based animations  
- Projects showcase with **images & playable videos**  
- Social media links: **GitHub, LinkedIn, Instagram, WhatsApp**  
- Contact form powered by **EmailJS** for direct messages  
- Light/Dark mode toggle for a better UX  
- Clean and maintainable code structure  

---

## 🛠️ Technologies Used

| Category | Technology |
|----------|------------|
| Frontend | React, Vite |
| Styling | Tailwind CSS |
| Animations | Framer Motion, GSAP |
| Icons | React Icons, Lucide React, Remixicon |
| Utilities | React Scroll, Lenis, Dotenv |
| Email Service | EmailJS |

---

## ⚡ Installation & Running Locally

Follow these steps to run the project on your local machine:

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Shreyash-SP80/my-portfolio.git
cd my-portfolio
```

### 2️⃣ Install dependencies
Ensure you have Node.js (v18+) and npm installed. Then run:
```bash
npm install
```

### 3️⃣ Set up environment variables
Create a .env file in the root directory and add your EmailJS keys or any other API keys:
```bach
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### 4️⃣ Run the project in development mode
```bash
npm run dev
```
- Opens the project in development mode.
- Open your browser at http://localhost:5173

### 5️⃣ Build for production
```bash
npm run build
```
- Generates a dist/ folder with production-ready files.

### 6️⃣ Preview the production build
```bash
npm run preview
```
- Preview the production build locally before deploying.

## 📂 Directory Structure
```bash
my-portfolio/
├─ public/              # Static assets (images, videos, etc.)
├─ src/
│  ├─ assets/           # Images, icons, videos
│  ├─ components/       # Reusable React components pages like Home, About, Projects
│  ├─ App.jsx           # Main React app
│  ├─ main.jsx          # Entry point
├─ .env                 # Environment variables
├─ package.json
├─ tailwind.config.js
├─ vite.config.js
└─ README.md
```

### 🎬 Project Preview
- Projects Section: Includes images and playable videos
- Interactive Animations: Smooth motion effects on scroll and hover
- Contact Form: Send messages directly via EmailJS

## 🌐 Deployment
#### Vercel (Recommended for Vite/React projects)
1. Push your code to GitHub.
2. Go to Vercel and import your repo.
3. Set environment variables if needed.
4. Click Deploy → Your live site will be available.

#### Netlify (Alternative option)
1. Build the project using npm run build.
2. Drag & drop the dist/ folder in the Netlify dashboard.
