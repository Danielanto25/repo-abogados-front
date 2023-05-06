import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LogicaGuardService } from 'src/app/guard/logica-guard.service';
import { ProcesoDto } from 'src/app/models/dtos/proceso-dto';
import { ProcesoService } from 'src/app/services/proceso.service';
import { role } from 'src/app/shared/role';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-proceso',
  templateUrl: './listar-proceso.component.html',
  styleUrls: ['./listar-proceso.component.css']
})
export class ListarProcesoComponent implements OnInit {

  superAdmin: boolean = this.logicaGuard.permisoValido([role.superAdmin]);
  page = 1;
  pageSize = 10;
  Procesos: ProcesoDto[] = [];
  PROCESOS: ProcesoDto[] = [];
  collectionSize = this.Procesos.length;
  mensajeSatisfactorio: string = 'Satisfactorio';

  constructor(private ProcesoService: ProcesoService, private toastr: ToastrService, private logicaGuard: LogicaGuardService) {
    this.refreshProcesos();
  }

  ngOnInit(): void {
    this.listar();
  }

  refreshProcesos() {
    this.Procesos = this.PROCESOS
      .map((Proceso, i) => ({ id: i + 1, ...Proceso }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  listar() {
    this.ProcesoService.getDto().subscribe(data => {
      console.log(data);
      this.Procesos = data;
      this.PROCESOS = data;
      this.collectionSize = this.Procesos.length;
    })
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
      if (result.isConfirmed) {
        this.ProcesoService.eliminar(id).subscribe(data => {
          this.toastr.success(this.mensajeSatisfactorio);
          this.listar();

        }, err => this.mensajeError(err));
      }
    })
  }

  private mensajeError(err: any) {
    console.log(err);
    this.toastr.error('Ha Ocurrido un Problema');
  }

  filtrarNumeroRadicado(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    if (filtro == "") {
      this.listar();
    } else {
      this.ProcesoService.listarPorNumeroRadicado(filtro).subscribe(data => {
        this.Procesos = data;
        this.PROCESOS = data;
        this.collectionSize = this.Procesos.length;
      });
    }
  }
  filtrarDespacho(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    if (filtro == "") {
      this.listar();
    } else {
      this.ProcesoService.listarPorDespacho(filtro).subscribe(data => {
        this.Procesos = data;
        this.PROCESOS = data;
        this.collectionSize = this.Procesos.length;
      });
    }
  }
  filtrarDemandante(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    if (filtro == "") {
      this.listar();
    } else {
      this.ProcesoService.listarPorDemandante(filtro).subscribe(data => {
        this.Procesos = data;
        this.PROCESOS = data;
        this.collectionSize = this.Procesos.length;
      });
    }
  }
  filtrarDemandado(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    if (filtro == "") {
      this.listar();
    } else {
      this.ProcesoService.listarPorDemandado(filtro).subscribe(data => {
        this.Procesos = data;
        this.PROCESOS = data;
        this.collectionSize = this.Procesos.length;
      });
    }
  }
}