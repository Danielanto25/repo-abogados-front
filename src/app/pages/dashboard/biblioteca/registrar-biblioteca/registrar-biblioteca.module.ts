import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrarBibliotecaRoutingModule } from './registrar-biblioteca-routing.module';
import { RegistrarBibliotecaComponent } from './registrar-biblioteca.component';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RegistrarBibliotecaComponent
  ],
  imports: [
    CommonModule,
    RegistrarBibliotecaRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RegistrarBibliotecaModule { }
