import { Directive, ElementRef, AfterViewInit, inject, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[reveal]',
  standalone: true
})
export class ScrollRevealDirective implements AfterViewInit {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  @Input() delay: number = 0;
  @Input() anim: 'zoom-in' | 'fade-up' | 'slide-left' | 'fade-right' | 'fade-left' = 'fade-up';

  ngAfterViewInit() {
    this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');

    // Configuración del estado inicial según la animación
    let initialTransform = '';
    switch (this.anim) {
      case 'zoom-in':
        initialTransform = 'scale(0.7)';
        break;
      case 'fade-right':
        initialTransform = 'translateX(-50px)';
        break;
      case 'fade-left':
        initialTransform = 'translateX(50px)';
        break;
      case 'slide-left':
        initialTransform = 'translateX(100px)';
        break;
      case 'fade-up':
      default:
        initialTransform = 'translateY(30px)';
        break;
    }

    this.renderer.setStyle(this.el.nativeElement, 'transform', initialTransform);
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
            this.renderer.setStyle(this.el.nativeElement, 'transform', 'translate(0) scale(1)');
          }, this.delay);
          observer.unobserve(this.el.nativeElement);
        }
      });
    }, { threshold: 0.1 });

    observer.observe(this.el.nativeElement);
  }
}