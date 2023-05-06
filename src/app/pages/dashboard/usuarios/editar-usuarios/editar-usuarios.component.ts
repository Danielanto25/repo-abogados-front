import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Estado } from 'src/app/models/estado';
import { Rol } from 'src/app/models/rol';
import { TipoDocumento } from 'src/app/models/tipo-documento';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioRol } from 'src/app/models/usuario-rol';
import { RolService } from 'src/app/services/rol.service';
import { TipoDocumentoService } from 'src/app/services/tipo-documento.service';
import { UsuarioRolService } from 'src/app/services/usuario-rol.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-usuarios',
  templateUrl: './editar-usuarios.component.html',
  styleUrls: ['./editar-usuarios.component.css']
})
export class EditarUsuariosComponent implements OnInit {

  lstRoles: Rol[];
  lstTiposDocumento: TipoDocumento[];
  form: FormGroup;
  mensajeSatisfactorio: string = 'Satisfactorio';
  editar: boolean = false;
  textoBoton: string = "Editar Registro";
  usuarioRol: UsuarioRol;
  usuario: Usuario = new Usuario();
  id: number;

  constructor(
    private roleService: RolService,
    private usuarioService: UsuarioService,
    private usuarioRolService: UsuarioRolService,
    private fb: FormBuilder, private toastr: ToastrService,
    private tipoDocumentoService: TipoDocumentoService,
    private ruta: ActivatedRoute,
    private router: Router
  ) { this.id = Number(this.ruta.snapshot.paramMap.get('id')) }

  ngOnInit(): void {
    this.listarRoles();
    this.initForm();
    this.listarTiposDocumento();

  }
  listarRoles() {
    this.roleService.getRol().subscribe(data => {
      this.lstRoles = data;
      this.listarPorId(this.id);
    })
  }

  listarPorId(id: number) {
    console.log(this.id);
    this.usuarioRolService.listarPorId(id).subscribe(data => {
      console.log(data);

      this.form.get('id').setValue(data.id);
      this.form.get('nombre').setValue(data.usuario.nombre);
      this.form.get('apellido').setValue(data.usuario.apellido);
      this.form.get('email').setValue(data.usuario.email);
      this.form.get('tipoDocumento').setValue(data.usuario.tipoDocumento.id);
      this.form.get('documento').setValue(data.usuario.documento);
      this.form.get('rol').setValue(data.rol.id);
    })
  }

  listarTiposDocumento() {
    this.tipoDocumentoService.getTipoDocumento().subscribe(data => {
      this.lstTiposDocumento = data;
    })
  }

  private initForm(): void {
    this.form = this.fb.group({
      id: new FormControl(''),
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      secondPassword: new FormControl('', Validators.required),
      documento: new FormControl('', Validators.required),
      rol: new FormControl(0, Validators.required),
      tipoDocumento: new FormControl(0, Validators.required)
    })
  }
  private mensajeError(err: any) {
    console.log(err);
    this.toastr.error('Ha Ocurrido un Problema');
  }
  clickEnviar() {
    let usuarioRol: UsuarioRol = new UsuarioRol();
    let usuario: Usuario = new Usuario();
    let rol: Rol = new Rol();
    let tipoDocumento: TipoDocumento = new TipoDocumento();
    let estado: Estado = new Estado();
    estado.id = 1;
    usuario.estado = estado
    usuario.id = this.form.get('id').value;
    usuario.nombre = this.form.get('nombre').value;
    usuario.apellido = this.form.get('apellido').value;
    usuario.email = this.form.get('email').value;
    usuario.password = this.form.get('password').value;
    usuario.documento = this.form.get('documento').value;
    tipoDocumento.id = this.form.get('tipoDocumento').value;
    usuario.tipoDocumento = tipoDocumento;
    rol.id = this.form.get('rol').value;
    usuarioRol.usuario = usuario;
    usuarioRol.rol = rol;
    console.log(usuarioRol)
    if (usuario.password != this.form.get('secondPassword').value) {
      Swal.fire({
        title: 'Las contraseñas son distintas',
        icon: 'warning',
      })
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
          this.modificar(usuarioRol);
        }
      })
    }
  }

  modificar(usuarioRol: UsuarioRol): void {
    this.usuarioService.modificar(usuarioRol).subscribe(data => {
      this.toastr.success(this.mensajeSatisfactorio);
      this.form.reset();
      this.router.navigateByUrl('listado-usuario');
    }, err => this.mensajeError(err));
  }
}
