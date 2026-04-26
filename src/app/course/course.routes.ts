import { Routes } from '@angular/router';

export const courseRoutes: Routes = [

  {
    path: '',
    loadComponent: () =>
      import('./course-library/course-library')
        .then(m => m.CourseLibrary)
  },

  {
    path: ':id',
    loadComponent: () =>
      import('./course-detail/course-detail')
        .then(m => m.CourseDetail)
  },

  {
    path: 'crete-course',
    loadComponent: () =>
      import('./create-course/create-course')
        .then(m => m.CreateCourse)
  }
];