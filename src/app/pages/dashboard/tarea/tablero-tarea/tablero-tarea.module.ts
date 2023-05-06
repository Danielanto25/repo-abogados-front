import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableroTareaRoutingModule } from './tablero-tarea-routing.module';
import { TableroTareaComponent } from './tablero-tarea.component';


@NgModule({
  declarations: [
    TableroTareaComponent
  ],
  imports: [
    CommonModule,
    TableroTareaRoutingModule
  ]
})
export class TableroTareaModule { }
