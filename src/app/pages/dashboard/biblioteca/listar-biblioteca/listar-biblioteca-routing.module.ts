import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarBibliotecaComponent } from './listar-biblioteca.component';

const routes: Routes = [{ path: '', component: ListarBibliotecaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListarBibliotecaRoutingModule { }
