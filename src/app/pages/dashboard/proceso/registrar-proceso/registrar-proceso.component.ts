import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ProcesoDto } from 'src/app/models/dtos/proceso-dto';
import { Estado } from 'src/app/models/estado';
import { EstadoProceso } from 'src/app/models/estadoProceso';
import { Proceso } from 'src/app/models/proceso';
import { TipoProceso } from 'src/app/models/tipo-proceso';
import { ClientesService } from 'src/app/services/clientes.service';
import { EstadoProcesoService } from 'src/app/services/estado-proceso.service';
import { EstadoService } from 'src/app/services/estado.service';
import { ProcesoService } from 'src/app/services/proceso.service';
import { TipoProcesoService } from 'src/app/services/tipo-proceso';
import { Demandante } from 'src/app/models/demandante';
import { Demandado } from 'src/app/models/demandado';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-proceso',
  templateUrl: './registrar-proceso.component.html',
  styleUrls: ['./registrar-proceso.component.css']
})
export class RegistrarProcesoComponent implements OnInit {

  lstTipoProceso: TipoProceso[];

  //LISTAS DE DEMANDANTES Y DEMANDADOS PARA MANDAR EN EL SERVICE
  lstDemandantes: Demandante[] = [];
  lstDemandados: Demandado[] = [];


  lstEstado: EstadoProceso[];
  lstCliente: Cliente[];
  form: FormGroup;
  mensajeSatisfactorio: string = 'Satisfactorio';
  editar: boolean = false;
  textoBoton: string = "Guardar Registro";

  constructor(
    private tipoProcesoService: TipoProcesoService,
    private estadoProcesoService: EstadoProcesoService,
    private router: Router,
    private clienteService: ClientesService,
    private fb: FormBuilder, private toastr: ToastrService,
    private estadoService: EstadoService,
    private procesoService: ProcesoService
  ) { }

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
      demandante: new FormControl('', Validators.required),
      docDemandante: new FormControl('', Validators.required),
      demandado: new FormControl('', Validators.required),
      docDemandado: new FormControl('', Validators.required)
    })
  }

  listarTipoProceso() {
    this.tipoProcesoService.getTipoProceso().subscribe(data => {
      this.lstTipoProceso = data;
      console.log(data);
    })
  }

  listarCliente() {
    this.clienteService.getCliente().subscribe(data => {
      this.lstCliente = data;
    })
  }


  listarEstado() {
    this.estadoProcesoService.getEstado().subscribe(data => {
      this.lstEstado = data;
      console.log(data);
    })
  }

  private mensajeError(err: any) {
    console.log(err);
    this.toastr.error('Ha Ocurrido un Problema');
  }

  registrar(proceso: ProcesoDto): void {
    this.procesoService.crear(proceso).subscribe(data => {
      this.toastr.success(this.mensajeSatisfactorio);
      this.form.reset();
      this.router.navigateByUrl('listado-proceso');
    }, err => this.mensajeError(err));
  }

  clickEnviar() {
    let procesoDto: ProcesoDto = new ProcesoDto();
    let proceso: Proceso = new Proceso();

    let tipoProceso: TipoProceso = new TipoProceso();
    let estado: EstadoProceso = new EstadoProceso();
    let cliente: Cliente = new Cliente();

    let demandante: Demandante = new Demandante();
    let demandado: Demandado = new Demandado();

    proceso.numeroProceso = this.form.get('numeroProceso').value;
    proceso.corporacion = this.form.get('corporacion').value;
    proceso.ciudad = this.form.get('ciudad').value;
    proceso.despacho = this.form.get('despacho').value;
    proceso.ponente = this.form.get('ponente').value;
    proceso.cuantia = this.form.get('cuantia').value;
    proceso.tribunal = this.form.get('tribunal').value;
    proceso.tipoProceso = tipoProceso;
    tipoProceso.id = this.form.get('tipoProceso').value;
    proceso.estado = estado;
    estado.id = this.form.get('estado').value;
    proceso.cliente = cliente;
    cliente.id = this.form.get('cliente').value;

    //NO ENCONTRE MUCHO MAS QUE COMENTAREAR YA QUE TODO TIENE NOMBRE FACIL, GL TONIO

    //DEMANDANTES
    demandante.demandante = this.form.get('demandante').value;
    demandante.docDemandante = this.form.get('docDemandante').value;
    this.lstDemandantes.push(demandante);
    procesoDto.demandantes = this.lstDemandantes;

    //DEMANDADOS
    demandado.demandado = this.form.get('demandado').value;
    demandado.docDemandado = this.form.get('docDemandado').value;
    this.lstDemandados.push(demandado);
    procesoDto.demandados = this.lstDemandados;


    procesoDto.proceso = proceso;
    if (!this.editar) {
      this.registrar(procesoDto);
    }
  }

}
