import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AgendarTarea } from 'src/app/models/AgendarTarea';
import { Cliente } from 'src/app/models/cliente';
import { Tarea } from 'src/app/models/tarea';
import { TipoTarea } from 'src/app/models/tipo-tarea';
import { Estado } from 'src/app/models/estado';
import { ClientesService } from 'src/app/services/clientes.service';
import { TareasService } from 'src/app/services/tareas.service';
import { TipoTareaService } from 'src/app/services/tipo-tarea.service';
import { forbiddenNameValidator } from 'src/app/shared/forbidden-name.directive';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { TareaDto } from 'src/app/models/dtos/tarea-dto';
import { Responsable } from 'src/app/models/responsable';
import { Router } from '@angular/router';
import { ResponsablesMultiplesDto } from 'src/app/models/dtos/responsables-multiples-dto';
import { environment } from 'src/environments/environment';
import { ActuacionProceso } from 'src/app/models/actuacion-proceso';
import { ActuacionProcesoService } from 'src/app/services/actuacion-proceso.service';
import { Proceso } from 'src/app/models/proceso';
import { EstadoTarea } from 'src/app/models/estadoTarea';
import { ProcesoService } from 'src/app/services/proceso.service';
import { ProcesoDto } from 'src/app/models/dtos/proceso-dto';

@Component({
  selector: 'app-registrar-tarea',
  templateUrl: './registrar-tarea.component.html',
  styleUrls: ['./registrar-tarea.component.css']
})

export class RegistrarTareaComponent implements OnInit {

  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef;
  procesos: ProcesoDto[] = [];
  countrykeyword = 'numeroProceso';
  files: any[] = [];
  lstTipoTarea: TipoTarea[];
  lstCliente: Cliente[];
  lstResponsable: Usuario[];
  form: FormGroup;
  editar: Boolean = false;
  mensajeSatisfactorio: string = 'satisfactorio';
  id: number;
  idAgendarTarea: number;

  categoriaSelectedArray = [];

  constructor(
    private tareaService: TareasService,
    private tipoTareaService: TipoTareaService,
    private clientesService: ClientesService,
    private usuarioService: UsuarioService,
    private actuacionesProcesoService: ActuacionProcesoService,
    private procesoService: ProcesoService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private ruta: ActivatedRoute,
    private router: Router
  ) { this.id = Number(this.ruta.snapshot.paramMap.get('id')) }


  ngOnInit(): void {
    this.ListarTipoTarea();
    this.listarCliente();
    this.listarResponsables();
    this.initForm();
    this.showDiv();
    this.toggle();

  }

  onCategoriaPressed(categoriaSelected: any, checked: boolean) {
    if (checked) { //Si el elemento fue seleccionado
      //Agregamos la categoría seleccionada al arreglo de categorías seleccionadas
      this.categoriaSelectedArray.push(categoriaSelected);
    } else { //Si el elemento fue deseleccionado
      //Removemos la categoría seleccionada del arreglo de categorías seleccionadas
      this.categoriaSelectedArray.splice(this.categoriaSelectedArray.indexOf(categoriaSelected), 1);
    }
  }

  ListarTipoTarea() {
    this.tipoTareaService.getTipoTarea().subscribe(data => {
      this.lstTipoTarea = data;
    })
  }

  listarCliente() {
    this.clientesService.getCliente().subscribe(data => {
      this.lstCliente = data;
    })
  }

  listarResponsables() {
    this.usuarioService.getUsuario().subscribe(data => {
      this.lstResponsable = data;
    })
  }

  private initForm(): void {
    this.form = this.fb.group({
      id: new FormControl(''),
      tipoTarea: new FormControl(0, [Validators.required, forbiddenNameValidator(/0/i)]),
      numRadicado: new FormControl(''),
      nombreTarea: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      link: new FormControl('', Validators.required),
      fechaInicio: new FormControl('', Validators.required),
      fechaFin: new FormControl('', Validators.required),
      Responsable: new FormControl(0, [Validators.required, forbiddenNameValidator(/0/i)]),
      cliente: new FormControl(0, [Validators.required, forbiddenNameValidator(/0/i)]),
      //archivo: new FormControl('', Validators.required)//verificar esta validacion
    })
  }

  clickEnviar() {
    let tareaDto: TareaDto = new TareaDto();
    let tarea: Tarea = new Tarea();
    let cliente: Cliente = new Cliente();
    let tipoTarea: TipoTarea = new TipoTarea();
    let agendarTarea: AgendarTarea = new AgendarTarea();
    let usuario: Usuario = new Usuario();
    let estado: EstadoTarea = new EstadoTarea();
    let responsable: Responsable = new Responsable();

    let actuacionesProceso: ActuacionProceso = new ActuacionProceso();
    let proceso: Proceso = new Proceso();
    actuacionesProceso.actuacion = this.form.get('nombreTarea').value;
    actuacionesProceso.anotacion = this.form.get('descripcion').value;
    actuacionesProceso.fechaHoraInicio = this.form.get('fechaInicio').value;
    actuacionesProceso.fechaHoraFin = this.form.get('fechaFin').value;
    actuacionesProceso.proceso = this.form.get('numRadicado').value;

    tarea.nombre = this.form.get('nombreTarea').value;
    tarea.descripcion = this.form.get('descripcion').value;
    tarea.link = this.form.get('link').value;
    tipoTarea.id = this.form.get('tipoTarea').value;
    tarea.tipoTarea = tipoTarea;
    cliente.id = this.form.get('cliente').value;
    tarea.cliente = cliente;

    agendarTarea.fechaHoraInicio = this.form.get('fechaInicio').value;
    agendarTarea.fechaHoraFin = this.form.get('fechaFin').value;
    estado.id = environment.id_estado_tarea;
    agendarTarea.estado = estado;

    tareaDto.agendarTarea = agendarTarea;
    tareaDto.tarea = tarea;

    usuario.id = this.form.get('Responsable').value;
    responsable.usuario = usuario;


    let archivo: File;
    archivo = this.files.find((obj) => {
      return obj.name;
    });

    const checkbox = document.getElementById(
      'chec',
    ) as HTMLInputElement | null;

    const radicado = document.getElementById(
      'Radicado'

    ) as HTMLDivElement | null;

    const numRadicadoField = radicado?.querySelector('ng-autocomplete input') as HTMLInputElement | null;



    if (numRadicadoField?.value.trim() && checkbox?.checked){
      let responsablesMultiplesDto: ResponsablesMultiplesDto = new ResponsablesMultiplesDto;
      responsablesMultiplesDto.responsables = this.categoriaSelectedArray;
      responsablesMultiplesDto.tareaDto = tareaDto
      this.registrarVarios(responsablesMultiplesDto, archivo, responsable)
      this.registrarActuacion(archivo, actuacionesProceso);
    } else if (numRadicadoField?.value.trim()) {
      this.registrar(tareaDto, archivo, responsable);
      this.registrarActuacion(archivo, actuacionesProceso);
    } else if (checkbox?.checked) {
      let responsablesMultiplesDto: ResponsablesMultiplesDto = new ResponsablesMultiplesDto;
      responsablesMultiplesDto.responsables = this.categoriaSelectedArray;
      responsablesMultiplesDto.tareaDto = tareaDto
      this.registrarVarios(responsablesMultiplesDto, archivo, responsable)
    } else {
      this.registrar(tareaDto, archivo, responsable);
    }


/*     if (checkbox?.checked) {
      let responsablesMultiplesDto: ResponsablesMultiplesDto = new ResponsablesMultiplesDto;
      responsablesMultiplesDto.responsables = this.categoriaSelectedArray;
      responsablesMultiplesDto.tareaDto = tareaDto
      this.registrarVarios(responsablesMultiplesDto, archivo, responsable)
    } else {
      this.registrar(tareaDto, archivo, responsable);
      this.registrarActuacion(archivo, actuacionesProceso);
    } */
  }

  registrarVarios(responsablesDto: ResponsablesMultiplesDto, archivo: File, responsable: Responsable): void {
    this.tareaService.crearVarios(responsablesDto, archivo, responsable).subscribe(data => {
      this.toastr.success(this.mensajeSatisfactorio);
      this.form.reset();
      this.router.navigateByUrl('tablero-tarea');
    }, err => this.mensajeError(err));
  }

  registrar(tareaDto: TareaDto, archivo: File, responsable: Responsable): void {
    this.tareaService.crear(tareaDto, archivo, responsable).subscribe(data => {
      this.toastr.success(this.mensajeSatisfactorio);
      this.form.reset();
      this.router.navigateByUrl('tablero-tarea');
    }, err => this.mensajeError(err));
  }

  registrarActuacion(archivo: File, actuacionesProceso: ActuacionProceso): void {
    console.log(actuacionesProceso);
    this.actuacionesProcesoService.crear(actuacionesProceso, archivo).subscribe(data => {
      this.toastr.success(this.mensajeSatisfactorio, "Actuacion Creada");
    }, err => this.mensajeError(err));
  }

  private mensajeError(err: any) {
    console.log(err);
    this.toastr.error('Ha Ocurrido un Problema');
  }

  showDiv() {
    const checkbox = document.getElementById(
      'chec',
    ) as HTMLInputElement | null;

    checkbox?.checked
      ? document.getElementById("ResCheck").style.display = 'flex'
      : document.getElementById("ResCheck").style.display = 'none';
  }

  toggle(): void {
    const selected = document.getElementById('tipoTarea-select') as HTMLSelectElement | null;
    const selectedOption = selected?.options[selected?.selectedIndex];
    if (selectedOption?.text === "Radicado") {
      document.getElementById("Radicado").style.display = "block";
    } else {
      document.getElementById("Radicado").style.display = "none";
    }
  }

  filtrarNumeroRadicado(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    if (filtro == "") {
      this.procesos = [];

    } else {
      this.procesoService.listarPorNumeroRadicado(filtro).subscribe(data => {
        this.procesos = data;
      });
    }
  }

  selectEventCountry(item) { }

  onLocationSubmit() { }

  onCountryCleared(item, flag) { }

  customFilter = function (procesos: any[], query: string): any[] {
    return procesos.filter(x => x.numeroProceso.toLowerCase().startsWith(query.toLowerCase()));
  };

  /*Listado Archivo */

  /**
    * on file drop handler
    */
  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  /**
   * Convert Files list to normal array list
   * @param Files (Files List)
   */
  prepareFilesList(Files: Array<any>) {
    for (const item of Files) {
      this.files.push(item);
    }
    this.fileDropEl.nativeElement.value = "";
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }
}
