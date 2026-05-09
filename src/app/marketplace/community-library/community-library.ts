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
}
