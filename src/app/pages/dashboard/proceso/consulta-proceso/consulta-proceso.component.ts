import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ActuacionProceso } from 'src/app/models/actuacion-proceso';
import { ProcesoDto } from 'src/app/models/dtos/proceso-dto';
import { Proceso } from 'src/app/models/proceso';
import { ActuacionProcesoService } from 'src/app/services/actuacion-proceso.service';
import { ProcesoService } from 'src/app/services/proceso.service';

@Component({
  selector: 'app-consulta-proceso',
  templateUrl: './consulta-proceso.component.html',
  styleUrls: ['./consulta-proceso.component.css']
})
export class ConsultaProcesoComponent implements OnInit {

  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef;
  countrykeyword = 'numeroProceso';
  procesos: ProcesoDto[] = [];
  form: FormGroup;
  editar: boolean = false;
  mensajeSatisfactorio: string = 'satisfactorio';
  files: any[] = [];

  constructor(
    private procesoService: ProcesoService,
    private fb: FormBuilder,
    private actuacionesProcesoService: ActuacionProcesoService,
    private toastr: ToastrService,
    private ruta: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group({
      id: new FormControl(''),
      locationCountry: new FormControl('', Validators.required),
      actuacion: new FormControl('', Validators.required),
      anotacion: new FormControl('', Validators.required),
      archivo: new FormControl('', Validators.required),
      proceso: new FormControl('', Validators.required)

    })
  }

/*   listar() {
    this.procesoService.getProceso().subscribe(data => {
      this.procesos = data;
    })
  } */

  clickEnviar() {
    let actuacionesProceso: ActuacionProceso = new ActuacionProceso();
    actuacionesProceso.id = this.form.get('id').value;
    actuacionesProceso.actuacion = this.form.get('actuacion').value;
    actuacionesProceso.anotacion = this.form.get('anotacion').value;
    actuacionesProceso.proceso = this.form.get('locationCountry').value;
    let archivo: File;
    archivo = this.files.find((obj) => {
      return obj.name;
    });
    // console.log(proceso)
    this.registrar(archivo, actuacionesProceso);

  }

  registrar(archivo: File, actuacionesProceso: ActuacionProceso): void {
    console.log(actuacionesProceso);
    this.actuacionesProcesoService.crearSinFechas(actuacionesProceso, archivo).subscribe(data => {
      this.toastr.success(this.mensajeSatisfactorio);
      this.form.reset();
      this.router.navigateByUrl('listado-proceso');
    }, err => this.mensajeError(err));
  }

  private mensajeError(err: any) {
    console.log(err);
    this.toastr.error('Ha Ocurrido un Problema');
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

  /*Filter Input */

  selectEvent(item) {
    // do something with selected item
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    // do something
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

