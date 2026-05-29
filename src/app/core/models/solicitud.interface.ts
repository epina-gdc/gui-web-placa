import { IngredienteSolicitud } from "./ingrediente-solicitud.interface";

export interface Solicitud {
  idSolicitud: number;
  folio: string;
  fecha: Date;
  estatus: string;
  fechaActualizacion?: Date;
  motivoRechazo?: string;
  responsable?: string;
  ingredientes?: IngredienteSolicitud[];
}