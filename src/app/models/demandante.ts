import { Proceso } from "./proceso";

export class Demandante{
  id:number;
  demandante:string;
  docDemandante: string;
  proceso: Proceso;

  constructorListaSimpleInsercion(demandante?:string,docDemandante?:string):Demandante{
    const demandateObj=new Demandante();
    demandateObj.demandante=demandante;
    demandateObj.docDemandante=docDemandante;
    return demandateObj;
  } 

}
