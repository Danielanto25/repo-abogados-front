import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BibliotecaDocumento } from 'src/app/models/bibliotecaDocumento';
import { Cliente } from 'src/app/models/cliente';
import { BibliotecaService } from 'src/app/services/biblioteca.service';
import { ClientesService } from 'src/app/services/clientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-biblioteca',
  templateUrl: './editar-biblioteca.component.html',
  styleUrls: ['./editar-biblioteca.component.css']
})
export class EditarBibliotecaComponent implements OnInit {
  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef;
  files: any[] = [];
  id: number;
  mensajeSatisfactorio: string = 'Satisfactorio';
  form: FormGroup;
  editar: boolean = false;
  textoBoton: string = "Editar Registro";
  lstCliente: Cliente[];
  page = 1;
  pageSize = 10;
  bibliotecaDocumentos: BibliotecaDocumento[] = [];
  BIBLIOTECADOCUMENTOS: BibliotecaDocumento[] = [];
  collectionSize = this.bibliotecaDocumentos.length;

  constructor(private bibliotecaService: BibliotecaService,
    private clientesService: ClientesService,
    private ruta: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder, private toastr: ToastrService) {
    this.id = Number(this.ruta.snapshot.paramMap.get('id'));
    this.refreshDocuments();
  }

  ngOnInit(): void {
    this.listarCliente();
    this.initForm();
  }

  listarCliente() {
    this.clientesService.getCliente().subscribe(data => {
      this.lstCliente = data;
      this.listarPorId(this.id);
      console.log(data);

    })
  }
  listarPorId(id: number) {
    this.bibliotecaService.listarClienteId(id).subscribe(data => {

      this.form.get('id').setValue(data.id);
      this.form.get('nombreArchivo').setValue(data.nombreArchivo);
      this.form.get('archivo').setValue(data.archivo);
      this.form.get('cliente').setValue(data.cliente.id);
    })

  }
  private initForm(): void {
    this.form = this.fb.group({
      id: new FormControl(''),
      nombreArchivo: new FormControl('', Validators.required),
      archivo: new FormControl('', Validators.required),
      cliente: new FormControl('', Validators.required),
    })
  }
  refreshDocuments() {
    this.bibliotecaDocumentos = this.BIBLIOTECADOCUMENTOS
      .map((bibliotecaDocumento, i) => ({ id: i + 1, ...bibliotecaDocumento }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  clickEnviar() {
    let bibliotecaDocumento: BibliotecaDocumento = new BibliotecaDocumento();
    let cliente: Cliente = new Cliente();
    bibliotecaDocumento.id = this.form.get('id').value;
    cliente.id = this.form.get('cliente').value;
    bibliotecaDocumento.cliente = cliente;
    bibliotecaDocumento.nombreArchivo = this.form.get('nombreArchivo').value;
    let archivo: File;
    archivo = this.files.find((obj) => {
      return obj.name;
    });
    console.log(archivo);
      
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
        this.modificar(archivo, bibliotecaDocumento);
      }else{
        this.modificarSinArchivo(bibliotecaDocumento);
      }
    })
  }

  modificar(archivo: File, bibliotecaDocumento: BibliotecaDocumento): void {
    this.bibliotecaService.modificar(bibliotecaDocumento, archivo).subscribe(data => {
      this.toastr.success(this.mensajeSatisfactorio);
      this.form.reset();
      this.router.navigateByUrl('listado-biblioteca');
    }, err => this.mensajeError(err));

  }

  modificarSinArchivo(bibliotecaDocumento: BibliotecaDocumento): void {
    this.bibliotecaService.modificarSinArchivo(bibliotecaDocumento).subscribe(data => {
      this.toastr.success(this.mensajeSatisfactorio);
      this.form.reset();
      this.router.navigateByUrl('listado-biblioteca');
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
