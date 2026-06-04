import { Routes } from '@angular/router';
import { NAV_BASE_URL } from '@core/utils/url-global';
import { authGuard } from '@core/guards/auth-guard';
import { redirectIfAuthenticatedGuard } from '@core/guards/redirect-if-autenticated-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: NAV_BASE_URL.publico,
    pathMatch: 'full',
  },
  {
    path: NAV_BASE_URL.publico,
    loadChildren: () => import('./pages/publico/publico-module').then((m) => m.PublicoModule),
    canActivate: [redirectIfAuthenticatedGuard],
  },
  {
    path: NAV_BASE_URL.privado,
    loadChildren: () => import('./pages/privado/privado-module').then((m) => m.PrivadoModule),
    canActivateChild: [authGuard],
  },
  {
    path: '**',
    redirectTo: NAV_BASE_URL.publico,
    pathMatch: 'full',
  },
];
