import { Routes } from '@angular/router';

export const profileRoutes: Routes = [

  {
    path: '',
    loadComponent: () =>
      import('./profile/profile')
        .then(m => m.Profile)
  }
];