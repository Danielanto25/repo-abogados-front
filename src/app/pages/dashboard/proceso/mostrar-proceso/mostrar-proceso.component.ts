import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ActuacionProceso } from 'src/app/models/actuacion-proceso';
import { Cliente } from 'src/app/models/cliente';
import { Estado } from 'src/app/models/estado';
import { TipoProceso } from 'src/app/models/tipo-proceso';
import { ActuacionProcesoService } from 'src/app/services/actuacion-proceso.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { EstadoProcesoService } from 'src/app/services/estado-proceso.service';
import { EstadoService } from 'src/app/services/estado.service';
import { ProcesoService } from 'src/app/services/proceso.service';
import { TipoProcesoService } from 'src/app/services/tipo-proceso.service';

@Component({
  selector: 'app-mostrar-proceso',
  templateUrl: './mostrar-proceso.component.html',
  styleUrls: ['./mostrar-proceso.component.css'],
})
export class MostrarProcesoComponent implements OnInit {
  lstTipoProceso: TipoProceso[];
  lstEstado: Estado[];
  lstCliente: Cliente[];
  form: FormGroup;
  id: number;
  page = 1;
  pageSize = 10;
  ActProcesos: ActuacionProceso[] = [];
  ACTPROCESOS: ActuacionProceso[] = [];
  collectionSize = this.ActProcesos.length;

  constructor(
    private tipoProcesoService: TipoProcesoService,
    private clienteService: ClientesService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private estadoService: EstadoProcesoService,
    private procesoService: ProcesoService,
    private actuacionService: ActuacionProcesoService,
    private ruta: ActivatedRoute,
    private router: Router
  ) {
    this.id = Number(this.ruta.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.listarTipoProceso();
    this.initForm();
    this.listarEstado();
    this.listar();
    this.listarCliente();
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
      cliente: new FormControl(0, Validators.required),
      estado: new FormControl(0, Validators.required),
      demandantes: this.fb.array([]),
      demandados: this.fb.array([]),
    });
  }

  listarTipoProceso() {
    this.tipoProcesoService.getTipoProceso().subscribe((data) => {
      this.lstTipoProceso = data;
      this.listarPorId(this.id);
    });
  }

  listarEstado() {
    this.estadoService.getEstado().subscribe((data) => {
      this.lstEstado = data;
    });
  }

  listarCliente() {
    this.clienteService.getCliente().subscribe((data) => {
      this.lstCliente = data;
    });
  }

  listarPorId(id: number) {
    console.log(this.id);
    this.procesoService.listarPorId(id).subscribe((data) => {
      this.form.get('id').setValue(data.proceso.id);
      this.form.get('numeroProceso').setValue(data.proceso.numeroProceso);
      this.form.get('corporacion').setValue(data.proceso.corporacion);
      this.form.get('ciudad').setValue(data.proceso.ciudad);
      this.form.get('despacho').setValue(data.proceso.despacho);
      this.form.get('ponente').setValue(data.proceso.ponente);
      this.form.get('cuantia').setValue(data.proceso.cuantia);
      this.form.get('tribunal').setValue(data.proceso.tribunal);
      this.form.get('tipoProceso').setValue(data.proceso.tipoProceso.id);
      this.form.get('cliente').setValue(data.proceso.cliente.id);
      this.form.get('estado').setValue(data.proceso.estado.id);

    //  for(let demandado:data.demandados){
    //       this.agregarDemandado(demandado.nombre,demandado.documento);
    //  }
    //  data.demandantes.forEach(demandante => {
    //   this.agregarDemandado(demandante.nombre,demandante.documento);
    //  })
    });
  }
  listar() {
    //listado de actuaciones de procesos
    this.actuacionService
      .listarPorIdProceso(this.id)
      .subscribe((data: ActuacionProceso[]) => {
        this.ActProcesos = data;
        this.ACTPROCESOS = data;
        this.collectionSize = this.ActProcesos.length;
      });
  }

  refreshProcesos() {
    this.ActProcesos = this.ACTPROCESOS.map((ActProceso, i) => ({
      id: i + 1,
      ...ActProceso,
    })).slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize
    );
  }

  clickEvent(id: number, nombre: string) {
    const nombreSeparado: string[] = nombre.toLowerCase().split('.');
    this.actuacionService.getPDF(id).subscribe((response) => {
      if (nombreSeparado[nombreSeparado.length - 1] === 'pdf') {
        let file = new Blob([response], { type: 'application/pdf' });
        console.log(file);

        var fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      } else {
        let file = new Blob([response], { type: 'octet/stream' });

        var fileURL = URL.createObjectURL(file);
        var archivo = document.createElement('a');
        archivo.download = nombre;
        archivo.href = fileURL;
        archivo.click();
      }
    });
  }
  agregarDemandado(demandado:string,documento:string) {
    const demandados = this.form.get('demandados') as FormArray;
    demandados.push(this.crearDemandado(demandado,documento));
  }
  crearDemandado(demandado:string,documento:string): FormGroup {
    return this.fb.group({
      demandado: new FormControl(demandado),
      documento: new FormControl(documento),
    });
  }
  agregarDemandante(demandante:string,documento:string) {
    const demandantes = this.form.get('demandantes') as FormArray;
    demandantes.push(this.crearDemandante(demandante,documento));
  }
  crearDemandante(demandante:string,documento:string): FormGroup {
    return this.fb.group({
      demandante: new FormControl(demandante, Validators.required),
      documento: new FormControl(documento, Validators.required),
    });
  }
}
