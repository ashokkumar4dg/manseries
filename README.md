<p align="center">
  <img src="Images/Logo/full_logo.png" alt="Man Series Logo" width="300" style="max-width: 100%;">
</p>

<h1 align="center">Man Series — Skin Minimalism</h1>

<p align="center">
  <strong>High-Performance Skincare. Engineered for Indian Men.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Project-Man--Series-5a7363?style=for-the-badge" alt="Project Name">
  <img src="https://img.shields.io/badge/Tech-Vanilla_HTML%2FCSS%2FJS-141413?style=for-the-badge" alt="Tech Stack">
  <img src="https://img.shields.io/badge/Formulated-For_Indian_Men-ccab82?style=for-the-badge" alt="Target audience">
  <img src="https://img.shields.io/badge/Dermatologically-Tested-7cc09a?style=for-the-badge" alt="Safety tested">
</p>

---

## ✦ Brand Philosophy

> "Most skincare brands make a simple task feel like a full-time job. At Man Series, we have cut through the noise. We specialize in Skin Minimalism: Multi-functional, high-performance formulations designed for the modern man who values his time as much as his appearance."
> 
> — **Maximum Results, Minimum Efforts.**

---

## ✦ Features Showcase

### 1. **Clinical Actives Catalog (`series.html`)**
- A complete collection of 3 multi-functional products designed to address sebum blockages, urban pollution, sun exposure, and skin barrier repair.
- Features dynamic **personalization badges** that scan local storage user profiles and recommend products tailored to their skin type.

### 2. **Build Your Own Series — B.Y.O.S (`byos.html`)**
- An interactive custom set building interface.
- Calculates and applies **dynamic bundle discounts** (10% off for 2 items, 15% off for 3 items).
- Optional **Premium Gift Sleeve selection** allowing users to select target recipients (Father, Brother, Partner, Friend) and attach a custom-printed handwritten note.

### 3. **The Molecular Reactor (`index.html`)**
- A high-performance, canvas-based **Ingredient Reactor** representing molecular synergies.
- Select a product to trigger custom particle simulations where active ingredients dynamically sync and bind in a stylized HTML5 Canvas display.

### 4. **Micro-Interactions & Experience Tuning**
- **Cursor Glow**: An elegant, lag-compensated cursor follow lighting up hoverable cards.
- **Haptic feedback**: Short physical vibration feedback on mobile device cart additions.
- **Dynamic announcement bars**: Sentence-cased ticker bars showing key claims on load and auto-hiding on scroll.

---

## ✦ The Routine Matrix

| Product | Category | Hero Actives | Purpose |
| :--- | :--- | :--- | :--- |
| **MS Clear Facewash** | Cleanse | `Salicylic Acid 2% + Glycolic Acid 1%` | Cleanses excessive oil, urban tan, and pollution buildup |
| **MS Treat Serum** | Treat | `Niacinamide 4% + Zinc PCA 1% + Tranexamic 3%` | Target acne scars, hyperpigmentation, and barrier repair |
| **MS Protect Sunscreen** | Protect | `SPF 50+ PA++++ Hybrid Filters` | Broad-spectrum UVA/UVB protection with zero white-cast matte finish |

---

## ✦ Tech Stack

* **Markup & Core:** HTML5 (Semantic Structure)
* **Styling & Layout:** Vanilla CSS3 (CSS Custom Properties, Custom Grid/Flexbox layouts, Spring Animations)
* **Logic:** Vanilla ES6+ JavaScript (Event-driven DOM updates, HTML5 Canvas Particle Engine)
* **Design Tokens:** Anthropological Light Theme (`#faf9f5` warm cream, `#141413` charcoal ink, `#5a7363` sage accent)

---

## ✦ Security & Safety Standards

> [!NOTE]
> This codebase has undergone a security hardening pass to prevent typical client-side security risks:
> - **DOM XSS Sanitization**: User inputs (search keywords, custom gift sleeve notes) are thoroughly escaped using `escapeHTML()` before being inserted into DOM strings.
> - **Secure Insertion**: Custom badges utilize `.textContent` properties to ensure local storage values do not trigger script injections.

---

## ✦ Running Locally

To run the application locally on your machine, simply serve the root directory using any local web server:

**Using Python:**
```bash
python -m http.server 8000
```

**Using Node / npx:**
```bash
npx http-server -p 8000
```

Once running, navigate to `http://localhost:8000` in your web browser.

---

## ✦ Deployment

This project is a static site and is ready to deploy directly to Vercel, Netlify, or GitHub Pages. Just point the deployment root to this repository directory.

