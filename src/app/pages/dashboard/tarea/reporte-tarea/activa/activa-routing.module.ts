import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivaComponent } from './activa.component';

const routes: Routes = [{ path: '', component: ActivaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivaRoutingModule { }
