import { Injectable } from '@angular/core';
import { LogicaGuardService } from './logica-guard.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { role } from '../shared/role';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService {

  constructor(
    private logicaGuard:LogicaGuardService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {

    return this.logicaGuard.permisosValidos([role.administrador]);
  }
}
