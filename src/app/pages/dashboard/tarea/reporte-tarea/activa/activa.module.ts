import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivaRoutingModule } from './activa-routing.module';
import { ActivaComponent } from './activa.component';

import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ActivaComponent
  ],
  imports: [
    CommonModule,
    ActivaRoutingModule,
    NgbPaginationModule,
    NgbAlertModule,
    FormsModule
  ]
})
export class ActivaModule { }
