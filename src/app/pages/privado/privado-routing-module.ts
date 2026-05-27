import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Privado } from '@pages/privado/privado';
import { NAV_PRIVADO_URL } from '@core/utils/url-global';
import { Platillos } from '@pages/privado/pages/platillos/platillos';
import { NuevoPlatillo } from '@pages/privado/pages/nuevo-platillo/nuevo-platillo';

const routes: Routes = [
  {
    path: '',
    component: Privado,
    children: [
      {
        path: '',
        redirectTo: NAV_PRIVADO_URL.platillos,
        pathMatch: 'full',
      },
      {
        path: NAV_PRIVADO_URL.platillos,
        component: Platillos
      },
      {
        path: NAV_PRIVADO_URL.nuevoPlatillo,
        component: NuevoPlatillo
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivadoRoutingModule {}
