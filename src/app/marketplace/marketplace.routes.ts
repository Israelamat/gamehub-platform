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
    path: 'community',
    loadComponent: () =>
      import('./community-library/community-library')
        .then(m => m.CommunityLibrary)
  },

  {
    path: 'community/:id',
    loadComponent: () =>
      import('./community-game-details/community-game-details')
        .then(m => m.CommunityGameDetails)
  },

  {
    path: 'publish',
    loadComponent: () =>
      import('./community-publish-game/community-publish-game')
        .then(m => m.CommunityPublishGame)
  },

  {
    path: ':id',
    loadComponent: () =>
      import('./game-detail/game-detail')
        .then(m => m.GameDetail)
  },
];