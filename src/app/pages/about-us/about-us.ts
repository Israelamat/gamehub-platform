import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [],

  template: `
    <section class="about-page">

      <div class="hero">
        <div class="hero-content">
          <span class="badge">GAMEHUB PLATFORM</span>
          <h1>About <span>GameHub</span></h1>
          <p class="subtitle">
            A gaming and learning platform developed as a Final Degree Project
            focused on connecting players, creators and students in one place.
          </p>
        </div>
      </div>
      <div class="content-grid">
        <div class="card">
          <h2>🎮 Steam Game Catalog</h2>
          <p>
            GameHub allows users to explore a large catalog of Steam games,
            discover new titles and interact with the gaming community.
          </p>
        </div>
        <div class="card">
          <h2>📚 Learning Platform</h2>
          <p>
            Users can upload courses, share tutorials and help other players
            improve their gaming skills through educational content.
          </p>
        </div>
        <div class="card">
          <h2>💬 Community Interaction</h2>
          <p>
            The platform includes a comment system where users can discuss
            Steam games, share opinions and build a collaborative community.
          </p>
        </div>
      </div>
      <div class="mission-card">
        <h2>Our Mission</h2>
        <p>
          The objective of GameHub is to combine gaming and education inside a
          modern social platform with a clean user experience and interactive features.
        </p>
      </div>
    </section>
  `,

  styles: [`
    .about-page {
      min-height: 100vh;
      padding: 120px 24px 120px;
      background:
        radial-gradient(circle at top left, var(--accent-soft), transparent 30%),
        var(--bg-dark);
      color: var(--text-main);
    }

    .hero {
      max-width: 1200px;
      margin: 0 auto 70px;
    }

    .hero-content {
      background: linear-gradient(
        145deg,
        rgba(123, 39, 216, 0.15),
        rgba(88, 70, 249, 0.08)
      );

      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 28px;
      padding: 60px;
      backdrop-filter: blur(10px);
    }

    .badge {
      display: inline-block;
      padding: 8px 16px;
      border-radius: 999px;
      background: rgba(123, 39, 216, 0.2);
      color: #caa7ff;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 1px;
      margin-bottom: 20px;
    }

    h1 {
      font-size: clamp(3rem, 6vw, 5rem);
      margin: 0;
      line-height: 1;
      font-weight: 800;
    }

    h1 span {
      background: linear-gradient(
        45deg,
        var(--accent),
        var(--accent-2)
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .subtitle {
      margin-top: 24px;
      max-width: 700px;
      color: var(--text-muted);
      font-size: 1.1rem;
      line-height: 1.8;
    }

    .content-grid {
      max-width: 1200px;
      margin: auto;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
    }

    .card {
      background: var(--bg-card);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 24px;
      padding: 30px;
      transition: 0.3s ease;
      box-shadow: 0 10px 30px rgba(0,0,0,0.25);
    }

    .card:hover {
      transform: translateY(-6px);
      border-color: rgba(123, 39, 216, 0.4);
      box-shadow: 0 20px 40px rgba(123, 39, 216, 0.15);
    }

    .card h2 {
      margin-top: 0;
      margin-bottom: 18px;
      font-size: 1.3rem;
    }

    .card p {
      color: var(--text-muted);
      line-height: 1.8;
    }

    .mission-card {
      max-width: 1200px;
      margin: 70px auto 0;
      background: linear-gradient(
        145deg,
        var(--bg-surface),
        var(--bg-card)
      );
      border-radius: 28px;
      padding: 50px;
      border: 1px solid rgba(255,255,255,0.08);
      text-align: center;
    }

    .mission-card h2 {
      font-size: 2rem;
      margin-bottom: 20px;
    }
    .mission-card p {
      color: var(--text-muted);
      line-height: 1.9;
      max-width: 800px;
      margin: auto;
    }

    @media (max-width: 768px) {
      .hero-content,
      .mission-card {
        padding: 32px;
      }
      h1 {
        font-size: 3rem;
      }
    }
  `]
})

export class AboutUs { }