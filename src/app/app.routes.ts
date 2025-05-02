import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes'),
  },
  {
    path: 'breed/:id',
    loadComponent: () => import('./breed/breed.page')
  }
];
