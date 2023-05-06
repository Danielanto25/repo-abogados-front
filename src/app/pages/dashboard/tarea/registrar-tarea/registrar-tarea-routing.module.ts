import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarTareaComponent } from './registrar-tarea.component';

const routes: Routes = [{ path: '', component: RegistrarTareaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrarTareaRoutingModule { }
