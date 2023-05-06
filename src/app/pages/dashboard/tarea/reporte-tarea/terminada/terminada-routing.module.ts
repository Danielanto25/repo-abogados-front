import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TerminadaComponent } from './terminada.component';

const routes: Routes = [{ path: '', component: TerminadaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TerminadaRoutingModule { }
