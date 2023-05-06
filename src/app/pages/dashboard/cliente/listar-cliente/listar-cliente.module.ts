import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListarClienteRoutingModule } from './listar-cliente-routing.module';
import { ListarClienteComponent } from './listar-cliente.component';

import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListarClienteComponent
  ],
  imports: [
    CommonModule,
    ListarClienteRoutingModule, 
    NgbPaginationModule,
    NgbAlertModule,
    FormsModule
  ]
})
export class ListarClienteModule { }
