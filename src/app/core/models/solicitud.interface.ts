export interface Solicitud {
  idSolicitud: number;
  folio: string;
  fecha: Date;
  estatus: string;
  fechaActualizacion?: Date;
  motivoRechazo?: string;
}