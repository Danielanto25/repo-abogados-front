import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListarBibliotecaRoutingModule } from './listar-biblioteca-routing.module';
import { ListarBibliotecaComponent } from './listar-biblioteca.component';

import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListarBibliotecaComponent
  ],
  imports: [
    CommonModule,
    ListarBibliotecaRoutingModule,
    NgbPaginationModule, 
    NgbAlertModule,
    FormsModule
  ]
})
export class ListarBibliotecaModule { }
