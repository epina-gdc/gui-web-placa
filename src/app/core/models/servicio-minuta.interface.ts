import { Servicio } from "./servicio.interface";
import { Variedad } from "./variedad.interface";

export interface ServicioMinuta {
    servicio: Servicio;
    variedad: Variedad[];
}