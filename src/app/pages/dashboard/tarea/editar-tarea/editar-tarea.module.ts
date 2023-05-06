import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditarTareaRoutingModule } from './editar-tarea-routing.module';
import { EditarTareaComponent } from './editar-tarea.component';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EditarTareaComponent
  ],
  imports: [
    CommonModule,
    EditarTareaRoutingModule,
    FormsModule,
    ReactiveFormsModule
    
  ]
})
export class EditarTareaModule { }
