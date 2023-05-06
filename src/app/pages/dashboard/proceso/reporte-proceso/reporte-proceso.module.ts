import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReporteProcesoRoutingModule } from './reporte-proceso-routing.module';
import { ReporteProcesoComponent } from './reporte-proceso.component';

import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ReporteProcesoComponent
  ],
  imports: [
    CommonModule,
    ReporteProcesoRoutingModule,
    NgbPaginationModule,
    NgbAlertModule,
    FormsModule
  ]
})
export class ListarProcesoModule { }
