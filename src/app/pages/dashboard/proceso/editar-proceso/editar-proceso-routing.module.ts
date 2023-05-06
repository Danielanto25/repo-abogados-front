import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarProcesoComponent } from './editar-proceso.component';

const routes: Routes = [{ path: '', component: EditarProcesoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditarProcesoRoutingModule { }
