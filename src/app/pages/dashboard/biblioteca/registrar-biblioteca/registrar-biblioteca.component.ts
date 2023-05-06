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
  selector: 'app-registrar-biblioteca',
  templateUrl: './registrar-biblioteca.component.html',
  styleUrls: ['./registrar-biblioteca.component.css']
})
export class RegistrarBibliotecaComponent implements OnInit {
  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef;
  lstCliente: Cliente[]
  files: any[] = [];
  form: FormGroup;
  editar: boolean = false;
  mensajeSatisfactorio: string = 'satisfactorio';


  constructor(
    private bibliotecaService: BibliotecaService,
    private clientesService: ClientesService,
    private fb: FormBuilder, private toastr: ToastrService,
    private ruta: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.listarCliente();
    this.initForm();
  }

  listarCliente() {
    this.clientesService.getCliente().subscribe(data => {
      this.lstCliente = data;
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
  clickEnviar() {
    let bibliotecaDocumento: BibliotecaDocumento = new BibliotecaDocumento();
    let cliente: Cliente = new Cliente();
    bibliotecaDocumento.id = this.form.get('id').value;
    bibliotecaDocumento.nombreArchivo = this.form.get('nombreArchivo').value;
    cliente.id = this.form.get('cliente').value;
    bibliotecaDocumento.cliente = cliente;
    let archivo: File;
    archivo = this.files.find((obj) => {
      return obj.name;
    });    
    this.registrar(archivo, bibliotecaDocumento);
    
  }
  registrar(archivo: File, bibliotecaDocumento: BibliotecaDocumento): void {
    this.bibliotecaService.crear(bibliotecaDocumento, archivo).subscribe(data => {
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
