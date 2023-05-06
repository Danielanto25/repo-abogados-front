import { AgendarTarea } from "../AgendarTarea";
import { Responsable } from "../responsable";

export class AgendarTareaDto{
    agendarTarea: AgendarTarea;
    responsables: Responsable[];
}