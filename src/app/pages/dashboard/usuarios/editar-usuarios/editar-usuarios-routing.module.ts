import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarUsuariosComponent } from './editar-usuarios.component';


const routes: Routes = [{ path: '', component: EditarUsuariosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditarUsuariosRoutingModule { }
