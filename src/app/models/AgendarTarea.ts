import { Estado } from "./estado";
import { Tarea } from "./tarea";

export class AgendarTarea{
    id:number;
    fechaHoraInicio:Date;
    fechaHoraFin:Date;
    estado:Estado;
    tarea:Tarea;
}