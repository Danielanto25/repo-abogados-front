import { NumberFormatStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ActuacionProceso } from 'src/app/models/actuacion-proceso';
import { Estado } from 'src/app/models/estado';
import { Proceso } from 'src/app/models/proceso';
import { TipoProceso } from 'src/app/models/tipo-proceso';
import { ActuacionProcesoService } from 'src/app/services/actuacion-proceso.service';
import { EstadoService } from 'src/app/services/estado.service';
import { ProcesoService } from 'src/app/services/proceso.service';
import { TipoProcesoService } from 'src/app/services/tipo-proceso';


@Component({
  selector: 'app-listar-proceso',
  templateUrl: './reporte-proceso.component.html',
  styleUrls: ['./reporte-proceso.component.css']
})
export class ReporteProcesoComponent implements OnInit {
  page = 1;
  pageSize = 10;
  id: number;
  Procesos: ActuacionProceso[] = [];
  PROCESOS: ActuacionProceso[] = [];
  collectionSize = this.Procesos.length;

  constructor(private ProcesoService: ProcesoService, private actuacionservice: ActuacionProcesoService) {
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
    this.actuacionservice.getActuacionProceso().subscribe(data => {
      this.Procesos = data;
      this.collectionSize = this.Procesos.length;
      console.log(this.Procesos);
    })
  }



}
