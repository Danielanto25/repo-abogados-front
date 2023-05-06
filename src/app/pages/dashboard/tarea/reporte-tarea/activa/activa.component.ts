import { Component, OnInit } from '@angular/core';
import { AgendarTarea } from 'src/app/models/AgendarTarea';
import { TareaDto } from 'src/app/models/dtos/tarea-dto';
import { TareaResponsablesDto } from 'src/app/models/dtos/tarea-responsables-dto';
import { Responsable } from 'src/app/models/responsable';
import { AgendarTareaService } from 'src/app/services/agendar-tarea.service';
import { ResponsableService } from 'src/app/services/responsable.service';
import { TareasService } from 'src/app/services/tareas.service';



@Component({
  selector: 'app-activa',
  templateUrl: './activa.component.html',
  styleUrls: ['./activa.component.css']
})
export class ActivaComponent implements OnInit {

  page = 1;
  pageSize = 10;
  TareasActivas = [];
  TAREASACTIVAS = [];
  collectionSize = this.TareasActivas.length;

  constructor(
    private responsableService: ResponsableService,
    private agendarTareaService: AgendarTareaService) {
    this.refreshTareas();
  }

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.agendarTareaService.getTareaEstado().subscribe(data => {
      const estado = "Reporte";
      data.forEach(element => {
        let { nombre } = element.estado;
        if (nombre != estado) {
          this.responsableService.listarPorId(element.tarea.id).subscribe((data: Responsable[]) => {
            let dto: TareaResponsablesDto = new TareaResponsablesDto();
            dto.tarea = element.tarea;
            dto.responsables = data;
            this.TareasActivas.push(dto);
            this.TAREASACTIVAS.push(dto);
            this.collectionSize = this.TareasActivas.length;
          })
        }
      })
    })
  }

  /*omitir de momento */
  filtrarFechaInicio(event: any) {
    this.TareasActivas= [];
    this.TAREASACTIVAS = [];
    const filtro = (event.target as HTMLInputElement).value;
    if (filtro == "") {
      this.listar();
    } else {
      this.agendarTareaService.listarPorFechaInicio(filtro).subscribe(data => {
        const estado = "Reporte";
        data.forEach(element => {
          let { nombre } = element.estado;
          if (nombre != estado) {
            this.responsableService.listarPorId(element.tarea.id).subscribe((data: Responsable[]) => {
              let dto: TareaResponsablesDto = new TareaResponsablesDto();
              dto.tarea = element.tarea;
              dto.responsables = data;
              this.TareasActivas.push(dto);
              this.TAREASACTIVAS.push(dto);
              this.collectionSize = this.TareasActivas.length;
            })

          }
        })

      });
    }
  }

  filtrarFechaFin(event: any) {

    this.TareasActivas= [];
    this.TAREASACTIVAS = [];
    const filtro = (event.target as HTMLInputElement).value;
    if (filtro == "") {
      this.listar();
    } else {
      this.agendarTareaService.listarPorFechaFin(filtro).subscribe(data => {
        const estado = "Reporte";
        data.forEach(element => {
          let { nombre } = element.estado;
          if (nombre != estado) {
            this.responsableService.listarPorId(element.tarea.id).subscribe((data: Responsable[]) => {
              let dto: TareaResponsablesDto = new TareaResponsablesDto();
              dto.tarea = element.tarea;
              dto.responsables = data;
              this.TareasActivas.push(dto);
              this.TAREASACTIVAS.push(dto);
              this.collectionSize = this.TareasActivas.length;
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
          if (nombre != estado) {
            this.responsableService.listarPorId(element.tarea.id).subscribe((data: Responsable[]) => {
              let dto: TareaResponsablesDto = new TareaResponsablesDto();
              dto.tarea = element.tarea;
              dto.responsables = data;
              this.TareasActivas.push(dto);
              this.TAREASACTIVAS.push(dto);
              this.collectionSize = this.TareasActivas.length;
            })
          }
        })
      });
    }
  }

  refreshTareas() {
    this.TareasActivas = this.TAREASACTIVAS
      .map((TareasActiva, i) => ({ id: i + 1, ...TareasActiva }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
}
