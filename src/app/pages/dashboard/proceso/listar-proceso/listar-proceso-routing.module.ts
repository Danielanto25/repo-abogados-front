import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarProcesoComponent } from './listar-proceso.component';

const routes: Routes = [{ path: '', component: ListarProcesoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListarProcesoRoutingModule { }
