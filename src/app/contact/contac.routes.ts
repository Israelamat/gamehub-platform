import { Routes } from '@angular/router';

export const contacRoutes: Routes = [

  {
    path: '',
    loadComponent: () =>
      import('./contact/contact')
        .then(m => m.Contact)
  }
];