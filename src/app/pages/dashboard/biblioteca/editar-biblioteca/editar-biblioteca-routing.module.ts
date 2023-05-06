import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarBibliotecaComponent } from './editar-biblioteca.component';

const routes: Routes = [{ path: '', component: EditarBibliotecaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditarBibliotecaRoutingModule { }
