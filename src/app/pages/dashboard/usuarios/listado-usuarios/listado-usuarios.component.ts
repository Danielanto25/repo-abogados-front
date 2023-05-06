import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioRol } from 'src/app/models/usuario-rol';
import { UsuarioRolService } from 'src/app/services/usuario-rol.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { role } from 'src/app/shared/role';
import { LogicaGuardService } from 'src/app/guard/logica-guard.service';


@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.css']
})
export class ListadoUsuariosComponent implements OnInit {

  superAdmin: boolean = this.logicaGuard.permisoValido([role.superAdmin]);
  page = 1;
  pageSize = 10;
  users: UsuarioRol[] = [];
  USER: UsuarioRol[] = [];
  collectionSize = this.USER.length;
  form: FormGroup;
  mensajeSatisfactorio: string = 'Satisfactorio';

  constructor(
    private usuarioRolService: UsuarioRolService,
    private toastr: ToastrService,
    private logicaGuard: LogicaGuardService
  ) { this.refreshUsers() }

  ngOnInit(): void {
    this.listar();
  }

  refreshUsers() {
    this.users = this.USER
      .map((usuRol, i) => ({ id: i + 1, ...usuRol }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  listar() {
    this.usuarioRolService.getUsuarioRol().subscribe(data => {
      this.users = data;
      this.USER = data;
      this.collectionSize = this.users.length;
    })
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
        this.usuarioRolService.eliminar(id).subscribe(data => {
          this.toastr.success(this.mensajeSatisfactorio);
          this.listar();

        }, err => this.mensajeError(err));
      }
    })
  }

}
