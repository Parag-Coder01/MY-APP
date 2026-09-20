# KITE ROBOTICS — Mobile & Web Platform

> **"Empowering Innovation with Robotics, AI & IoT."**  
> Official Website: [https://www.kiterobotics.in](https://www.kiterobotics.in)

Official mobile application and web ecosystem for **KITE ROBOTICS**, an Indian Robotics, Artificial Intelligence, IoT, and STEM education company.

---

## 📱 Features

- **PWA Mobile App**: Install directly on Android (via Chrome) and iOS (via Safari) with standalone mode, offline caching, and native touch navigation.
- **KMS-AI Mentor**: Intelligent robotics assistant for circuit schematics, Arduino/ESP32 code, sensor troubleshooting, and Atal Tinkering Labs (ATL) guidance.
- **Curated STEM Courses**: Hands-on robotics, AI, IoT, and embedded systems learning paths with quizzes and certificates.
- **Robotics Kit Store**: Complete e-commerce store for rover chassis, microcontroller kits, sensors, and components.
- **Institutional Programs**: Atal Tinkering Lab setup, teacher training, and institutional workshop booking.

---

## 🚀 Getting Started (Run Locally)

### 1. Clone & Install
```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
npm install
```

### 2. Environment Setup (Optional for AI)
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
*(Optional: Add `GEMINI_API_KEY=your_key` for Gemini cloud integration. If omitted, the app automatically runs on the built-in KMS-AI offline knowledge engine).*

### 3. Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm start
```

---

## 🌐 Deploy to GitHub Pages

This repository includes a pre-configured GitHub Actions workflow (`.github/workflows/deploy.yml`):
1. In your GitHub repository, go to **Settings** $\rightarrow$ **Pages**.
2. Under **Build and deployment** $\rightarrow$ **Source**, select **GitHub Actions**.
3. Push to `main` (or trigger the workflow manually in the Actions tab).
4. Your site will automatically build and deploy to `https://<username>.github.io/<repo>/`!

---

## 📦 Publish to Google Play Store

Because this project is built with full Progressive Web App (PWA) standards (standalone manifest, 192px/512px icons, service worker, and portrait orientation), you can package it into an **Android App Bundle (`.aab`)** for the Google Play Store:

### Option A: PWABuilder (Easiest & Free)
1. Go to [PWABuilder.com](https://www.pwabuilder.com).
2. Enter your live deployment URL (or your GitHub Pages URL).
3. Click **"Package for Android"**.
4. Enter your package ID (e.g. `in.kiterobotics.app`) and download the `.aab` bundle.
5. Upload the `.aab` to [Google Play Console](https://play.google.com/console).

### Option B: Google Bubblewrap CLI
```bash
npm install -g @bubblewrap/cli
bubblewrap init --manifest https://YOUR_APP_URL/manifest.webmanifest
bubblewrap build
```
This outputs `app-release-bundle.aab` ready for the Play Store.

---

## 🛠️ Tech Stack
- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS + Motion
- **Icons**: Lucide React
- **PWA**: `vite-plugin-pwa` + Workbox
- **Backend**: Express + `@google/genai`
