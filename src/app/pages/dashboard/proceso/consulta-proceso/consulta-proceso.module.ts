import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultaProcesoRoutingModule } from './consulta-proceso-routing.module';
import { ConsultaProcesoComponent } from './consulta-proceso.component';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';



@NgModule({
  declarations: [
    ConsultaProcesoComponent
  ],
  imports: [
    CommonModule,
    ConsultaProcesoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AutocompleteLibModule
  ]
})
export class ConsultaProcesoModule { }
