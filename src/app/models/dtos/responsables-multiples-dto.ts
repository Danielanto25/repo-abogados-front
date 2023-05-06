import { Usuario } from "../usuario";
import { TareaDto } from "./tarea-dto";

export class ResponsablesMultiplesDto{
    tareaDto: TareaDto;
    responsables: Usuario[];
}