import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameService } from '../../services/game.service';
import { ScrollRevealDirective } from '../../directives/scroll-reveal';
import { RouterLink } from '@angular/router';
import { GameRecommendation } from '../../interfaces/game.interfaces';

@Component({
  selector: 'app-recommendations',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective, FormsModule, RouterLink],
  templateUrl: './recommendations.html',
  styleUrl: './recommendations.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Recommendations {
  private gameService = inject(GameService);

  searchQuery = signal('');
  results = signal<GameRecommendation[]>([]);
  loading = signal(false);

  hasSearched = signal(false);

  findSimilar() {
    const name = this.searchQuery().trim();

    if (!name) return;

    this.loading.set(true);
    this.hasSearched.set(true);

    this.gameService.getRecommendations(name).subscribe({
      next: (recommendations) => {
        console.log('RESP API:', recommendations);
        this.results.set(recommendations);
        this.loading.set(false);
      },
      error: (err) => {
        this.results.set([]);
        this.loading.set(false);
      }
    });
  }
}