import { Component, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommunityGame } from '../../interfaces/game.interfaces';

@Component({
  selector: 'app-community-library',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './community-library.html',
  styleUrl: './community-library.css',
})
export class CommunityLibrary {
  private games = signal<CommunityGame[]>([
    { id: 1, title: 'Neon Drift', author: 'CyberDev', imageUrl: '', rating: 5, price: 0 },
    { id: 2, title: 'Void Runner', author: 'SpaceWalker', imageUrl: '', rating: 4, price: 15.99 },
    { id: 3, title: 'Pixel Quest', author: 'RetroMaker', imageUrl: '', rating: 3, price: 5.50 }
  ]);

  searchTerm = signal<string>('');

  filteredGames = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) return this.games();

    return this.games().filter(game =>
      game.title.toLowerCase().includes(term) ||
      game.author.toLowerCase().includes(term)
    );
  });

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }
}
