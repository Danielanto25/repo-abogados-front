import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrarUsuariosRoutingModule } from './registrar-usuarios-routing.module';
import { RegistrarUsuariosComponent } from './registrar-usuarios.component';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RegistrarUsuariosComponent
  ],
  imports: [
    CommonModule,
    RegistrarUsuariosRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RegistrarUsuariosModule { }
