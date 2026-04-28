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

@Component({
  selector: 'app-course-library',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective, FormsModule, LoadSpinnerComponent],
  templateUrl: './course-library.html',
  styleUrl: './course-library.css',
})
export class CourseLibrary {
  private courseService = inject(CourseService);

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

  onImageEncoded(base64: string) {
    this.photo.set(base64);
    console.log('Photo processed successfully');
  }
}