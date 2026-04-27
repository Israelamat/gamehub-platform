import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameService } from '../../services/game.service';
import { ScrollRevealDirective } from '../../directives/scroll-reveal';

@Component({
  selector: 'app-recommendations',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective, FormsModule],
  templateUrl: './recommendations.html',
  styleUrl: './recommendations.css'
})
export class Recommendations {
  private gameService = inject(GameService);

  searchQuery = signal('');
  results = signal<any[]>([]);
  loading = signal(false);

  // Esta señal nos ayuda a saber si mostrar el mensaje de "No encontrado"
  hasSearched = signal(false);

  // Este método SOLO se ejecuta cuando el usuario hace el Submit del Form
  findSimilar() {
    const name = this.searchQuery().trim();

    // Si el input está vacío, no hacemos nada
    if (!name) return;

    this.loading.set(true);
    this.hasSearched.set(true);

    // Llamada manual al servicio
    this.gameService.getRecommendations(name).subscribe({
      next: (resp) => {
        // Estructura según tu JSON: resp.recommendations.results
        this.results.set(resp.recommendations.results || []);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error en la recomendación:', err);
        this.results.set([]);
        this.loading.set(false);
      }
    });
  }
}