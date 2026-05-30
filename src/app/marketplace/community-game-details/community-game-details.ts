import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CommunityGameService } from '../../services/community-game.service';
import { CommunityGame } from '../../interfaces/game.interfaces';
import { Base64ImagePipe } from "../../shared/pipes/base64-image-pipe";

@Component({
  selector: 'app-community-game-details',
  imports: [CommonModule, Base64ImagePipe],
  templateUrl: './community-game-details.html',
  styleUrl: './community-game-details.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunityGameDetails {

  private readonly route = inject(ActivatedRoute);
  private readonly communityGameService = inject(CommunityGameService);

  game = signal<CommunityGame | null>(null);
  isLoading = signal(true);

  constructor() {

    this.communityGameService.loadGames();

    effect(() => {
      const id = Number(this.route.snapshot.paramMap.get('id'));

      if (!id) return;

      const found = this.communityGameService
        .games()
        .find(g => g.id === id) ?? null;

      this.game.set(found);
      this.isLoading.set(false);
    });
  }
}