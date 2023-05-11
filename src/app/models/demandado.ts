import { Proceso } from "./proceso";

export class Demandado{
  id:number;
  demandado:string;
  docDemandado: string;
  proceso: Proceso;
  constructorListaSimpleInsercion(demandado?:string,docDemandado?:string):Demandado{
    const demandadoObj=new Demandado();
    demandadoObj.demandado=demandado;
    demandadoObj.docDemandado=docDemandado;
    return demandadoObj;
  } 
}
