import { TipoContrato } from "./tipo-contrato";
import { TipoDocumento } from "./tipo-documento";

export class Cliente{
    id:number;
    nombre:string;
    documento:string;
    descripcion:string;
    numeroContrato:string;
    archivo:string;
    tipoContrato:TipoContrato;
    tipoDocumento:TipoDocumento;
}