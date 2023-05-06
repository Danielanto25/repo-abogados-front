import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoProcesoRoutingModule } from './tipo-proceso-routing.module';
import { TipoProcesoComponent } from './tipo-proceso.component';

import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TipoProcesoComponent
  ],
  imports: [
    CommonModule,
    TipoProcesoRoutingModule,
    NgbPaginationModule,
    NgbAlertModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TipoProcesoModule { }
