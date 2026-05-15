import { Component, inject, signal, computed } from '@angular/core';
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

@Component({
  selector: 'app-course-library',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective, FormsModule, LoadSpinnerComponent],
  templateUrl: './course-library.html',
  styleUrl: './course-library.css',
})
export class CourseLibrary {
  private courseService = inject(CourseService);
  private readonly orderService = inject(OrderService);
  private readonly authService = inject(AuthService);

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

  courses = computed(() => this.state().data);
  loading = computed(() => this.state().loading);

  photo = signal<string>('');

  constructor() {
    effect(() => {
      const user = this.authService.currentUser();

      if (user?.id) {
        this.loadUserOrders(user.id);
      }
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

  getImageSrc(base64: string | undefined): string {
    if (!base64) return '';

    if (base64.startsWith('data:image')) {
      return base64;
    }

    return `data:image/png;base64,${base64}`;
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
}