import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CourseService } from '../../services/course.service';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';

import { Course } from '../../interfaces/course.interface';

import { DurationPipe } from '../../shared/pipes/duration-pipe';
import { Base64ImagePipe } from '../../shared/pipes/base64-image-pipe';
import { LoadSpinnerComponent } from '../../shared/load-spinner/load-spinner';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-course-detail',
  imports: [
    DurationPipe,
    Base64ImagePipe,
    CommonModule,
    LoadSpinnerComponent
  ],
  templateUrl: './course-detail.html',
  styleUrl: './course-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseDetail {

  private readonly route = inject(ActivatedRoute);
  private readonly courseService = inject(CourseService);
  private readonly orderService = inject(OrderService);
  private readonly authService = inject(AuthService);

  currentUser = this.authService.currentUser;

  private purchasedCourseIds = signal<number[]>([]);

  course = signal<Course | null>(null);

  isLoading = signal(true);

  constructor() {

    effect(() => {

      const id = Number(
        this.route.snapshot.paramMap.get('id')
      );

      if (id) {
        this.fetchCourse(id);
      }

    });
  }

  private fetchCourse(id: number): void {

    this.isLoading.set(true);

    this.courseService.getCourseById(id).subscribe({

      next: (course) => {
        this.course.set(course);
        this.isLoading.set(false);
      },

      error: () => {
        this.course.set(null);
        this.isLoading.set(false);
      }

    });
  }

  isPurchased(id: number): boolean {
    return this.purchasedCourseIds().includes(id);
  }

  addToOrder(courseId: number): void {

    Swal.fire({
      title: 'Adding to cart...',
      html: '<div class="swal-spinner"></div><p>Please wait...</p>',
      showConfirmButton: false,
      allowOutsideClick: false
    });

    try {

      this.orderService.addToCart(courseId, 'course');

      Swal.fire({
        icon: 'success',
        title: 'Added to cart!',
        text: 'Course added successfully',
        confirmButtonColor: 'var(--accent)'
      });

    } catch {

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Could not add course to cart',
        confirmButtonColor: 'var(--accent)'
      });

    }
  }
}