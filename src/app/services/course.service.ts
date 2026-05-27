import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course, CreateCourseRequest } from '../interfaces/course.interface';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private readonly http = inject(HttpClient);

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
    return this.http.get<Course>(`/course/${id}`);
  }

  getCoursesByIds(ids: number[]): Observable<Course[]> {
    return this.http.post<Course[]>('/course/by-ids',
      { ids }
    );
  }

  createCourse(courseData: CreateCourseRequest): Observable<Course> {
    return this.http.post<Course>(`/course`, courseData).pipe(
      tap(() => this.loadCourses())
    );
  }

  resetCourses(): void {
    this.#courses.set([]);
  }
}