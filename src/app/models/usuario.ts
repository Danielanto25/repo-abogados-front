
import { TipoDocumento } from "./tipo-documento";
import { Estado } from "./estado";

export class Usuario {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    documento: string;
    tipoDocumento: TipoDocumento;
    estado: Estado;
}
