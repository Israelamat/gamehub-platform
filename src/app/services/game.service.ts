import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { SteamGame } from './../interfaces/game-interfaces';

@Injectable({
  providedIn: 'root',
})

export class GameService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  #games = signal<SteamGame[]>([]);

  public games = computed(() => this.#games());

  loadGames(): void {
    this.http.get<SteamGame[]>(`${this.baseUrl}/games`).subscribe({
      next: (data) => this.#games.set(data),
      error: (err) => console.error('Error loading games:', err)
    });
  }

  lodGameById(id: number): SteamGame | undefined {
    return this.#games().find(game => game.id === id);
  }

  getFirstScreenshot(screenshots: string): string {
    return screenshots ? screenshots.split(',')[0] : '';
  }

  getTagsArray(tags: string): string[] {
    return tags ? tags.split(',').map(t => t.trim()) : [];
  }

  resetGames() {
    this.#games.set([]);
  }

}
