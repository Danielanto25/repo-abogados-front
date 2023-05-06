import { AgendarTarea } from "../AgendarTarea";
import { DocumentoTarea } from "../DocumentoTarea";
import { Tarea } from "../tarea";

export class TareaDto{

    tarea: Tarea;
    agendarTarea: AgendarTarea;
    documentoTarea: DocumentoTarea;
    //responsable: Responsable;
}