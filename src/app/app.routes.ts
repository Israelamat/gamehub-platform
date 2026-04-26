import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },

  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.routes')
        .then(m => m.homeRoutes)
  },

  {
    path: 'games',
    loadChildren: () =>
      import('./marketplace/marketplace.routes')
        .then(m => m.marketplaceRoutes)
  },

  {
    path: '**',
    redirectTo: 'marketplace'
  }
];