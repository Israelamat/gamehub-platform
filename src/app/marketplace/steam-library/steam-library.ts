import { ChangeDetectionStrategy, Component, computed, effect, inject, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { GameService } from '../../services/game.service';
import { ScrollRevealDirective } from '../../directives/scroll-reveal';
import { LoadSpinnerComponent } from '../../shared/load-spinner/load-spinner';

@Component({
  selector: 'app-steam-library',
  imports: [CommonModule, ScrollRevealDirective, FormsModule, LoadSpinnerComponent, RouterLink],
  templateUrl: './steam-library.html',
  styleUrl: './steam-library.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SteamLibrary {
  private gameService = inject(GameService);
  isLoading = signal(true);
  scrollTrigger = viewChild<any>('scrollTrigger');
  private observer!: IntersectionObserver;

  search = signal('');
  selectedCategory = signal('All Genres');
  tag = signal('All');
  maxPrice = signal(100);

  sort = signal<
    'price_asc' |
    'price_desc' |
    'createdAt_desc'
  >('createdAt_desc');

  games = computed(() => this.gameService.games());
  constructor() {
    this.loadFilteredGames();
    this.loadFilteredGames();

    effect((onCleanup) => {
      const currentGames = this.games();

      const timeout = setTimeout(() => {
        this.isLoading.set(false);
      }, 10000);

      if (currentGames.length > 0) {
        requestAnimationFrame(() => {
          this.isLoading.set(false);
        });
      }

      onCleanup(() => clearTimeout(timeout));
    });

    effect((onCleanup) => {
      const trigger = this.scrollTrigger();
      if (!trigger) return;
      this.observer = new IntersectionObserver(entries => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          this.gameService.loadGames();
        }
      }, {
        rootMargin: '1000px'
      });
      this.observer.observe(trigger.nativeElement);
      onCleanup(() => {
        this.observer.disconnect();
      });
    });
  }

  applyFilters(): void {
    this.isLoading.set(true);

    this.gameService.resetGames();

    this.gameService.search.set(this.search());
    this.gameService.tag.set(this.tag());
    this.gameService.maxPrice.set(this.maxPrice());
    this.gameService.sort.set(this.sort());

    this.gameService.loadGames();
  }

  getTags(tags: string): string[] {
    return this.gameService.getTagsArray(tags);
  }

  private loadFilteredGames(): void {
    this.gameService.resetGames();
    this.gameService.loadGames();
  }
}