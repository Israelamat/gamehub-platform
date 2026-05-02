import { ChangeDetectionStrategy, Component, computed, inject, signal, effect, linkedSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameService } from '../../services/game.service';
import { SteamGame } from '../../interfaces/game.interfaces';
import { ScrollRevealDirective } from '../../directives/scroll-reveal';
import { LoadSpinnerComponent } from '../../shared/load-spinner/load-spinner';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-steam-library',
  imports: [CommonModule, ScrollRevealDirective, FormsModule, LoadSpinnerComponent, RouterLink],
  templateUrl: './steam-library.html',
  styleUrl: './steam-library.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SteamLibrary {
  private gameService = inject(GameService);

  search = signal('');
  selectedCategory = signal('All Genres');
  maxPrice = signal(100);
  isLoading = signal(true);

  games = linkedSignal(() => this.gameService.games());

  constructor() {
    //clean old games data for avoid page flicker
    this.gameService.resetGames();
    this.gameService.loadGames();

    effect(() => {
      const currentGames = this.games();
      if (currentGames && currentGames.length > 0) {
        requestAnimationFrame(() => {
          this.isLoading.set(false);
        });
      }
    });
  }

  filteredGames = computed(() => {
    if (this.isLoading()) return [];
    const searchTerm = this.search().toLowerCase().trim();
    const category = this.selectedCategory();
    const priceLimit = this.maxPrice();

    return this.games().filter((game: SteamGame) => {
      const matchesSearch = game.title.toLowerCase().includes(searchTerm) ||
        game.developer.toLowerCase().includes(searchTerm);

      const matchesCategory = category === 'All Genres' ||
        game.tags.includes(category);

      const matchesPrice = game.price <= priceLimit;

      return matchesSearch && matchesCategory && matchesPrice;
    });
  });

  getTags(tags: string) {
    return this.gameService.getTagsArray(tags);
  }

  // --- CONFIGURACIÓN PARA PAGINACIÓN FUTURA ---
  /* 
    Cuando implementes la paginación, el isLoading no debe ser un signal manual.
    Debería reaccionar automáticamente al estado de la petición.
    
    Ejemplo:
    private readonly gamesResource = toSignal(
      toObservable(this.query).pipe( // 'query' sería un computed con (page, search, etc)
        tap(() => this.isLoading.set(true)), // Empezamos a cargar
        switchMap(q => this.gameService.getGames(q)), // Llamada real a la API
        tap(() => this.isLoading.set(false)), // Terminamos de cargar
        catchError(() => {
          this.isLoading.set(false);
          return of([]);
        })
      ),
      { initialValue: [] }
    );
  */
}
