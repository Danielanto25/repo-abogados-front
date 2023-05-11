import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ActuacionProceso } from 'src/app/models/actuacion-proceso';
import { Estado } from 'src/app/models/estado';
import { TipoProceso } from 'src/app/models/tipo-proceso';
import { ActuacionProcesoService } from 'src/app/services/actuacion-proceso.service';
import { EstadoService } from 'src/app/services/estado.service';
import { ProcesoService } from 'src/app/services/proceso.service';
import { TipoProcesoService } from 'src/app/services/tipo-proceso.service';

@Component({
  selector: 'app-mostrar-proceso',
  templateUrl: './mostrar-proceso.component.html',
  styleUrls: ['./mostrar-proceso.component.css']
})
export class MostrarProcesoComponent implements OnInit {

  lstTipoProceso: TipoProceso[];
  lstEstado: Estado[];
  form: FormGroup;
  id: number;
  page = 1;
  pageSize = 10;
  ActProcesos: ActuacionProceso[] = [];
  ACTPROCESOS: ActuacionProceso[] = [];
  collectionSize = this.ActProcesos.length;

  constructor(
    private tipoProcesoService: TipoProcesoService,
    private fb: FormBuilder, private toastr: ToastrService,
    private estadoService: EstadoService,
    private procesoService: ProcesoService,
    private actuacionService: ActuacionProcesoService,
    private ruta: ActivatedRoute
  ) { this.id = Number(this.ruta.snapshot.paramMap.get('id')) }

  ngOnInit(): void {
    this.listarTipoProceso();
    this.initForm();
    this.listarEstado();
    this.listar()
  }

  private initForm(): void {
    this.form = this.fb.group({
      id: new FormControl(''),
      numeroProceso: new FormControl('', Validators.required),
      corporacion: new FormControl('', Validators.required),
      ciudad: new FormControl('', Validators.required),
      despacho: new FormControl('', Validators.required),
      ponente: new FormControl('', Validators.required),
      cuantia: new FormControl('', Validators.required),
      tribunal: new FormControl('', Validators.required),
      tipoProceso: new FormControl(0, Validators.required),
      demandante: new FormControl(0, Validators.required),
      demandado: new FormControl(0, Validators.required),
      cliente: new FormControl(0, Validators.required),
    })
  }

  listarTipoProceso() {
    this.tipoProcesoService.getTipoProceso().subscribe(data => {
      this.lstTipoProceso = data;
      this.listarPorId(this.id);
    })
  }

  listarEstado() {
    this.estadoService.getEstado().subscribe(data => {
      this.lstEstado = data;
    })
  }

  listarPorId(id: number) {
    console.log(this.id);
    this.procesoService.listarPorId(id).subscribe(data => {
      this.form.get('id').setValue(data.proceso.id);
      this.form.get('numeroProceso').setValue(data.proceso.numeroProceso);
      this.form.get('corporacion').setValue(data.proceso.corporacion);
      this.form.get('ciudad').setValue(data.proceso.ciudad);
      this.form.get('despacho').setValue(data.proceso.despacho);
      this.form.get('ponente').setValue(data.proceso.ponente);
      this.form.get('cuantia').setValue(data.proceso.cuantia);
      this.form.get('tribunal').setValue(data.proceso.tribunal);
      this.form.get('tipoProceso').setValue(data.proceso.tipoProceso.id);
      this.form.get('demandante').setValue(data.demandantes[0]);
      this.form.get('demandado').setValue(data.demandados[0]);
      this.form.get('cliente').setValue(data.proceso.cliente.id);

    })
  }
  listar() {
    //listado de actuaciones de procesos
    this.actuacionService.listarPorIdProceso(this.id).subscribe((data: ActuacionProceso[]) => {
      this.ActProcesos = data;
      this.ACTPROCESOS = data;
      this.collectionSize = this.ActProcesos.length;
    })
  }

  refreshProcesos() {
    this.ActProcesos = this.ACTPROCESOS
      .map((ActProceso, i) => ({ id: i + 1, ...ActProceso }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
}
