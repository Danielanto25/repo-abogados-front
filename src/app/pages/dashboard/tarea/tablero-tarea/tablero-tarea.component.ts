import { Component, OnInit } from '@angular/core';
import { Tablero } from 'src/app/models/tablero';
import { Tarea } from 'src/app/models/tarea';
import { AgendarTareaService } from 'src/app/services/agendar-tarea.service';
import { TareasService } from 'src/app/services/tareas.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { EstadoService } from 'src/app/services/estado.service';
import { ResponsableService } from 'src/app/services/responsable.service';
import { TareaResponsablesDto } from 'src/app/models/dtos/tarea-responsables-dto';
import { Responsable } from 'src/app/models/responsable';
import { LogicaGuardService } from 'src/app/guard/logica-guard.service';
import { role } from 'src/app/shared/role';
import { EstadoTareaService } from 'src/app/services/estado-tarea.service';
import { AgendarTareaDto } from 'src/app/models/dtos/agendar-tarea-dto';

@Component({
  selector: 'app-tablero-tarea',
  templateUrl: './tablero-tarea.component.html',
  styleUrls: ['./tablero-tarea.component.css']
})
export class TableroTareaComponent implements OnInit {
  tareas: Tarea[] = [];
  tablero: Tablero[] = [];
  mensajeSatisfactorio: string = 'Satisfactorio';

  constructor(
    private tareasService: TareasService,
    private agendarTareaService: AgendarTareaService,
    private estadoService: EstadoTareaService,
    private responsableService: ResponsableService,
    private toastr: ToastrService,
    private logicaGuard: LogicaGuardService
  ) { }

  ngOnInit(): void {
    this.listar();
  }

  listar() {

    const estados = ["Tarea", "Ejecutando", "Ejecutado", "Revisado", "Terminado"];
    if (this.logicaGuard.permisoValido([role.administrador]) || this.logicaGuard.permisoValido([role.superAdmin])) {

      console.log('admin');
      this.agendarTareaService.getTareaDto().subscribe((data:AgendarTareaDto[]) => {
        estados.forEach(estado => {
          let tareas = [];
          data.forEach(element => {
            let { nombre } = element.agendarTarea.estado;
            if (nombre == estado) {
                let dto: TareaResponsablesDto = new TareaResponsablesDto();
                dto.tarea = element.agendarTarea.tarea;
                dto.responsables = element.responsables;
                const diferenciaFechas = (new Date(element.agendarTarea.fechaHoraFin).getTime() - new Date(element.agendarTarea.fechaHoraInicio).getTime()) / (1000 * 60 * 60 * 24);
                dto.color = diferenciaFechas < 1 ? 0 : diferenciaFechas == 1 ? 1 : 2;

                tareas.push(dto)
            }
          })

          this.tablero.push({ estado, tareas })
        })
      })
    } else {
      console.log('no admin');
      const user: string = localStorage.getItem('usuario');
      this.agendarTareaService.getTareaEstadoUser(user).subscribe(data => {
        estados.forEach(estado => {
          let tareas = [];
          data.forEach(element => {
            let { nombre } = element.agendarTarea.estado;
            if (nombre == estado) {
                let dto: TareaResponsablesDto = new TareaResponsablesDto();
                dto.tarea = element.agendarTarea.tarea;
                dto.responsables = element.responsables;
                const diferenciaFechas = (new Date(element.agendarTarea.fechaHoraFin).getTime() - new Date(element.agendarTarea.fechaHoraInicio).getTime()) / (1000 * 60 * 60 * 24);
                dto.color = diferenciaFechas < 1 ? 0 : diferenciaFechas == 1 ? 1 : 2;

                tareas.push(dto)
            }
          })
          this.tablero.push({ estado, tareas })
        })
      })
    }
  }

  eliminar(id: number) {
    Swal.fire({
      title: 'Estás seguro?',
      text: "No Podras Revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Eliminar!'
    }).then((result) => {
      let idReporte: number;
      if (result.isConfirmed) {
        this.estadoService.getEstado().subscribe(data => {
          const reporte = "Reporte";
          data.forEach(element => {
            if (element.nombre == reporte) {
              idReporte = element.id;
            }
          })
          this.tareasService.pasarReporte(id, idReporte).subscribe(data => {
            this.toastr.success(this.mensajeSatisfactorio);
            this.tablero = [];
            this.listar();
          }, err => this.mensajeError(err));
        })

      }
    })
  }

  private mensajeError(err: any) {
    console.log(err);
    this.toastr.error('Ha Ocurrido un Problema');
  }
}
