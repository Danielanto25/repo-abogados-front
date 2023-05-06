import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarBibliotecaComponent } from './registrar-biblioteca.component';

const routes: Routes = [{ path: '', component: RegistrarBibliotecaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrarBibliotecaRoutingModule { }
