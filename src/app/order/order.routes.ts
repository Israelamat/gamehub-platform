import { Routes } from '@angular/router';

export const orderRoutes: Routes = [

  {
    path: '',
    loadComponent: () =>
      import('./order/order')
        .then(m => m.Order)
  }
];