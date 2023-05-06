import { Component, OnInit } from '@angular/core';
import { AgendarTarea } from 'src/app/models/AgendarTarea';
import { TareaResponsablesDto } from 'src/app/models/dtos/tarea-responsables-dto';
import { Responsable } from 'src/app/models/responsable';
import { AgendarTareaService } from 'src/app/services/agendar-tarea.service';
import { ResponsableService } from 'src/app/services/responsable.service';

@Component({
  selector: 'app-terminada',
  templateUrl: './terminada.component.html',
  styleUrls: ['./terminada.component.css']
})
export class TerminadaComponent implements OnInit {

  page = 1;
  pageSize = 10;
  TareasTerminadas = [];
  TAREASTERMINADAS = [];
  collectionSize = this.TareasTerminadas.length;

  constructor(
    private responsableService: ResponsableService,
    private agendarTareaService: AgendarTareaService) {
    this.refreshTareas();
  }

  ngOnInit(): void {
    this.listar();
  }

  refreshTareas() {
    this.TareasTerminadas = this.TAREASTERMINADAS
      .map((TareasTerminada, i) => ({ id: i + 1, ...TareasTerminada }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  listar() {
    this.agendarTareaService.getTareaEstado().subscribe(data => {
      const estado = "Reporte";
      data.forEach(element => {
        console.log(element.estado)
        let { nombre } = element.estado;

        if (nombre == estado) {
          this.responsableService.listarPorId(element.tarea.id).subscribe((data:Responsable[])=>{
            let dto: TareaResponsablesDto = new TareaResponsablesDto();
            dto.tarea = element.tarea;
            dto.responsables = data;
            this.TareasTerminadas.push(dto);
            this.TAREASTERMINADAS.push(dto);
            this.collectionSize = this.TareasTerminadas.length;
          })
        }
      })
    })
  }

  /*omitir de momento */
  filtrarFechaInicio(event: any) {
    this.TareasTerminadas= [];
    this.TAREASTERMINADAS = [];
    const filtro = (event.target as HTMLInputElement).value;
    if (filtro == "") {
      this.listar();
    } else {
      this.agendarTareaService.listarPorFechaInicio(filtro).subscribe(data => {
        const estado = "Reporte";
        data.forEach(element => {
          let { nombre } = element.estado;
          if (nombre == estado) {
            this.responsableService.listarPorId(element.tarea.id).subscribe((data:Responsable[])=>{
              let dto: TareaResponsablesDto = new TareaResponsablesDto();
              dto.tarea = element.tarea;
              dto.responsables = data;
              this.TareasTerminadas.push(dto);
              this.TAREASTERMINADAS.push(dto);
              this.collectionSize = this.TareasTerminadas.length;
            })
          }
        })
      });
    }
  }

  filtrarFechaFin(event: any) {
    this.TareasTerminadas= [];
    this.TAREASTERMINADAS = [];
    const filtro = (event.target as HTMLInputElement).value;
    if (filtro == "") {
      this.listar();
    } else {
      this.agendarTareaService.listarPorFechaFin(filtro).subscribe(data => {
        const estado = "Reporte";
        data.forEach(element => {
          let { nombre } = element.estado;
          if (nombre == estado) {
            this.responsableService.listarPorId(element.tarea.id).subscribe((data:Responsable[])=>{
              let dto: TareaResponsablesDto = new TareaResponsablesDto();
              dto.tarea = element.tarea;
              dto.responsables = data;
              this.TareasTerminadas.push(dto);
              this.TAREASTERMINADAS.push(dto);
              this.collectionSize = this.TareasTerminadas.length;
            })
          }
        })
      });
    }
  }

  filtrarProceso(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    if (filtro == "") {
    this.listar();
    } else {
    this.agendarTareaService.listarPorProceso(filtro).subscribe(data => {
      const estado = "Reporte";
        data.forEach(element => {
          let { nombre } = element.estado;
          if (nombre == estado) {
            this.responsableService.listarPorId(element.tarea.id).subscribe((data:Responsable[])=>{
              let dto: TareaResponsablesDto = new TareaResponsablesDto();
              dto.tarea = element.tarea;
              dto.responsables = data;
              this.TareasTerminadas.push(dto);
              this.TAREASTERMINADAS.push(dto);
              this.collectionSize = this.TareasTerminadas.length;
            })
          }
        })
      });
    }
   }
}
