import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditarClienteRoutingModule } from './editar-cliente-routing.module';
import { EditarClienteComponent } from './editar-cliente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EditarClienteComponent
  ],
  imports: [
    CommonModule,
    EditarClienteRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EditarClienteModule { }

