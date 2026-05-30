import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { CourseService } from '../../services/course.service';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';

import { ScrollRevealDirective } from '../../directives/scroll-reveal';
import { LoadSpinnerComponent } from '../../shared/load-spinner/load-spinner';
import { DurationPipe } from '../../shared/pipes/duration-pipe';
import { Base64ImagePipe } from '../../shared/pipes/base64-image-pipe';

import { OrderData } from '../../interfaces/order.interface';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-course-library',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective, FormsModule, LoadSpinnerComponent, DurationPipe, Base64ImagePipe, RouterLink],
  templateUrl: './course-library.html',
  styleUrl: './course-library.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseLibrary {

  private readonly courseService = inject(CourseService);
  private readonly orderService = inject(OrderService);
  private readonly authService = inject(AuthService);

  currentUser = this.authService.currentUser;

  isLoading = signal(true);

  courses = computed(() => this.courseService.courses());

  private purchasedCourseIds = signal<number[]>([]);

  photo = signal('');

  search = signal('');
  maxPrice = signal(1000);
  duration = signal('all');

  constructor() {

    this.loadCourses();

    effect(() => {
      const currentCourses = this.courses();

      if (currentCourses.length > 0) {
        requestAnimationFrame(() => {
          this.isLoading.set(false);
        });
      }
    });

    effect(() => {
      const user = this.currentUser();

      if (user?.id) {
        this.loadUserOrders(user.id);
      }
    });
  }

  private loadCourses(): void {
    this.courseService.resetCourses();
    this.courseService.loadCourses();
  }

  onImageEncoded(base64: string): void {
    this.photo.set(base64);
  }

  addToOrder(courseId: number): void {

    if (!courseId) {
      Swal.fire({
        icon: 'warning',
        title: 'Course not found',
        text: 'This course is currently unavailable',
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

      this.orderService.addToCart(courseId, 'course');

      Swal.fire({
        icon: 'success',
        title: 'Added to cart!',
        text: 'Course has been added to your cart',
        confirmButtonColor: 'var(--accent)'
      });

    } catch {

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Could not add the course to the cart',
        confirmButtonColor: 'var(--accent)'
      });

    }
  }

  loadUserOrders(userId: number): void {

    this.orderService.getUserOrders(userId).subscribe({
      next: (orders: OrderData[]) => {

        const courseIds = orders
          .flatMap(order => order.courses ?? [])
          .map(course => course.id);

        this.purchasedCourseIds.set(courseIds);
      },
      error: () => {
        this.purchasedCourseIds.set([]);
      }
    });
  }

  isPurchased(id: number): boolean {
    return this.purchasedCourseIds().includes(id);
  }

  filteredCourses = computed(() => {

    const searchTerm = this.search().toLowerCase().trim();
    const maxPrice = this.maxPrice();
    const durationFilter = this.duration();

    return this.courses().filter(course => {

      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm) ||
        course.content.toLowerCase().includes(searchTerm);

      const matchesPrice = course.price <= maxPrice;

      const hours = course.duration / 60;

      const matchesDuration = (() => {
        switch (durationFilter) {
          case '1-5':
            return hours >= 1 && hours <= 5;

          case '5-20':
            return hours > 5 && hours <= 20;

          case '20-50':
            return hours > 20 && hours <= 50;

          case '50-100':
            return hours > 50 && hours <= 100;

          case '100-200':
            return hours > 100 && hours <= 200;

          default:
            return true;
        }
      })();

      return matchesSearch && matchesPrice && matchesDuration;
    });
  });
}