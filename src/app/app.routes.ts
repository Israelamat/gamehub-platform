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
    path: 'courses',
    loadChildren: () =>
      import('./course/course.routes')
        .then(m => m.courseRoutes)
  },

  {
    path: 'contact',
    loadChildren: () =>
      import('./contact/contac.routes')
        .then(m => m.contacRoutes)
  },

  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.routes')
        .then(m => m.authRoutes)
  },

  {
    path: 'order',
    loadChildren: () =>
      import('./order/order.routes')
        .then(m => m.orderRoutes)
  },

  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.routes')
        .then(m => m.profileRoutes)
  },

  {
    path: '**',
    redirectTo: 'home'
  }
];