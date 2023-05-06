import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MostrarProcesoRoutingModule } from './mostrar-proceso-routing.module';
import { MostrarProcesoComponent } from './mostrar-proceso.component';

import { ReactiveFormsModule } from '@angular/forms';

import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MostrarProcesoComponent
  ],
  imports: [
    CommonModule,
    MostrarProcesoRoutingModule,
    NgbPaginationModule,
    NgbAlertModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MostrarProcesoModule { }
