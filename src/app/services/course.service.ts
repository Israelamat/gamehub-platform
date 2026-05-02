import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Course } from '../interfaces/course.interface';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  #courses = signal<Course[]>([]);

  public courses = computed(() => this.#courses());

  loadCourses(): void {
    this.http.get<Course[]>('/course').subscribe({
      next: (data) => this.#courses.set(data),
      error: (err) => console.error('Error loading courses:', err)
    });
  }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>('/course');
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`$'/course/${id}`);
  }

  getCoursesByIds(ids: number[]): Observable<Course[]> {
    return this.http.post<Course[]>('/courses/by-ids',
      { ids }
    );
  }

  createCourse(courseData: Partial<Course>): Observable<Course> {
    return this.http.post<Course>(`$'/course`, courseData).pipe(
      tap(() => this.loadCourses())
    );
  }

  resetCourses(): void {
    this.#courses.set([]);
  }
}