import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioSesion } from './pages/inicio-sesion/inicio-sesion';
import { NAV_PUBLICO_URL } from '@core/utils/url-global';

const routes: Routes = [
  {
    path: '',
    redirectTo: NAV_PUBLICO_URL.inicioSesion,
    pathMatch: 'full',
  },
  {
    path: NAV_PUBLICO_URL.inicioSesion,
    component: InicioSesion,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicoRoutingModule {}
