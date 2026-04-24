import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from './../../directives/scroll-reveal'; // Mira que la ruta sea correcta

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './partners.component.html',
  styleUrl: './partners.component.css',
})
export class PartnersComponent {
}