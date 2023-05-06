import { Responsable } from "../responsable";
import { Tarea } from "../tarea";

export class TareaResponsablesDto {
    tarea: Tarea;
    responsables: Responsable[];
    color: number;
}