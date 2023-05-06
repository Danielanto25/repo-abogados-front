import { Injectable } from '@angular/core';
import{Router} from '@angular/router';
import {environment} from '../../environments/environment';
import{JwtHelperService}from '@auth0/angular-jwt';
import{role} from '../shared/role';

@Injectable({
  providedIn: 'root'
})
export class LogicaGuardService {

  constructor(
    private _router: Router,
  ) { }

  permisosValidos(role: string[]): boolean {

    let token: string = sessionStorage.getItem(environment.tokenName);

    if (token) {

      return this.validarToken(token, role);

    }

    return this.enviarAlLogin();
  }

  permisoValido(role: string[]): boolean {

    let token: string = sessionStorage.getItem(environment.tokenName);

    if (token) {

      return this.validar(token, role);

    }

    return this.enviarAlLogin();
  }

  private validar(token: string, role: string[]): boolean {

    if (this.isTokenExpired(token)) {
      return this.enviarAlLogin();
    }

    return this.analizarRol(role);
  }


  private validarToken(token: string, role: string[]): boolean {

    if (this.isTokenExpired(token)) {
      return this.enviarAlLogin();
    }

    return this.analizarRoles(role);
  }

  private enviarAlLogin(): boolean {
    sessionStorage.clear();
    localStorage.clear();
    this._router.navigate(['/']);
    return false;
  }

  private analizarRol(rolePermitidos: string[]) {

    const helper = new JwtHelperService();

    const decodedToken = helper.decodeToken(sessionStorage.getItem(environment.tokenName));

    let lstRole: string[] = decodedToken.authorities;

    for(let i = 0; i < lstRole.length; i++) {

      let tokenRole: string = lstRole[i];

      for(let j = 0; j < rolePermitidos.length; j++) {

        let authRole: string = rolePermitidos[j];
        //console.log(tokenRole)
        if(tokenRole == authRole || authRole == role.authenticated) {
          localStorage.setItem('role',tokenRole);
          return true;
        }
      }
    }
    return false;
  }

  private analizarRoles(rolePermitidos: string[]) {

    const helper = new JwtHelperService();

    const decodedToken = helper.decodeToken(sessionStorage.getItem(environment.tokenName));

    let lstRole: string[] = decodedToken.authorities;


    for(let i = 0; i < lstRole.length; i++) {

      let tokenRole: string = lstRole[i];

      for(let j = 0; j < rolePermitidos.length; j++) {

        let authRole: string = rolePermitidos[j];
        //console.log(tokenRole,authRole)
        if(tokenRole == authRole || authRole == role.authenticated) {
          localStorage.setItem('role',tokenRole);
          return true;
        }
      }
    }

    this._router.navigate(['/sin-permiso']);
    return false;
  }

  private isTokenExpired(token: string):boolean {

    let jwtHelper = new JwtHelperService();

    let fechaExpiracion: Date = jwtHelper.getTokenExpirationDate(token);
    let fechaActual: Date = new Date();

    if (fechaActual.getTime() <= fechaExpiracion.getTime()) {
      return false;
    }

    return true;
  }

  //Validación del nav
  permisosValidosNav(role: string[]): boolean {

    let token: string = sessionStorage.getItem(environment.tokenName);

    if (token) {

      return this.validarTokenNav(token, role);

    }

  }

  private enviarAlLoginNav(): boolean {
    sessionStorage.clear();
    localStorage.clear();
    return false;
  }

  private analizarRolesNav(rolePermitidos: string[]) {

    const helper = new JwtHelperService();

    const decodedToken = helper.decodeToken(sessionStorage.getItem(environment.tokenName));

    let lstRole: string[] = decodedToken.authorities;

    for(let i = 0; i < lstRole.length; i++) {

      let tokenRole: string = lstRole[i];

      for(let j = 0; j < rolePermitidos.length; j++) {

        let authRole: string = rolePermitidos[j];

        if(tokenRole == authRole || authRole == role.authenticated) {
          localStorage.setItem('role',tokenRole);
          return true;
        }
      }
    }
    return false;
  }
  private validarTokenNav(token: string, role: string[]): boolean {

    if (this.isTokenExpired(token)) {
      return this.enviarAlLoginNav();
    }

    return this.analizarRolesNav(role);
  }
}

