import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TerminadaRoutingModule } from './terminada-routing.module';
import { TerminadaComponent } from './terminada.component';

import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TerminadaComponent
  ],
  imports: [
    CommonModule,
    TerminadaRoutingModule,
    NgbPaginationModule,
    NgbAlertModule,
    FormsModule
  ]
})
export class TerminadaModule { }
