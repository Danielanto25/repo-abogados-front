import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReporteProcesoComponent } from './reporte-proceso.component';

const routes: Routes = [{ path: '', component: ReporteProcesoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReporteProcesoRoutingModule { }
