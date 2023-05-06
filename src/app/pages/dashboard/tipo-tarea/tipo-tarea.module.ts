import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoTareaRoutingModule } from './tipo-tarea-routing.module';
import { TipoTareaComponent } from './tipo-tarea.component';

import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';





@NgModule({
  declarations: [
    TipoTareaComponent
  ],
  imports: [
    CommonModule,
    TipoTareaRoutingModule,
    NgbPaginationModule,
    NgbAlertModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TipoTareaModule { }
