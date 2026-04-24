import { Component, ElementRef, AfterViewInit, inject, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-count',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './count.component.html',
  styleUrls: ['./count.component.css']
})
export class CountComponent implements AfterViewInit, OnDestroy {
  private el = inject(ElementRef);
  private cdr = inject(ChangeDetectorRef);

  countDevelopers = 0;
  countGames = 0;
  countHours = 0;
  countIssues = 0;

  private hasStarted = false;
  private intervals: ReturnType<typeof setInterval>[] = [];

  ngAfterViewInit() {
    const observer = new IntersectionObserver(([entry]) => {
      // Si entra en pantalla y no ha empezado
      if (entry.isIntersecting && !this.hasStarted) {
        this.hasStarted = true;
        this.startCounting();
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    observer.observe(this.el.nativeElement);
  }

  startCounting() {
    const totalSteps = 116;
    const frameDuration = 20;

    this.animateWithFixedSteps('countDevelopers', 232, totalSteps, frameDuration);
    this.animateWithFixedSteps('countGames', 1345, totalSteps, frameDuration);
    this.animateWithFixedSteps('countHours', 5000, totalSteps, frameDuration);
    this.animateWithFixedSteps('countIssues', 450, totalSteps, frameDuration);
  }

  private animateWithFixedSteps(
    prop: 'countDevelopers' | 'countGames' | 'countHours' | 'countIssues',
    end: number,
    totalSteps: number,
    duration: number
  ) {
    let currentStep = 0;
    const increment = end / totalSteps;

    const interval = setInterval(() => {
      currentStep++;

      if (currentStep >= totalSteps) {
        this[prop] = end;
        clearInterval(interval);
      } else {
        this[prop] = Math.round(increment * currentStep);
      }

      this.cdr.detectChanges();
    }, duration);

    this.intervals.push(interval);
  }

  ngOnDestroy() {
    this.intervals.forEach(i => clearInterval(i));
  }
}