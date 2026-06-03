import { ServicioMinuta } from './servicio-minuta.interface';

export interface Minuta {
  idMinuta: number;
  servicios: ServicioMinuta[];
}
