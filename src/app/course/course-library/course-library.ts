import { Component, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, startWith, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { CourseService } from '../../services/course.service';
import { ScrollRevealDirective } from './../../directives/scroll-reveal';
import { Course } from '../../interfaces/course.interface';
import { FormsModule } from '@angular/forms';
import { LoadSpinnerComponent } from "../../shared/load-spinner/load-spinner";
import Swal from 'sweetalert2';
import { OrderService } from '../../services/order.service';
import { effect } from '@angular/core';
import { OrderData } from '../../interfaces/order.interface';
import { AuthService } from '../../services/auth.service';
import { DurationPipe } from "../../shared/pipes/duration-pipe";
import { Base64ImagePipe } from "../../shared/pipes/base64-image-pipe";

@Component({
  selector: 'app-course-library',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective, FormsModule, LoadSpinnerComponent, DurationPipe, Base64ImagePipe],
  templateUrl: './course-library.html',
  styleUrl: './course-library.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseLibrary {
  private courseService = inject(CourseService);
  private readonly orderService = inject(OrderService);
  private readonly authService = inject(AuthService);
  currentUser = this.authService.currentUser;
  private purchasedCourseIds = signal<number[]>([]);

  private courseData = this.courseService.getCourses().pipe(
    map((data) => ({ data, loading: false })),
    startWith({ data: [] as Course[], loading: true }),
    catchError((err) => {
      console.error('API Error:', err);
      return of({ data: [] as Course[], loading: false });
    })
  );

  state = toSignal(this.courseData, {
    initialValue: { data: [] as Course[], loading: true },
  });

  courses = signal<Course[]>([]);
  loading = computed(() => this.state().loading);
  photo = signal<string>('');

  search = signal('');
  maxPrice = signal(1000);
  duration = signal('all');
  priceFilter = signal('All');

  isLoading = signal(true);

  constructor() {
    effect(() => {
      const user = this.currentUser();

      if (user?.id) {
        this.loadUserOrders(user.id);
      }
    });

    this.courseService.getCourses().subscribe((data) => {
      this.courses.set(data);

      requestAnimationFrame(() => {
        this.isLoading.set(false);
      });
    });
  }

  onImageEncoded(base64: string) {
    this.photo.set(base64);
    console.log('Photo processed successfully');
  }

  addToOrder(courseId: number) {

    if (!courseId) {
      Swal.fire({
        icon: 'warning',
        title: 'Course not found',
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
      this.orderService.addToCart(courseId, 'course');

      Swal.fire({
        icon: 'success',
        title: 'Added to cart!',
        text: `Course has been added to your cart`,
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

  loadUserOrders(userId: number): void {

    this.orderService.getUserOrders(userId).subscribe({
      next: (orders: OrderData[]) => {

        const courseIds = orders
          .flatMap(order => order.courses ?? [])
          .map(course => course.id);

        this.purchasedCourseIds.set(courseIds);
      },
      error: (err) => {
        console.error(err);
        this.purchasedCourseIds.set([]);
      }
    });
  }

  isPurchased = (id: number) =>
    this.purchasedCourseIds().includes(id);

  filteredCourses = computed(() => {
    if (this.isLoading()) return [];

    const searchTerm = this.search().toLowerCase().trim();
    const maxPrice = this.maxPrice();
    const durationFilter = this.duration();

    return this.courses().filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm) ||
        course.content.toLowerCase().includes(searchTerm);

      const matchesPrice = course.price <= maxPrice;

      const hours = course.duration / 60;

      const matchesDuration = (() => {
        switch (durationFilter) {
          case '1-5': return hours >= 1 && hours <= 5;
          case '5-20': return hours > 5 && hours <= 20;
          case '20-50': return hours > 20 && hours <= 50;
          case '50-100': return hours > 50 && hours <= 100;
          case '100-200': return hours > 100 && hours <= 200;
          default: return true;
        }
      })();

      return matchesSearch && matchesPrice && matchesDuration;
    });
  });
}