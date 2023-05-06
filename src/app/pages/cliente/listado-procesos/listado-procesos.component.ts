import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProcesoDto } from 'src/app/models/dtos/proceso-dto';
import { ProcesoService } from 'src/app/services/proceso.service';


@Component({
  selector: 'app-listado-procesos',
  templateUrl: './listado-procesos.component.html',
  styleUrls: ['./listado-procesos.component.css']
})
export class ListadoProcesosComponent implements OnInit {

  page = 1;
  pageSize = 10;
  Procesos: ProcesoDto[] = [];
  PROCESOS: ProcesoDto[] = [];
  collectionSize = this.Procesos.length;
  mensajeSatisfactorio: string = 'Satisfactorio';

  constructor(private ProcesoService: ProcesoService, private toastr: ToastrService) {
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
    const user: string = localStorage.getItem('usuario');
    this.ProcesoService.getProcesoCliente().subscribe(data => {
      console.log(data);
      this.Procesos = data;
      this.PROCESOS = data;
      this.collectionSize = this.Procesos.length;
    })
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
