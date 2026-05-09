import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { CommunityGame, CommunityGamePayload } from '../interfaces/game.interfaces';

@Injectable({
  providedIn: 'root',
})

export class CommunityGameService {
  private readonly http = inject(HttpClient);
  public games = computed(() => this.#games());

  #games = signal<CommunityGame[]>([]);

  loadGames(): void {
    this.http.get<CommunityGame[]>('/community-game').subscribe({
      next: (data) => this.#games.set(data),
      error: (err) => console.error('Error loading community games:', err),
    });
  }

  getGames(): Observable<CommunityGame[]> {
    return this.http.get<CommunityGame[]>('/community-game');
  }

  getGameById(id: number): Observable<CommunityGame> {
    return this.http.get<CommunityGame>(`/community-game/${id}`);
  }

  createGame(gameData: CommunityGamePayload): Observable<CommunityGame> {
    return this.http
      .post<CommunityGame>('/community-game', gameData)
      .pipe(
        tap(() => this.loadGames())
      );
  }

  updateGame(id: number, gameData: Partial<CommunityGame>): Observable<any> {
    return this.http
      .put(`/community-game/${id}`, gameData)
      .pipe(
        tap(() => this.loadGames())
      );
  }

  deleteGame(id: number): Observable<any> {
    return this.http
      .delete(`/community-game/${id}`)
      .pipe(
        tap(() => this.loadGames())
      );
  }

  resetGames(): void {
    this.#games.set([]);
  }
}
