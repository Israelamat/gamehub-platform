import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { catchError, map, of, startWith, switchMap } from 'rxjs';
import { Course } from '../../interfaces/course.interface';
import { toSignal } from '@angular/core/rxjs-interop';
import Swal from 'sweetalert2';
import { DurationPipe } from "../../shared/pipes/duration-pipe";
import { Base64ImagePipe } from "../../shared/pipes/base64-image-pipe";
import { CommonModule } from '@angular/common';
import { LoadSpinnerComponent } from "../../shared/load-spinner/load-spinner";

@Component({
  selector: 'app-course-detail',
  imports: [DurationPipe, Base64ImagePipe, CommonModule, LoadSpinnerComponent],
  templateUrl: './course-detail.html',
  styleUrl: './course-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly courseService = inject(CourseService);
  private readonly orderService = inject(OrderService);
  private readonly authService = inject(AuthService);

  private purchasedCourseIds = signal<number[]>([]);
  currentUser = this.authService.currentUser;

  private courseData = this.route.paramMap.pipe(
    map(params => Number(params.get('id'))),
    switchMap(id =>
      this.courseService.getCourseById(id).pipe(
        map(course => ({
          course,
          loading: false
        })),
        startWith({
          course: null as Course | null,
          loading: true
        }),
        catchError(() =>
          of({
            course: null as Course | null,
            loading: false
          })
        )
      )
    )
  );

  state = toSignal(this.courseData, {
    initialValue: {
      course: null as Course | null,
      loading: true
    }
  });

  course = computed(() => this.state().course);
  loading = computed(() => this.state().loading);

  isPurchased = (id: number) =>
    this.purchasedCourseIds().includes(id);

  addToOrder(courseId: number) {

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