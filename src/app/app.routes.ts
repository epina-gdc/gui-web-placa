import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'publico',
    pathMatch: 'full',
  },
  {
    path: 'publico',
    loadChildren: () => import('./pages/publico/publico-module').then((m) => m.PublicoModule),
  },
  {
    path: '**',
    redirectTo: 'publico',
    pathMatch: 'full',
  },
];
