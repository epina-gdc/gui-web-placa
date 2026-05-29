import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Privado } from '@pages/privado/privado';
import { NAV_PRIVADO_URL } from '@core/utils/url-global';
import { Platillos } from '@pages/privado/pages/platillos/platillos';
import { NuevoPlatillo } from '@pages/privado/pages/nuevo-platillo/nuevo-platillo';
import { MinutaSintetica } from '@pages/privado/pages/minuta-sintetica/minuta-sintetica';
import { Ordenes } from '@pages/privado/pages/ordenes/ordenes';
import { Reportes } from '@pages/privado/pages/reportes/reportes';
import { SolicitudExtraordinariaProveedor } from '@pages/privado/pages/solicitud-extraordinaria-proveedor/solicitud-extraordinaria-proveedor';
import { NuevaSolicitudExtraordinaria } from '@pages/privado/pages/nueva-solicitud-extraordinaria/nueva-solicitud-extraordinaria';
import { Abasto } from '@pages/privado/pages/abasto/abasto';
import { ModuloMedico } from '@pages/privado/pages/modulo-medico/modulo-medico';
import { SolicitudExtraordinaria } from './pages/solicitud-extraordinaria/solicitud-extraordinaria';
import { DetallePlatillo } from '@pages/privado/pages/detalle-platillo/detalle-platillo';

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
        component: Platillos,
      },
      {
        path: NAV_PRIVADO_URL.nuevoPlatillo,
        component: NuevoPlatillo,
      },
      {
        path: NAV_PRIVADO_URL.detallePlatillo,
        component: DetallePlatillo,
      },
      {
        path: NAV_PRIVADO_URL.minutaSintetica,
        component: MinutaSintetica,
      },
      {
        path: NAV_PRIVADO_URL.ordenes,
        component: Ordenes,
      },
      {
        path: NAV_PRIVADO_URL.reportes,
        component: Reportes,
      },
      {
        path: NAV_PRIVADO_URL.solicitudExtraordinariaProveedor,
        component: SolicitudExtraordinariaProveedor,
      },
      {
        path: NAV_PRIVADO_URL.nuevaSolicitudExtraordinaria,
        component: NuevaSolicitudExtraordinaria,
      },
      {
        path: `${NAV_PRIVADO_URL.solicitudExtraordinaria}/:idSolicitud`,
        component: SolicitudExtraordinaria,
      },
      {
        path: NAV_PRIVADO_URL.abasto,
        component: Abasto,
      },
      {
        path: NAV_PRIVADO_URL.moduloMedico,
        component: ModuloMedico,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivadoRoutingModule {}
