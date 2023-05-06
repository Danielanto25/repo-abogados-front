import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableroTareaComponent } from './tablero-tarea.component';

const routes: Routes = [{ path: '', component: TableroTareaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableroTareaRoutingModule { }
