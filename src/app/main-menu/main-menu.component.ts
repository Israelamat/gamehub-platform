import { Component, Renderer2, inject, DestroyRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-main-menu',
  standalone: true,
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent {

  private renderer = inject(Renderer2);
  private destroyRef = inject(DestroyRef);

  isScrolled = false;

  constructor() {
    const cleanup = this.renderer.listen('document', 'click', (event: Event) => {
      const target = event.target as HTMLElement;

      if (target.classList.contains('mobile-nav-toggle')) {
        const navbar = document.querySelector('#navbar');

        if (navbar) {
          navbar.classList.toggle('navbar-mobile');

          const mobileMenu = navbar.querySelector('ul');
          if (mobileMenu) {
            mobileMenu.classList.toggle('show');
          }
        }

        target.classList.toggle('bi-list');
        target.classList.toggle('bi-x');
      }

      if (target.closest('.navbar') && target.parentElement?.classList.contains('dropdown')) {
        const navbar = document.querySelector('#navbar');

        if (navbar?.classList.contains('navbar-mobile')) {
          event.preventDefault();

          const dropdown = target.nextElementSibling as HTMLElement;
          if (dropdown) {
            dropdown.classList.toggle('dropdown-active');
          }
        }
      }
    });

    this.destroyRef.onDestroy(cleanup);
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.scrollY > 0;
  }
}