import { Component, OnInit, ViewChild, } from '@angular/core';
import { TipoProcesoService } from 'src/app/services/tipo-proceso.service';
import { TipoProceso } from 'src/app/models/tipo-proceso';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { role } from 'src/app/shared/role';
import { LogicaGuardService } from 'src/app/guard/logica-guard.service';


@Component({
  selector: 'app-tipo-proceso',
  templateUrl: './tipo-proceso.component.html',
  styleUrls: ['./tipo-proceso.component.css']
})
export class TipoProcesoComponent implements OnInit {

  superAdmin: boolean = this.logicaGuard.permisoValido([role.superAdmin]);
  page = 1;
  pageSize = 10;
  typelegalactions: TipoProceso[] = [];
  TYPELEGALACTIONS: TipoProceso[] = [];
  form: FormGroup;
  editar: boolean = false;
  mensajeSatisfactorio: string = 'Satisfactorio';
  collectionSize = this.typelegalactions.length;
  textoBoton: string = "Guardar Registro";


  constructor(private tipoProcesoService: TipoProcesoService, private fb: FormBuilder, private toastr: ToastrService, private logicaGuard: LogicaGuardService) {
    this.refreshLegalActions();
  }

  ngOnInit(): void {
    this.listar();
    this.initForm();

  }

  refreshLegalActions() {
    this.typelegalactions = this.TYPELEGALACTIONS
      .map((typelegalaction, i) => ({ id: i + 1, ...typelegalaction }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  listar() {
    this.tipoProcesoService.getTipoProceso().subscribe(data => {
      this.typelegalactions = data;
      this.TYPELEGALACTIONS = data;
      console.log(data);
      this.collectionSize = this.typelegalactions.length;
    })
  }
  private initForm(): void {
    this.form = this.fb.group({
      nombre: new FormControl('', Validators.required),
      id: new FormControl('')
    })
  }
  clickEnviar() {
    let tipoProceso: TipoProceso = new TipoProceso();
    tipoProceso.id = this.form.get('id').value;
    tipoProceso.nombre = this.form.get('nombre').value;

    console.log(tipoProceso);
    if (!this.editar) {
      this.registrar(tipoProceso);
    } else {
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
          this.editarAccion(tipoProceso);
        } else {
          this.editar = false;
          this.form.reset()
          this.listar()
        }
      })

    }

  }

  editarAccion(tipoProceso: TipoProceso): void {
    this.tipoProcesoService.modificar(tipoProceso).subscribe(data => {
      this.toastr.success(this.mensajeSatisfactorio);
      this.editar = !this.editar;
      this.textoBoton = "Guardar Registro";
      this.form.reset();
      this.listar();
    }, err => this.mensajeError(err))
  }

  registrar(tipoProceso: TipoProceso): void {
    this.tipoProcesoService.crear(tipoProceso).subscribe(data => {
      this.toastr.success(this.mensajeSatisfactorio);
      this.form.reset();
      this.listar();
    }, err => this.mensajeError(err));
  }

  private mensajeError(err: any) {
    console.log(err);
    this.toastr.error('Ha Ocurrido un Problema');
  }
  modificar(tipoProceso: TipoProceso): void {
    this.form.get('id').setValue(tipoProceso.id);
    this.form.get('nombre').setValue(tipoProceso.nombre);
    this.textoBoton = "Actualizar Registro";
    this.editar = true;
  }

  eliminar(id: number) {
    Swal.fire({
      title: 'Estás seguro?',
      text: "No Podras Revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tipoProcesoService.eliminar(id).subscribe(data => {
          this.toastr.success(this.mensajeSatisfactorio);
          this.form.reset();
          this.listar();

        }, err => this.mensajeError(err));
      }
    })
  }


}
