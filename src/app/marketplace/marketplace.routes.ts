import { Routes } from '@angular/router';

export const marketplaceRoutes: Routes = [

  {
    path: '',
    loadComponent: () =>
      import('./steam-library/steam-library')
        .then(m => m.SteamLibrary)
  },

  {
    path: ':id',
    loadComponent: () =>
      import('./game-detail/game-detail')
        .then(m => m.GameDetail)
  },

  // {
  //   path: 'recommend/:title',
  //   loadComponent: () =>
  //     import('./pages/recommend/recommend.component')
  //       .then(m => m.RecommendComponent)
  // }
];