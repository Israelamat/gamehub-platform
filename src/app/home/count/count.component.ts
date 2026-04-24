import { Component, ElementRef, inject, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from './../../directives/scroll-reveal'; // Ajusta la ruta

@Component({
  selector: 'app-count',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './count.component.html',
  styleUrls: ['./count.component.css']
})
export class CountComponent implements AfterViewInit {
  private elementRef = inject(ElementRef);

  countDevelopers = 0;
  countGames = 0;
  countHours = 0;
  countIssues = 0;
  counting = false;

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !this.counting) {
        this.startCounting();
        observer.disconnect();
      }
    }, { threshold: 0.2 });

    observer.observe(this.elementRef.nativeElement);
  }

  startCounting() {
    this.counting = true;
    this.animateNumber(n => this.countDevelopers = n, 0, 232, 10);
    this.animateNumber(n => this.countGames = n, 0, 1345, 5);
    this.animateNumber(n => this.countHours = n, 0, 5000, 2); // Un poco más lento para que se vea
    this.animateNumber(n => this.countIssues = n, 0, 450, 8);
  }

  private animateNumber(setter: (val: number) => void, start: number, end: number, duration: number) {
    let current = start;
    const step = end > 1000 ? Math.ceil(end / 100) : Math.ceil(end / 50); // Ajuste automático de velocidad

    const timer = setInterval(() => {
      current += step;
      if (current >= end) {
        setter(end);
        clearInterval(timer);
      } else {
        setter(current);
      }
    }, duration);
  }
}