import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LogicaGuardService } from 'src/app/guard/logica-guard.service';
import { Usuario } from 'src/app/models/usuario';
import { NavService } from 'src/app/services/nav.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { role } from 'src/app/shared/role';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  //validacion roles
  admin2: boolean = this.logicaGuard.permisoValido([role.administrador]);
  rolUsuario: boolean = this.logicaGuard.permisoValido([role.usuario]);
  superAdmin: boolean = this.logicaGuard.permisoValido([role.superAdmin]);
  cliente: boolean = this.logicaGuard.permisoValido([role.cliente]);




  admin: boolean;
  sesion: boolean = true;
  usuario: Usuario = new Usuario();
  rol: String = "";

  constructor(
    private navService: NavService,
    private logicaGuard: LogicaGuardService,
    private router: Router,
    private toastr: ToastrService,
    private usuService: UsuarioService
  ) { }

  ngOnInit(): void {
    //('admin ', this.admin2);
    //console.log('usuario ', this.rolUsuario);
    //console.log('superadmin ', this.superAdmin);
    //console.log('cliente ', this.cliente);
    this.rol = localStorage.getItem('role');

    this.navService.navLogin.subscribe((data: boolean) => {
      this.admin2 = this.logicaGuard.permisoValido([role.administrador]);
      this.rolUsuario = this.logicaGuard.permisoValido([role.usuario]);
      this.superAdmin = this.logicaGuard.permisoValido([role.superAdmin]);
      this.cliente = this.logicaGuard.permisoValido([role.cliente]);
      this.rol = localStorage.getItem('role');

      this.usuService.info().subscribe((data: Usuario) => {
        this.usuario = data;
      })
      this.sesion = data;
    });
    if (sessionStorage.getItem(environment.tokenName)) {
      this.sesion = false;
    }

    this.usuService.info().subscribe((data: Usuario) => {
      this.usuario = data;
    })

  }

  openForm() {
    document.getElementById("myForm").style.display = "block";
  }

  closeS() {
    this.toastr.success('Sesion Cerrada');
    this.sesion = !this.sesion;
    this.admin = false;
    this.admin2 = false;
    this.rolUsuario = false;
    this.cliente = false;
    this.superAdmin = false;
    this.rol = "";
    this.router.navigateByUrl('/');
    sessionStorage.clear();
    localStorage.clear();
  }

}


