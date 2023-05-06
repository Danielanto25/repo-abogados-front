import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaProcesoComponent } from './consulta-proceso.component';

const routes: Routes = [{ path: '', component: ConsultaProcesoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultaProcesoRoutingModule { }
