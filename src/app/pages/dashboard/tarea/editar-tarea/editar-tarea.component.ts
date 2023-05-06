import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { TareaDto } from 'src/app/models/dtos/tarea-dto';
import { EstadoService } from 'src/app/services/estado.service';
import { AgendarTareaService } from 'src/app/services/agendar-tarea.service';
import { Comentario } from 'src/app/models/Comentario';
import { ComentarioService } from 'src/app/services/comentario.service';
import { EstadoTareaService } from 'src/app/services/estado-tarea.service';
import { EstadoTarea } from 'src/app/models/estadoTarea';

@Component({
  selector: 'app-editar-tarea',
  templateUrl: './editar-tarea.component.html',
  styleUrls: ['./editar-tarea.component.css']
})
export class EditarTareaComponent implements OnInit {

  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef;
  files: any[] = [];
  lstTipoTarea: TipoTarea[];
  lstCliente: Cliente[];
  lstResponsable: Usuario[];
  lstEstado: EstadoTarea[];
  lstComentario: Comentario[] = [];
  form: FormGroup;
  editar: Boolean = false;
  mensajeSatisfactorio: string = 'satisfactorio';
  id: number;

  constructor(
    private AgendarTareaService: AgendarTareaService,
    private tareaService: TareasService,
    private estadoTareaService: EstadoTareaService,
    private tipoTareaService: TipoTareaService,
    private clientesService: ClientesService,
    private estadoService: EstadoService,
    private usuarioService: UsuarioService,
    private comentarioService: ComentarioService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private ruta: ActivatedRoute,
    private router: Router,
  ) { this.id = Number(this.ruta.snapshot.paramMap.get('id')) }


  ngOnInit(): void {
    this.ListarTipoTarea();
    this.listarCliente();
    this.listarResponsables();
    this.initForm();
    this.showDiv();
    this.toggle();
    this.listarEstado();
    this.listarPorId(this.id);
    this.listarComentarios(this.id);

  }

  listarPorId(id: number) {
    this.AgendarTareaService.listarPorId(id).subscribe(data => {
      this.form.get('id').setValue(data.tarea.id);
      this.form.get('agendarTareaId').setValue(data.id);
      this.form.get('tipoTarea').setValue(data.tarea.tipoTarea.id);
      this.form.get('nombreTarea').setValue(data.tarea.nombre);
      this.form.get('descripcion').setValue(data.tarea.descripcion);
      this.form.get('link').setValue(data.tarea.link);
      this.form.get('fechaInicio').setValue(data.fechaHoraInicio);
      this.form.get('fechaFin').setValue(data.fechaHoraFin);
      this.form.get('cliente').setValue(data.tarea.cliente.id)
      this.form.get('estado').setValue(data.estado.id)
    })
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

  listarEstado() {
    this.estadoTareaService.getEstado().subscribe(data => {
      this.lstEstado = data.filter((estado) => estado.nombre != "Reporte");
    })
  }

  listarResponsables() {
    this.usuarioService.getUsuario().subscribe(data => {
      this.lstResponsable = data;
    })
  }

  listarComentarios(id: number) {
    this.comentarioService.getComentarioId(id).subscribe(data => {
      this.lstComentario = data;
    })
  }

  private initForm(): void {
    this.form = this.fb.group({
      id: new FormControl(''),
      agendarTareaId: new FormControl(''),
      tipoTarea: new FormControl(0, [Validators.required, forbiddenNameValidator(/0/i)]),
      numRadicado: new FormControl(''),
      nombreTarea: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      link: new FormControl('', Validators.required),
      fechaInicio: new FormControl('', Validators.required),
      fechaFin: new FormControl('', Validators.required),
      Responsable: new FormControl(0, [Validators.required, forbiddenNameValidator(/0/i)]),
      cliente: new FormControl(0, [Validators.required, forbiddenNameValidator(/0/i)]),
      archivo: new FormControl('', Validators.required),
      estado: new FormControl(0, [Validators.required, forbiddenNameValidator(/0/i)]),
      comentario: new FormControl('')
    })
  }

  clickEnviar() {
    let tareaDto: TareaDto = new TareaDto();
    let tarea: Tarea = new Tarea();
    let cliente: Cliente = new Cliente();
    let tipoTarea: TipoTarea = new TipoTarea();
    let agendarTarea: AgendarTarea = new AgendarTarea();
    let estado: EstadoTarea = new EstadoTarea();

    tarea.id = this.form.get('id').value;
    tarea.nombre = this.form.get('nombreTarea').value;
    tarea.descripcion = this.form.get('descripcion').value;
    tarea.link = this.form.get('link').value;
    tipoTarea.id = this.form.get('tipoTarea').value;
    tarea.tipoTarea = tipoTarea;
    cliente.id = this.form.get('cliente').value;
    tarea.cliente = cliente;

    agendarTarea.id = this.form.get('agendarTareaId').value;
    agendarTarea.fechaHoraInicio = this.form.get('fechaInicio').value;
    agendarTarea.fechaHoraFin = this.form.get('fechaFin').value;
    estado.id = this.form.get('estado').value;
    agendarTarea.estado = estado;
    agendarTarea.tarea = tarea;

    tareaDto.agendarTarea = agendarTarea;
    tareaDto.tarea = tarea;

    let archivo: File;
    archivo = this.files.find((obj) => {
      return obj.name;
    });
    Swal.fire({
      title: 'Estás seguro?',
      text: "No Podras Revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Actualizar!'
    }).then((result) => {
      if (result.isConfirmed && archivo != null) {
        this.modificar(archivo, tareaDto);
      } else {
        this.modificarSinArchivo(tareaDto);
      }
    })
  }

  modificar(archivo: File, tareaDto: TareaDto): void {
    this.tareaService.modificar(tareaDto, archivo).subscribe(data => {
      this.toastr.success(this.mensajeSatisfactorio);
      this.form.reset();
      this.router.navigateByUrl('tablero-tarea');
    }, err => this.mensajeError(err));
  }

  modificarSinArchivo(tareaDto: TareaDto): void {
    this.tareaService.modificarSinArchivo(tareaDto).subscribe(data => {
      this.toastr.success(this.mensajeSatisfactorio);
      this.form.reset();
      this.router.navigateByUrl('tablero-tarea');
    }, err => this.mensajeError(err));
  }

  clickComentario() {
    let comentario: Comentario = new Comentario();
    let tarea: Tarea = new Tarea();

    comentario.texto = this.form.get('comentario').value;
    tarea.id = this.form.get('id').value;
    comentario.tarea = tarea;

    this.GuardarComentario(comentario);
  }

  GuardarComentario(comentario: Comentario) {
    this.comentarioService.crear(comentario).subscribe(data => {
      this.toastr.success(this.mensajeSatisfactorio);
      this.form.get('comentario').reset();
      this.listarComentarios(this.id);
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

  toggle() {
    const selected = document.getElementById(
      'tipoTarea-select',
    ) as HTMLInputElement | null;
    if (selected.value == "3") {
      document.getElementById("radicado").style.display = "block";
    } else {
      document.getElementById("radicado").style.display = "none";
    }
  }

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
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
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
