import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TipoProcesoComponent } from './tipo-proceso.component';

const routes: Routes = [{ path: '', component: TipoProcesoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoProcesoRoutingModule { }
