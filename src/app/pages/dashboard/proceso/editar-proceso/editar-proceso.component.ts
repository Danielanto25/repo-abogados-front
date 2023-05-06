import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Estado } from 'src/app/models/estado';
import { Cliente } from 'src/app/models/cliente';
import { Proceso } from 'src/app/models/proceso';
import { TipoProceso } from 'src/app/models/tipo-proceso';
import { EstadoService } from 'src/app/services/estado.service';
import { ProcesoService } from 'src/app/services/proceso.service';
import { TipoProcesoService } from 'src/app/services/tipo-proceso';
import Swal from 'sweetalert2';
import { ClientesService } from 'src/app/services/clientes.service';
import { EstadoProceso } from 'src/app/models/estadoProceso';
import { EstadoProcesoService } from 'src/app/services/estado-proceso.service';
import { ProcesoDto } from 'src/app/models/dtos/proceso-dto';
import { Demandante } from 'src/app/models/demandante';
import { Demandado } from 'src/app/models/demandado';

@Component({
  selector: 'app-editar-procedeso',
  templateUrl: './editar-proceso.component.html',
  styleUrls: ['./editar-proceso.component.css']
})
export class EditarProcesoComponent implements OnInit {

  lstTipoProceso: TipoProceso[];
  lstEstado: EstadoProceso[];
  lstCliente: Cliente[];
  form: FormGroup;
  mensajeSatisfactorio: string = 'Satisfactorio';
  editar: boolean = false;
  textoBoton: string = "Guardar Registro";
  id: number;
  demandantes: Demandante[] = [];
  demandados: Demandado[] = [];

  constructor(
    private tipoProcesoService: TipoProcesoService,
    private estadoProcesoService: EstadoProcesoService,
    private clienteService: ClientesService,
    private fb: FormBuilder, private toastr: ToastrService,
    private estadoService: EstadoService,
    private procesoService: ProcesoService,
    private ruta: ActivatedRoute,
    private router: Router
  ) { this.id = Number(this.ruta.snapshot.paramMap.get('id')) }

  ngOnInit(): void {
    this.listarTipoProceso();
    this.initForm();
    this.listarEstado();
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
      estado: new FormControl(0, Validators.required),
      cliente: new FormControl(0, Validators.required),
      demandante: new FormControl(0, Validators.required),
      docDemandante: new FormControl(0, Validators.required),
      demandado: new FormControl(0, Validators.required),
      docDemandado: new FormControl(0, Validators.required)
    })
  }

  listarTipoProceso() {
    this.tipoProcesoService.getTipoProceso().subscribe(data => {
      this.lstTipoProceso = data;
      this.listarPorId(this.id);
      console.log(data);
    })
  }

  listarEstado() {
    this.estadoProcesoService.getEstado().subscribe(data => {
      this.lstEstado = data;
      console.log(data);
    })
  }

  listarCliente() {
    this.clienteService.getCliente().subscribe(data => {
      console.log("Holaaaa", data);
      this.lstCliente = data;
    })
  }

  listarPorId(id: number) {
    console.log(this.id);
    this.procesoService.listarPorId(id).subscribe(data => {
      console.log(data);
      this.form.get('id').setValue(data.proceso.id);
      this.form.get('numeroProceso').setValue(data.proceso.numeroProceso);
      this.form.get('corporacion').setValue(data.proceso.corporacion);
      this.form.get('ciudad').setValue(data.proceso.ciudad);
      this.form.get('despacho').setValue(data.proceso.despacho);
      this.form.get('ponente').setValue(data.proceso.ponente);
      this.form.get('cuantia').setValue(data.proceso.cuantia);
      this.form.get('tribunal').setValue(data.proceso.tribunal);
      this.form.get('tipoProceso').setValue(data.proceso.tipoProceso.id);
      this.form.get('estado').setValue(data.proceso.estado.id);
      this.form.get('cliente').setValue(data.proceso.cliente.id);
      this.form.get('demandante').setValue(data.demandantes[0].demandante);
      this.form.get('docDemandante').setValue(data.demandantes[0].docDemandante);
      this.form.get('demandado').setValue(data.demandados[0].demandado);
      this.form.get('docDemandado').setValue(data.demandados[0].docDemandado);

    })

  }

  private mensajeError(err: any) {
    console.log(err);
    this.toastr.error('Ha Ocurrido un Problema');
  }

  modificar(proceso: ProcesoDto): void {
    this.procesoService.modificar(proceso).subscribe(data => {
      this.toastr.success(this.mensajeSatisfactorio);
      this.form.reset();
    }, err => this.mensajeError(err));

  }

  clickEnviar() {
    let procesoDto: ProcesoDto = new ProcesoDto;
    let demandante: Demandante = new Demandante;
    let demandado: Demandado = new Demandado;

    demandante.demandante = this.form.get('demandante').value;
    demandante.docDemandante = this.form.get('docDemandante').value;
    this.demandantes.push(demandante);
    procesoDto.demandantes = this.demandantes;

    demandado.demandado = this.form.get('demandado').value;
    demandado.docDemandado = this.form.get('docDemandado').value;
    this.demandados.push(demandado);
    procesoDto.demandados = this.demandados;

    let proceso: Proceso = new Proceso();
    let tipoProceso: TipoProceso = new TipoProceso();
    let estado: EstadoProceso = new EstadoProceso();
    let cliente: Cliente = new Cliente();
    proceso.id = this.form.get('id').value;
    proceso.numeroProceso = this.form.get('numeroProceso').value;
    proceso.corporacion = this.form.get('corporacion').value;
    proceso.ciudad = this.form.get('ciudad').value;
    proceso.despacho = this.form.get('despacho').value;
    proceso.ponente = this.form.get('ponente').value;
    proceso.cuantia = this.form.get('cuantia').value;
    proceso.tribunal = this.form.get('tribunal').value;
    proceso.tipoProceso = tipoProceso;
    tipoProceso.id = this.form.get('tipoProceso').value;
    estado.id = this.form.get('estado').value;
    proceso.estado = estado;
    cliente.id = this.form.get('cliente').value;
    proceso.cliente = cliente;

    procesoDto.proceso = proceso;


    Swal.fire({
      title: 'Estás seguro?',
      text: "No Podras Revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Actualizar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.modificar(procesoDto);
        this.router.navigateByUrl('listado-proceso');
      }
    })
  }
}
