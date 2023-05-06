import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListadoUsuariosRoutingModule } from './listado-usuarios-routing.module';
import { ListadoUsuariosComponent } from './listado-usuarios.component';

import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListadoUsuariosComponent
  ],
  imports: [
    CommonModule,
    ListadoUsuariosRoutingModule,
    NgbPaginationModule, 
    NgbAlertModule,
    FormsModule
  ]
})
export class ListadoUsuariosModule { }
