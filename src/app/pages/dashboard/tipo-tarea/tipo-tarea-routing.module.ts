import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TipoTareaComponent } from './tipo-tarea.component';

const routes: Routes = [{ path: '', component: TipoTareaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoTareaRoutingModule { }
