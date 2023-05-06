import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrarClienteRoutingModule } from './registrar-cliente-routing.module';
import { RegistrarClienteComponent } from './registrar-cliente.component';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RegistrarClienteComponent
  ],
  imports: [
    CommonModule,
    RegistrarClienteRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RegistrarClienteModule { }
