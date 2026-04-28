import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { SteamGame } from '../interfaces/game.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class GameService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  #games = signal<SteamGame[]>([]);
  #game = signal<SteamGame>({} as SteamGame);

  public games = computed(() => this.#games());

  loadGames(): void {
    this.http.get<SteamGame[]>(`${this.baseUrl}/games`).subscribe({
      next: (data) => this.#games.set(data),
      error: (err) => console.error('Error loading games:', err)
    });
  }

  lodGameById(id: number): Observable<SteamGame> {
    return this.http.get<SteamGame>(`${this.baseUrl}/games/${id}`);
  }

  getRecommendations(gameName: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/games/recommend/${gameName}`);
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
