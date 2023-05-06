import { Cliente } from "./cliente";
import { TipoTarea } from "./tipo-tarea";

export class Tarea {
    id: number;
    nombre: string;
    descripcion: string;
    link: string;
    tipoTarea: TipoTarea;
    cliente: Cliente;
    color: number;
}