import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaginatedGamesResponse, SteamGame } from '../interfaces/game.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class GameService {
  private readonly http = inject(HttpClient);
  #games = signal<SteamGame[]>([]);

  page = signal(1);
  loading = signal(false);
  hasMore = signal(true);
  search = signal('');
  tag = signal('All');
  maxPrice = signal(100);
  sort = signal<'price_asc' | 'price_desc' | 'createdAt_desc'>('createdAt_desc');
  limit = 20;
  public games = computed(() => this.#games());

  loadGames(): void {
    if (this.loading() || !this.hasMore()) {
      return;
    }

    this.loading.set(true);

    const params = new URLSearchParams({
      page: this.page().toString(),
      limit: this.limit.toString(),
    });

    if (this.search().trim()) {
      params.append('search', this.search().trim());
    }
    if (this.tag() !== 'All') {
      params.append('tag', this.tag());
    }
    if (this.maxPrice()) params.append('maxPrice', this.maxPrice().toString());
    if (this.sort()) params.append('sort', this.sort());

    console.log(params.toString())
    this.http.get<PaginatedGamesResponse>(
      `/games/filtered?${params.toString()}`
    ).subscribe({
      next: (response) => {

        this.#games.update(prev => [
          ...prev,
          ...response.data
        ]);

        this.hasMore.set(response.hasMore);
        this.page.update(p => p + 1);
        this.loading.set(false);
      },

      error: (err) => {
        console.error('Error loading games:', err);
        this.loading.set(false);
      }
    });
  }

  lodGameById(id: number): Observable<SteamGame> {
    return this.http.get<SteamGame>(`/games/${id}`);
  }

  getGamesByIds(ids: number[]): Observable<SteamGame[]> {
    return this.http.post<SteamGame[]>(
      '/games/by-ids',
      { ids }
    );
  }

  getRecommendations(gameName: string): Observable<any> {
    return this.http.get(`/games/recommend/${gameName}`);
  }

  getFirstScreenshot(screenshots: string): string {
    return screenshots ? screenshots.split(',')[0] : '';
  }

  getTagsArray(tags: string): string[] {
    return tags ? tags.split(',').map(t => t.trim()) : [];
  }

  resetGames(): void {
    this.#games.set([]);
    this.page.set(1);
    this.hasMore.set(true);
  }
}
