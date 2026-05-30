import { Routes } from '@angular/router';
import { authGuard } from '../shared/guards/auth-guard';

export const profileRoutes: Routes = [

  {
    path: '',
    loadComponent: () =>
      import('./profile/profile')
        .then(m => m.Profile),
    canActivate: [authGuard]
  }
];