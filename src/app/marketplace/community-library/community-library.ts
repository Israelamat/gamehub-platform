import { Component, signal, computed, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommunityGame } from '../../interfaces/game.interfaces';
import { CommunityGameService } from '../../services/community-game.service';

@Component({
  selector: 'app-community-library',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './community-library.html',
  styleUrl: './community-library.css',
})
export class CommunityLibrary {
  private readonly communityGameService = inject(CommunityGameService);

  private games = computed(() => this.communityGameService.games());
  searchTerm = signal<string>('');

  filteredGames = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const games = this.games();

    if (!term) return games;

    return games.filter(game =>
      game.title.toLowerCase().includes(term) ||
      game.author.toLowerCase().includes(term)
    );
  });

  constructor() {
    this.communityGameService.loadGames();
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }

  getImageSrc(base64: string | undefined): string {
    if (!base64) return '';

    if (base64.startsWith('data:image')) {
      return base64;
    }

    return `data:image/png;base64,${base64}`;
  }
}
