import { Tarea } from "./tarea";
import { Usuario } from "./usuario";

export class Comentario{
    id:number;
    texto:string;
    usuario:Usuario;
    tarea:Tarea;
}