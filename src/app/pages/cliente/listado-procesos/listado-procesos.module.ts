import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListadoProcesosRoutingModule } from './listado-procesos-routing.module';
import { ListadoProcesosComponent } from './listado-procesos.component';

import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListadoProcesosComponent
  ],
  imports: [
    CommonModule,
    ListadoProcesosRoutingModule,
    FormsModule,
    NgbPaginationModule,
    NgbAlertModule
  ]
})
export class ListadoProcesosModule { }
