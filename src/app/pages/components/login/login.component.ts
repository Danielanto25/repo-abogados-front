import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { role } from 'src/app/shared/role';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { NavService } from 'src/app/services/nav.service';
import { LogicaGuardService } from 'src/app/guard/logica-guard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  show: boolean;
  form: FormGroup;
  admin: boolean = false;
  sesion: boolean = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private logicaGuardNav: LogicaGuardService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private navService: NavService,

  ) { this.show = false; }

  ngOnInit(): void {
    this.initForm();

  }

  closeForm() {
    document.getElementById("myForm").style.display = "none";
  }

  private initForm(): void {
    this.form = this.fb.group({
      usuario: new FormControl('', Validators.required),
      clave: new FormControl('', Validators.required),
    })
  }

  onLoginClick(): void {
    this.loginService.login(this.form.get('usuario').value, this.form.get('clave').value).subscribe(res => {
      sessionStorage.setItem(environment.tokenName, res.access_token);
      // redireccionar a pagina de inciio
      localStorage.setItem('usuario', this.form.get('usuario').value);

      this.closeForm();
      this.pagina();
    }, err => {
      if (err.status == 500) {
        // error en el servidor
        this.mensajeError("Error en el servidor");
      } else {
        // credenciales incorrectas
        this.mensajeError("Credenciales incorrectas");
      }
    });
  }

  pagina(): void {
    if (this.logicaGuardNav.permisoValido([role.cliente])) {
      console.log('true');
      this.router.navigateByUrl('listado-proceso-cliente');
    } else {
      this.router.navigateByUrl('tablero-tarea');
    }
    this.navService.navLogin.emit(this.sesion);
  }
  password() {
    this.show = !this.show;
  }
  move(ruta): void {
    this.router.navigateByUrl(ruta);
  }

  private mensajeError(err: any) {
    this.spinner.hide();
    console.log(err);
    this.toastr.error(err);
  }
  /*canActivate(): void {
    this.admin = this.logicaGuard.permisosValidosNav([role.administrador]);
  }*/
}
