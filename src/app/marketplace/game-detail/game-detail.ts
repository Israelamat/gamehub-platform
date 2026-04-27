import { ChangeDetectionStrategy, Component, inject, input, computed, signal, effect, untracked } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { GameService } from '../../services/game.service';
import { ScrollRevealDirective } from '../../directives/scroll-reveal';
import { SteamGame } from '../../interfaces/game-interfaces';
import { LoadSpinnerComponent } from '../../shared/load-spinner/load-spinner';

@Component({
  selector: 'app-game-detail',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective, LoadSpinnerComponent],
  templateUrl: './game-detail.html',
  styleUrl: './game-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameDetail {
  private gameService = inject(GameService);
  private location = inject(Location);

  id = input<string>('');

  game = signal<SteamGame | null>(null);
  isLoading = signal(true);

  constructor() {
    effect(() => {
      const currentId = this.id();
      if (currentId) {
        untracked(() => this.fetchGameData(currentId));
      }
    });
  }

  private fetchGameData(currentId: string) {
    if (!currentId || currentId === 'NaN') return;
    this.isLoading.set(true);
    const appId = Number(currentId);

    this.gameService.lodGameById(appId).subscribe({
      next: (data) => {
        this.game.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.game.set(null);
        this.isLoading.set(false);
      }
    });
  }

  screenshots = computed(() => this.game()?.screenshot?.split(',') ?? []);
  gameTags = computed(() => this.game()?.tags?.split(',') ?? []);
  gameGenres = computed(() => this.game()?.genres?.split(',') ?? []);

  goBack() {
    this.location.back();
  }
}