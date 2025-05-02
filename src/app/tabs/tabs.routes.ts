import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const tabRoutes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'breeds',
        loadComponent: () => import('../breeds/breeds.page'),
      },
      {
        path: 'explore',
        loadComponent: () => import('../explore/explore.page'),
      },
      {
        path: 'favorites',
        loadComponent: () =>
          import('../favorites/favorites.page'),
      },
      {
        path: '',
        redirectTo: '/tabs/breeds',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/breeds',
    pathMatch: 'full',
  },
];

export default tabRoutes;
