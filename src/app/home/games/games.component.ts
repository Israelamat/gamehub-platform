import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../directives/scroll-reveal';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent {
  selectedFilter: string = '*';

  games = [
    {
      title: 'Dwarf Fortress',
      category: 'filter-simulator',
      image: '/img/games/Dwarf-fortress.png',
      description: 'Descripción del juego'
    },
    {
      title: 'Minekos',
      category: 'filter-2D',
      image: '/img/games/Minekos.jpg',
      description: 'Descripción del juego'
    },
    {
      title: 'Tinkertown',
      category: 'filter-3D',
      image: '/img/games/tinkertown.jpg',
      description: 'Descripción del juego'
    }
  ];

  setFilter(filter: string) {
    this.selectedFilter = filter;
  }

  isVisible(category: string): boolean {
    return this.selectedFilter === '*' || this.selectedFilter === category;
  }
}