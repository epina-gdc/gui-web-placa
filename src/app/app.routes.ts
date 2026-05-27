import { Routes } from '@angular/router';
import { NAV_BASE_URL } from '@core/utils/url-global';

export const routes: Routes = [
  {
    path: '',
    redirectTo: NAV_BASE_URL.publico,
    pathMatch: 'full',
  },
  {
    path: NAV_BASE_URL.publico,
    loadChildren: () => import('./pages/publico/publico-module').then((m) => m.PublicoModule),
  },
  {
    path: NAV_BASE_URL.privado,
    loadChildren: () => import('./pages/privado/privado-module').then((m) => m.PrivadoModule),
  },
  {
    path: '**',
    redirectTo: NAV_BASE_URL.publico,
    pathMatch: 'full',
  },
];
