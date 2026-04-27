import { Routes } from '@angular/router';

export const authRoutes: Routes = [

  {
    path: '',
    loadComponent: () =>
      import('./auth/auth')
        .then(m => m.Auth)
  }
];