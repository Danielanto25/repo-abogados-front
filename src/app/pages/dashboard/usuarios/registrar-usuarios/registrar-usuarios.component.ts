import { Component, OnInit } from '@angular/core';
import { Rol } from 'src/app/models/rol';
import { RolService } from 'src/app/services/rol.service'
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario';
import { TipoDocumento } from 'src/app/models/tipo-documento';
import { TipoDocumentoService } from 'src/app/services/tipo-documento.service';
import { UsuarioRol } from 'src/app/models/usuario-rol';
import { Estado } from 'src/app/models/estado';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-usuarios',
  templateUrl: './registrar-usuarios.component.html',
  styleUrls: ['./registrar-usuarios.component.css']
})
export class RegistrarUsuariosComponent implements OnInit {

  lstRoles: Rol[];
  lstTiposDocumento: TipoDocumento[];
  form: FormGroup;
  mensajeSatisfactorio: string = 'Satisfactorio';
  editar: boolean = false;
  textoBoton: string = "Guardar Registro";

  constructor(
    private roleService: RolService,
    private usuarioService: UsuarioService,
    private fb: FormBuilder, private toastr: ToastrService,
    private tipoDocumentoService: TipoDocumentoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.listarRoles();
    this.initForm();
    this.listarTiposDocumento()
  }

  listarRoles() {
    this.roleService.getRol().subscribe(data => {
      this.lstRoles = data;
      console.log(data)
    })
  }


  listarTiposDocumento() {
    this.tipoDocumentoService.getTipoDocumento().subscribe(data => {
      this.lstTiposDocumento = data;
      console.log(data)
    })
  }

  private initForm(): void {
    this.form = this.fb.group({
      id: new FormControl(''),
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      email: new FormControl(''),
      password: new FormControl('', Validators.required),
      secondPassword: new FormControl('', Validators.required),
      documento: new FormControl('', Validators.required),
      rol: new FormControl(0, Validators.required),
      tipoDocumento: new FormControl(0, Validators.required)
    })
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
    if (usuario.password != this.form.get('secondPassword').value) {
      Swal.fire({
        title: 'Las contraseñas son distintas',
        icon: 'warning',
      })
    } else {
      if (!this.editar) {
        this.registrar(usuarioRol);

      }
    }

  }
  registrar(usuarioRol: UsuarioRol): void {
    this.usuarioService.crear(usuarioRol).subscribe(data => {
      this.toastr.success(this.mensajeSatisfactorio);
      this.form.reset();
      this.router.navigateByUrl('listado-usuario');
    }, err => this.mensajeError(err));
  }

  private mensajeError(err: any) {
    console.log(err);
    this.toastr.error('Ha Ocurrido un Problema');
  }

}
