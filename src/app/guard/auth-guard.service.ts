import { Injectable } from '@angular/core';

import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { LogicaGuardService } from './logica-guard.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private logicaGuard:LogicaGuardService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
    
    return this.logicaGuard.permisosValidos(route.data['role']);

  }
}
