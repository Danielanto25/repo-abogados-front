import { Component, OnInit, ViewChild } from '@angular/core';
import { TipoTareaService } from 'src/app/services/tipo-tarea.service';
import { TipoTarea } from 'src/app/models/tipo-tarea';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { role } from 'src/app/shared/role';
import { LogicaGuardService } from 'src/app/guard/logica-guard.service';


@Component({
  selector: 'app-tipo-tarea',
  templateUrl: './tipo-tarea.component.html',
  styleUrls: ['./tipo-tarea.component.css']
})
export class TipoTareaComponent implements OnInit {

  superAdmin: boolean = this.logicaGuard.permisoValido([role.superAdmin]);
  page = 1;
  pageSize = 10;
  typetasks: TipoTarea[] = [];
  TYPETASK: TipoTarea[] = [];
  form: FormGroup;
  editar: boolean = false;
  mensajeSatisfactorio: string = 'Satisfactorio';
  collectionSize: number = this.typetasks.length;
  textoBoton: string = "Guardar Registro";

  constructor(private tipoTareaService: TipoTareaService, private fb: FormBuilder, private toastr: ToastrService, private logicaGuard: LogicaGuardService) {
    this.refreshTypeTasks();

  }

  ngOnInit(): void {
    this.listar();
    this.initForm();
  }

  refreshTypeTasks() {

    this.typetasks = this.TYPETASK
      .map((typetask, i) => ({ id: i + 1, ...typetask }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);

  }

  listar() {
    this.tipoTareaService.getTipoTarea().subscribe(data => {
      this.typetasks = data;
      this.TYPETASK = data;
      console.log(data);
      this.collectionSize = this.typetasks.length;
    })
  }
  private initForm(): void {
    this.form = this.fb.group({
      nombre: new FormControl('', Validators.required),
      id: new FormControl('')
    })
  }
  clickEnviar() {
    let tipoTarea: TipoTarea = new TipoTarea();
    tipoTarea.id = this.form.get('id').value;
    tipoTarea.nombre = this.form.get('nombre').value;

    console.log(tipoTarea);
    if (!this.editar) {
      this.registrar(tipoTarea);
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
          this.editarAccion(tipoTarea);
        } else {
          this.editar = false;
          this.form.reset()
          this.listar()
        }
      })
    }
  }

  editarAccion(tipoTarea: TipoTarea): void {
    this.tipoTareaService.modificar(tipoTarea).subscribe(data => {
      this.toastr.success(this.mensajeSatisfactorio);
      this.editar = !this.editar;
      this.textoBoton = "Guardar Registro";
      this.form.reset();
      this.listar();
    }, err => this.mensajeError(err))
  }


  registrar(tipoTarea: TipoTarea): void {
    this.tipoTareaService.crear(tipoTarea).subscribe(data => {
      this.toastr.success(this.mensajeSatisfactorio);
      this.form.reset();
      this.listar();
    }, err => this.mensajeError(err));
  }

  private mensajeError(err: any) {
    console.log(err);
    this.toastr.error('Ha Ocurrido un Problema');
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
        this.tipoTareaService.eliminar(id).subscribe(data => {
          this.toastr.success(this.mensajeSatisfactorio);
          this.form.reset();
          this.listar();

        }, err => this.mensajeError(err));
      }
    })

  }


  modificar(tipoTarea: TipoTarea): void {
    this.form.get('id').setValue(tipoTarea.id);
    this.form.get('nombre').setValue(tipoTarea.nombre);
    this.textoBoton = "Actualizar Registro";
    this.editar = true;
  }
}
