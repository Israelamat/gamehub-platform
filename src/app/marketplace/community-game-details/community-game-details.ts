import { Component, computed, inject, signal } from '@angular/core';
import { CommunityGame } from '../../interfaces/game.interfaces';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CommunityGameService } from '../../services/community-game.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-community-game-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './community-game-details.html',
  styleUrl: './community-game-details.css',
})
export class CommunityGameDetails {
  private readonly route = inject(ActivatedRoute);
  private readonly communityGameService = inject(CommunityGameService);

  private readonly games = computed(() => this.communityGameService.games());

  private readonly idFromRoute = toSignal(
    this.route.paramMap.pipe(
      map(params => Number(params.get('id')))
    ),
    { initialValue: 0 }
  );

  game = computed(() => {
    const id = this.idFromRoute();

    return this.games().find(game => game.id === id) || null;
  });

  constructor() {
    this.communityGameService.loadGames();
  }

  getImageSrc(base64: string | undefined): string {
    if (!base64) return '';

    const cleaned = base64.replace(/\s/g, '');

    if (cleaned.startsWith('data:image')) {
      return cleaned;
    }

    return `data:image/png;base64,${cleaned}`;
  }
}
