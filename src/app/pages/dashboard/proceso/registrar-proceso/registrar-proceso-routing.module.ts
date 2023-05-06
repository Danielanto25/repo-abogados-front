import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarProcesoComponent } from './registrar-proceso.component';

const routes: Routes = [{ path: '', component: RegistrarProcesoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrarProcesoRoutingModule { }
