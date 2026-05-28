import { Routes } from '@angular/router';

export const pagesRoutes: Routes = [

  {
    path: 'about-us',
    loadComponent: () =>
      import('./about-us/about-us')
        .then(m => m.AboutUs)
  },

  {
    path: 'terms-conditions',
    loadComponent: () =>
      import('./terms-conditions/terms-conditions')
        .then(m => m.TermsConditions)
  }
];