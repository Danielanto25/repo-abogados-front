import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { Estado } from 'src/app/models/estado';
import { Rol } from 'src/app/models/rol';
import { TipoContrato } from 'src/app/models/tipo-contrato';
import { TipoDocumento } from 'src/app/models/tipo-documento';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioRol } from 'src/app/models/usuario-rol';
import { ClientesService } from 'src/app/services/clientes.service';
import { RolService } from 'src/app/services/rol.service';
import { TipoContratoService } from 'src/app/services/tipo-contrato.service';
import { TipoDocumentoService } from 'src/app/services/tipo-documento.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-cliente',
  templateUrl: './registrar-cliente.component.html',
  styleUrls: ['./registrar-cliente.component.css']
})
export class RegistrarClienteComponent implements OnInit {
  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef;
  lstTipoContrato: TipoContrato[];
  lstTipoDocumento: TipoDocumento[];
  form: FormGroup;
  editar: boolean = false;
  files: any[] = [];
  mensajeSatisfactorio: string = 'satisfactorio';
  mensajeSatisfactorioUsuario: string = 'Se ha creado el usuario para este cliente';

  constructor(
    private tipoDocumentoService: TipoDocumentoService,
    private tipoContratoService: TipoContratoService,
    private usuarioService: UsuarioService,
    private rolService: RolService,
    private fb: FormBuilder, private toastr: ToastrService,
    private clientesService: ClientesService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.listarTipoContrato();
    this.listarTipoDocumento();
    this.initForm();
  }
  listarTipoContrato() {
    this.tipoContratoService.getTipoContrato().subscribe(data => {
      this.lstTipoContrato = data;
    })
  }

  listarTipoDocumento() {
    this.tipoDocumentoService.getTipoDocumento().subscribe(data => {
      this.lstTipoDocumento = data;
    })
  }

  private initForm(): void {
    this.form = this.fb.group({
      id: new FormControl(''),
      nombre: new FormControl('', Validators.required),
      documento: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      numeroContrato: new FormControl('', Validators.required),
      tipoContrato: new FormControl('', Validators.required),
      tipoDocumento: new FormControl('', Validators.required),
      archivo: new FormControl('', Validators.required),
    })
  }

  clickEnviar() {
    let cliente: Cliente = new Cliente();
    let tipoDocumento: TipoDocumento = new TipoDocumento();
    let tipoContrato: TipoContrato = new TipoContrato();
    cliente.id = this.form.get('id').value;
    cliente.nombre = this.form.get('nombre').value;
    cliente.documento = this.form.get('documento').value;
    cliente.descripcion = this.form.get('descripcion').value;
    cliente.numeroContrato = this.form.get('numeroContrato').value;
    tipoDocumento.id = this.form.get('tipoDocumento').value;
    cliente.tipoDocumento = tipoDocumento;
    tipoContrato.id = this.form.get('tipoContrato').value;
    cliente.tipoContrato = tipoContrato;
    let archivo: File;
    archivo = this.files.find((obj) => {
      return obj.name;
    });

    /*Usuario*/
    let usuarioRol: UsuarioRol = new UsuarioRol();
    let usuario: Usuario = new Usuario();
    let rol: Rol = new Rol();
    let estado: Estado = new Estado();
    estado.id = 1;
    usuario.estado = estado
    usuario.id = this.form.get('id').value;
    usuario.nombre = this.form.get('nombre').value;
    usuario.documento = this.form.get('documento').value;
    tipoDocumento.id = this.form.get('tipoDocumento').value;
    usuario.password = this.generarContraseña();
    usuario.tipoDocumento = tipoDocumento;

    this.rolService.getRol().subscribe(data => {
      const rolCliente = "cliente";
      data.forEach(element => {
        if (element.nombre == rolCliente) {
          rol.id = element.id;
        }
      })
    });
    usuarioRol.usuario = usuario;
    usuarioRol.rol = rol;

    this.registrar(archivo, cliente, usuarioRol);
  }
  registrar(archivo: File, cliente: Cliente, usuarioRol: UsuarioRol): void {
    this.clientesService.crear(cliente, archivo).subscribe(data => {
      this.toastr.success(this.mensajeSatisfactorio);
      this.form.reset();

      this.usuarioService.crearUsuarioCliente(usuarioRol).subscribe(data => {
        this.toastr.success(this.mensajeSatisfactorioUsuario);
        this.toastr.info("La contraseña del cliente para ingresar es: " + usuarioRol.usuario.password);
        this.form.reset();
      }, err => this.mensajeError(err));

      this.router.navigateByUrl('listado-cliente');
    }, err => this.mensajeError(err));
  }
  private mensajeError(err: any) {
    console.log(err);
    this.toastr.error('Ha Ocurrido un Problema');
  }

  /*Generar Contraseña aleatoria */
  generarContraseña() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 4; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
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
      this.toastr.success("Archivo Subido");
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


