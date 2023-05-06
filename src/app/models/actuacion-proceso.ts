import { Proceso } from "./proceso";

export class ActuacionProceso {

	id: number;
	actuacion: string;
	anotacion: string;
	archivo: string;
  fechaCreacion: String;
  fechaHoraInicio: string;
  fechaHoraFin: String;
  proceso: Proceso;
}
