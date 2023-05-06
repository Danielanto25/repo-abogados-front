import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { TipoContrato } from 'src/app/models/tipo-contrato';
import { TipoDocumento } from 'src/app/models/tipo-documento';
import { ClientesService } from 'src/app/services/clientes.service';
import { TipoContratoService } from 'src/app/services/tipo-contrato.service';
import { TipoDocumentoService } from 'src/app/services/tipo-documento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {
  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef;
  lstTipoContrato: TipoContrato[];
  lstTipoDocumento: TipoDocumento[];
  form: FormGroup;
  editar: boolean = false;
  files: any[] = [];
  textoBoton: string = "Editar Registro";
  mensajeSatisfactorio: string = 'satisfactorio';
  id: number;
  cliente: Cliente = new Cliente;



  constructor(
    private tipoDocumentoService: TipoDocumentoService,
    private tipoContratoService: TipoContratoService,
    private fb: FormBuilder, private toastr: ToastrService,
    private clientesService: ClientesService,
    private ruta: ActivatedRoute,
    private router: Router,
  ) { this.id = Number(this.ruta.snapshot.paramMap.get('id')) }

  ngOnInit(): void {
    this.listarTipoContrato();
    this.listarTipoDocumento();
    this.initForm();
    this.listarPorId(this.id);
  }

  listarPorId(id: number) {
    console.log(this.id);
    this.clientesService.listarPorId(id).subscribe(data => {
      console.log(data);

      this.form.get('id').setValue(data.id);
      this.form.get('nombre').setValue(data.nombre);
      this.form.get('documento').setValue(data.documento);
      this.form.get('descripcion').setValue(data.descripcion);
      this.form.get('archivo').setValue(data.archivo);
      this.form.get('numeroContrato').setValue(data.numeroContrato);
      this.form.get('tipoContrato').setValue(data.tipoContrato.id);
      this.form.get('tipoDocumento').setValue(data.tipoDocumento.id);
    })
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
      tipoDocumento: new FormControl(0, Validators.required),
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
        this.modificar(archivo, cliente);
      } else {
        this.modificarSinArchivo(cliente);
      }
    })

  }
  modificar(archivo: File, cliente: Cliente): void {
    this.clientesService.modificar(cliente, archivo).subscribe(data => {
      this.toastr.success(this.mensajeSatisfactorio);
      this.form.reset();
      this.router.navigateByUrl('listado-cliente');
    }, err => this.mensajeError(err));

  }
  modificarSinArchivo(cliente: Cliente): void {
    this.clientesService.modificarSinArchivo(cliente).subscribe(data => {
      this.toastr.success(this.mensajeSatisfactorio);
      this.form.reset();
      this.router.navigateByUrl('listado-cliente');
    }, err => this.mensajeError(err));
  }

  private mensajeError(err: any) {
    console.log(err);
    this.toastr.error('Ha Ocurrido un Problema');
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
  fileBrowseHandler(Files) {
    this.prepareFilesList(Files);
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
