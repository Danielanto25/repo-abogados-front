import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MostrarProcesoComponent } from './mostrar-proceso.component';

const routes: Routes = [{ path: '', component: MostrarProcesoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MostrarProcesoRoutingModule { }
