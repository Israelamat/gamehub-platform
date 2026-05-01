import { ChangeDetectionStrategy, Component, inject, input, computed, signal, effect, untracked } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { GameService } from '../../services/game.service';
import { ScrollRevealDirective } from '../../directives/scroll-reveal';
import { SteamGame } from '../../interfaces/game.interfaces';
import { LoadSpinnerComponent } from '../../shared/load-spinner/load-spinner';
import { OrderService } from '../../services/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-game-detail',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective, LoadSpinnerComponent],
  templateUrl: './game-detail.html',
  styleUrl: './game-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameDetail {
  private gameService = inject(GameService);
  private readonly orderService = inject(OrderService);
  private location = inject(Location);

  id = input<string>('');

  game = signal<SteamGame | null>(null);
  isLoading = signal(true);

  constructor() {
    effect(() => {
      const currentId = this.id();
      if (currentId) {
        untracked(() => this.fetchGameData(currentId));
      }
    });
  }

  private fetchGameData(currentId: string) {
    if (!currentId || currentId === 'NaN') return;
    this.isLoading.set(true);
    const appId = Number(currentId);

    this.gameService.lodGameById(appId).subscribe({
      next: (data) => {
        this.game.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.game.set(null);
        this.isLoading.set(false);
      }
    });
  }

  screenshots = computed(() => this.game()?.screenshot?.split(',') ?? []);
  gameTags = computed(() => this.game()?.tags?.split(',') ?? []);
  gameGenres = computed(() => this.game()?.genres?.split(',') ?? []);

  addToOrder() {
    const game = this.game();

    if (!game || game.stock === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Out of stock',
        text: 'This game is currently unavailable',
        confirmButtonColor: 'var(--accent)'
      });
      return;
    }

    Swal.fire({
      title: 'Adding to cart...',
      html: '<div class="swal-spinner"></div><p>Please wait...</p>',
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false
    });

    try {
      this.orderService.addToCart(game.appId, 'game');

      Swal.fire({
        icon: 'success',
        title: 'Added to cart!',
        text: `${game.title} has been added to your cart`,
        confirmButtonColor: 'var(--accent)'
      });

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Could not add the game to the cart',
        confirmButtonColor: 'var(--accent)'
      });
    }
  }

  goBack() {
    this.location.back();
  }
}