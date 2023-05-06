import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditarBibliotecaRoutingModule } from './editar-biblioteca-routing.module';
import { EditarBibliotecaComponent } from './editar-biblioteca.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EditarBibliotecaComponent
  ],
  imports: [
    CommonModule,
    EditarBibliotecaRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EditarBibliotecaModule { }
