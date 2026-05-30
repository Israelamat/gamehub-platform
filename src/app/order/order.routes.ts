import { Routes } from '@angular/router';
import { authGuard } from '../shared/guards/auth-guard';

export const orderRoutes: Routes = [

  {
    path: '',
    loadComponent: () =>
      import('./order/order')
        .then(m => m.Order),
    canActivate: [authGuard]
  }
];