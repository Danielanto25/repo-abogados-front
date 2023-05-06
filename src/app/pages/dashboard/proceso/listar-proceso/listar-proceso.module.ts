import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListarProcesoRoutingModule } from './listar-proceso-routing.module';
import { ListarProcesoComponent } from './listar-proceso.component';

import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListarProcesoComponent
  ],
  imports: [
    CommonModule,
    ListarProcesoRoutingModule,
    NgbPaginationModule,
    NgbAlertModule,
    FormsModule
  ]
})
export class ListarProcesoModule { }
