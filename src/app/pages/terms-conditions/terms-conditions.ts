import { Component } from '@angular/core';

@Component({
  selector: 'app-terms-conditions',
  standalone: true,
  imports: [],

  template: `
    <section class="terms-page">
      <div class="header-card">
        <span class="badge">LEGAL INFORMATION</span>
        <h1>Terms & <span>Conditions</span></h1>
        <p>Please read these terms carefully before using GameHub.</p>
      </div>
      <div class="terms-container">
        <div class="term-card">
          <h2>1. Platform Usage</h2>
          <p>
            Users agree to use GameHub responsibly and respectfully while interacting
            with games, comments and educational content.
          </p>
        </div>
        <div class="term-card">
          <h2>2. User Content</h2>
          <p>
            Users are responsible for the courses, comments and materials they upload
            to the platform.
          </p>
        </div>
        <div class="term-card">
          <h2>3. Community Rules</h2>
          <p>
            Offensive, illegal or inappropriate content may be removed to maintain
            a safe environment for all users.
          </p>
        </div>
        <div class="term-card">
          <h2>4. Educational Project</h2>
          <p>
            GameHub is an academic Final Degree Project created for educational purposes
            and is not officially affiliated with Steam or Valve Corporation.
          </p>
        </div>
      </div>
    </section>
  `,

  styles: [`
    .terms-page {
      min-height: 100vh;
      padding: 120px 24px 60px;
      background:
        radial-gradient(circle at top right, var(--accent-soft), transparent 30%),
        var(--bg-dark);
      color: var(--text-main);
    }

    .header-card {
      max-width: 1100px;
      margin: 0 auto 50px;

      background: linear-gradient(
        145deg,
        rgba(88, 70, 249, 0.15),
        rgba(123, 39, 216, 0.08)
      );

      border-radius: 30px;
      padding: 60px;
      border: 1px solid rgba(255,255,255,0.08);
    }

    .badge {
      display: inline-block;
      padding: 8px 16px;
      border-radius: 999px;
      background: rgba(88, 70, 249, 0.2);
      color: #b8b1ff;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 1px;
      margin-bottom: 20px;
    }

    h1 {
      font-size: clamp(2.8rem, 5vw, 4.5rem);
      margin: 0;
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

    .header-card p {
      margin-top: 20px;
      color: var(--text-muted);
      font-size: 1.1rem;
    }

    .terms-container {
      max-width: 1100px;
      margin: auto;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .term-card {
      background: var(--bg-card);
      border-radius: 22px;
      padding: 32px;
      border: 1px solid rgba(255,255,255,0.06);
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .term-card::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 5px;
      height: 100%;
      background: linear-gradient(
        to bottom,
        var(--accent),
        var(--accent-2)
      );
    }

    .term-card:hover {
      transform: translateX(6px);
      border-color: rgba(123, 39, 216, 0.4);
      box-shadow: 0 15px 35px rgba(123, 39, 216, 0.12);
    }

    .term-card h2 {
      margin-top: 0;
      margin-bottom: 14px;
      font-size: 1.3rem;
    }

    .term-card p {
      color: var(--text-muted);
      line-height: 1.8;
    }

    @media (max-width: 768px) {

      .header-card {
        padding: 35px;
      }

      .term-card {
        padding: 24px;
      }

      h1 {
        font-size: 3rem;
      }
    }
  `]
})

export class TermsConditions { }