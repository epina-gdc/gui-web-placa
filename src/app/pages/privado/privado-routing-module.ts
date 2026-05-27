import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Privado } from '@pages/privado/privado';
import { NAV_PRIVADO_URL } from '@core/utils/url-global';

const routes: Routes = [
  {
    path: '',
    component: Privado,
    children: [
      {
        path: NAV_PRIVADO_URL.platillos,
      },
      {
        path: NAV_PRIVADO_URL.nuevoPlatillo
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivadoRoutingModule {}
