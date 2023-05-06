import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrarTareaRoutingModule } from './registrar-tarea-routing.module';
import { RegistrarTareaComponent } from './registrar-tarea.component';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@NgModule({
  declarations: [
    RegistrarTareaComponent
  ],
  imports: [
    CommonModule,
    RegistrarTareaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AutocompleteLibModule
  ]
})
export class RegistrarTareaModule { }
