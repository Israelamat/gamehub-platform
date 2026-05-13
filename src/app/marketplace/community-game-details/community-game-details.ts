import { Component, computed, inject, signal } from '@angular/core';
import { CommunityGame } from '../../interfaces/game.interfaces';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-community-game-details',
  imports: [],
  templateUrl: './community-game-details.html',
  styleUrl: './community-game-details.css',
})
export class CommunityGameDetails {
  private route = inject(ActivatedRoute);

  private games = signal<CommunityGame[]>([
    { id: 1, title: 'Neon Drift', author: 'CyberDev', imageBase64: 'assets/game1.jpg', rating: 5, price: 0 },
    { id: 2, title: 'Void Runner', author: 'SpaceWalker', imageBase64: 'assets/game2.jpg', rating: 4, price: 15.99 },
    { id: 3, title: 'Pixel Quest', author: 'RetroMaker', imageBase64: 'assets/game3.jpg', rating: 3, price: 5.50 }
  ]);

  private idFromRoute = computed(() => this.route.snapshot.paramMap.get('id'));

  game = computed(() => {
    const id = this.idFromRoute();
    return this.games().find(g => g.id === Number(id)) || null;
  });

  getImageSrc(base64: string | undefined): string {
    if (!base64) return '';

    if (base64.startsWith('data:image')) {
      return base64;
    }

    return `data:image/png;base64,${base64}`;
  }
}
