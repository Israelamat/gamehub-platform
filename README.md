# 🎮 GameHub: The Ultimate Developer & Gamer Ecosystem

<p align="center">
  <img src="https://img.shields.io/badge/Angular-18.2-DD0031?style=for-the-badge&logo=angular&logoColor=white" alt="Angular" />
  <img src="https://img.shields.io/badge/TypeScript-5.5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Signals-Reactive-purple?style=for-the-badge" alt="Signals" />
  <img src="https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge" alt="License" />
</p>

## 🎯 The Vision

**GameHub** is a high-performance digital marketplace and educational platform that unifies the gaming lifecycle. It bridges the gap between **consuming** Triple-A titles and **mastering** the craft of game development. 

Whether you are here to expand your Steam library, showcase an indie masterpiece, or learn Unreal Engine 5, GameHub provides a seamless, immersive environment built with the latest reactive technologies.

---

## 🛠️ Core Engineering Stack

We’ve swapped traditional state management for a modern, fine-grained reactive architecture.

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Reactive Engine** | `Angular Signals` | Fine-grained reactivity for lightning-fast UI updates |
| **State Sync** | `LinkedSignals` | Seamless synchronization between UI inputs and global store |
| **Data Flow** | `RxJS Interop` | Handling complex asynchronous Steam API streams |
| **View Engine** | `Control Flow (@if/@for)` | Native performance optimization for large game grids |
| **Styling** | `SCSS + Utility First` | Custom "Cyber-Dark" theme with Glassmorphism effects |
| **Animations** | `Web Animations API` | Orchestrated scroll-reveal and micro-interactions |

---

## 🕹️ The Platform Experience

### 🏠 Cinematic Landing (Home)
A high-impact entry point featuring dynamic "Hero" sections, trending community games, and highlighted dev courses. Designed to convert visitors into community members through visual storytelling.

### 🔍 Discovery Engine (Games)
A sophisticated library featuring **Steam API integration**.
* **Smart Filtering**: Sidebar with real-time price sliders and category selectors.
* **Responsive Grid**: Fluid layout that adapts from ultra-wide monitors to mobile devices.
* **Deep Links**: Direct access to individual game profiles.

### 📝 Game Chronicles (Individual Game & Reviews)
Every game has a soul. Detailed profiles including:
* **Rich Metadata**: Developer info, high-res galleries, and pricing.
* **Community Pulse**: A robust review system where players leave feedback and technical ratings.

### 🎓 Dev Academy (Courses & Learning)
A full-scale educational hub.
* **Course Catalog**: Filterable list of gamedev specializations (C#, Unity, Modeling).
* **Classroom View**: Individual course pages with syllabus, video previews, and student testimonials.

### 👤 Command Center (User Profile)
A personalized space for users to track their purchased games, course progress, and community contributions.

### 💳 Secure Checkout (Orders)
A unified "Single-Cart" experience. Purchase a Steam key and a GameDev course in one single, encrypted transaction. Features clear order summaries and digital receipt generation.

---

## 📈 Performance & Philosophy

* **OnPush Strategy**: Reduced change detection cycles for a 60fps experience.
* **Component Modularity**: Every UI element is a standalone, reusable block.
* **Deferred Loading**: Using `@defer` to prioritize critical content and lazy-load heavy assets.

> **GameHub** is a versatile space designed to connect players with great games and the tools to start building their own.
