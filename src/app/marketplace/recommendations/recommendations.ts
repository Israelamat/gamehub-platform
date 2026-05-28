import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameService } from '../../services/game.service';
import { ScrollRevealDirective } from '../../directives/scroll-reveal';

@Component({
  selector: 'app-recommendations',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective, FormsModule],
  templateUrl: './recommendations.html',
  styleUrl: './recommendations.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Recommendations {
  private gameService = inject(GameService);

  searchQuery = signal('');
  results = signal<any[]>([]);
  loading = signal(false);

  hasSearched = signal(false);

  findSimilar() {
    const name = this.searchQuery().trim();

    if (!name) return;

    this.loading.set(true);
    this.hasSearched.set(true);

    this.gameService.getRecommendations(name).subscribe({
      next: (resp) => {
        this.results.set(resp.recommendations.results || []);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error en la recomendación:', err);
        this.results.set([]);
        this.loading.set(false);
      }
    });
  }
}