import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { EditarUsuariosRoutingModule } from './editar-usuarios-routing.module';
import { EditarUsuariosComponent } from './editar-usuarios.component';


@NgModule({
    declarations: [
        EditarUsuariosComponent
    ],
    imports: [
        CommonModule,
        EditarUsuariosRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class EditarUsuariosModule { }