import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditarProcesoRoutingModule } from './editar-proceso-routing.module';
import { EditarProcesoComponent } from './editar-proceso.component';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EditarProcesoComponent
  ],
  imports: [
    CommonModule,
    EditarProcesoRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EditarProcesoModule { }
