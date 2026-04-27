import { Routes } from '@angular/router';

export const marketplaceRoutes: Routes = [

  {
    path: '',
    loadComponent: () =>
      import('./steam-library/steam-library')
        .then(m => m.SteamLibrary)
  },

  {
    path: 'recommendations',
    loadComponent: () =>
      import('./recommendations/recommendations')
        .then(m => m.Recommendations)
  },

  {
    path: ':id',
    loadComponent: () =>
      import('./game-detail/game-detail')
        .then(m => m.GameDetail)
  }
];