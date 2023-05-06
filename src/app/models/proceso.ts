

import { Cliente } from "./cliente";
import { Estado } from "./estado";
import { TipoProceso } from "./tipo-proceso";

export class Proceso {
    id: number;
    numeroProceso: string;
    corporacion: string;
    tribunal: string;
    ciudad: string;
    despacho: string;
    ponente: string;
    cuantia: string;
    tipoProceso: TipoProceso;
    estado: Estado;
    cliente: Cliente;
}