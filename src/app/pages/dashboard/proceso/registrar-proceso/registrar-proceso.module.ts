import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrarProcesoRoutingModule } from './registrar-proceso-routing.module';
import { RegistrarProcesoComponent } from './registrar-proceso.component';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RegistrarProcesoComponent
  ],
  imports: [
    CommonModule,
    RegistrarProcesoRoutingModule,
    FormsModule,
    ReactiveFormsModule
    
  ]
})
export class RegistrarProcesoModule { }
