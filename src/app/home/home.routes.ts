import { Routes } from '@angular/router';

export const homeRoutes: Routes = [

  {
    path: '',
    loadComponent: () =>
      import('./home.component')
        .then(m => m.HomeComponent)
  },

  // {
  //   path: 'game/:id',
  //   loadComponent: () =>
  //     import('./pages/detail/detail.component')
  //       .then(m => m.DetailComponent)
  // },

  // {
  //   path: 'recommend/:title',
  //   loadComponent: () =>
  //     import('./pages/recommend/recommend.component')
  //       .then(m => m.RecommendComponent)
  // }
];