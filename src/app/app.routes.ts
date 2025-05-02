import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'breeds',
    loadComponent: () => import('./breeds/breeds.page'),
  },
  {
    path: 'breed/:id',
    loadComponent: () => import('./breed/breed.page')
  },
  {
    path: '',
    redirectTo: '/breeds',
    pathMatch: 'full',
  },
];
