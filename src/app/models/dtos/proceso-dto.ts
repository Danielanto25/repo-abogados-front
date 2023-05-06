import { Demandado } from "../demandado";
import { Demandante } from "../demandante";
import { Proceso } from "../proceso";

export class ProcesoDto {
  proceso: Proceso;
  demandantes: Demandante[];
  demandados: Demandado[];
}
