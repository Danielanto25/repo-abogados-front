import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarUsuariosComponent } from './registrar-usuarios.component';

const routes: Routes = [{ path: '', component: RegistrarUsuariosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrarUsuariosRoutingModule { }
