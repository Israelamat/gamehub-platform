import { Routes } from '@angular/router';

export const marketplaceRoutes: Routes = [

  {
    path: '',
    loadComponent: () =>
      import('./steam-library/steam-library')
        .then(m => m.SteamLibrary)
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