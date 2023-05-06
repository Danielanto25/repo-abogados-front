import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LogicaGuardService } from 'src/app/guard/logica-guard.service';
import { BibliotecaDocumento } from 'src/app/models/bibliotecaDocumento';
import { Cliente } from 'src/app/models/cliente';
import { BibliotecaService } from 'src/app/services/biblioteca.service';
import { role } from 'src/app/shared/role';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-listar-biblioteca',
  templateUrl: './listar-biblioteca.component.html',
  styleUrls: ['./listar-biblioteca.component.css']
})
export class ListarBibliotecaComponent implements OnInit {

  superAdmin: boolean = this.logicaGuard.permisoValido([role.superAdmin]);
  id: number;
  mensajeSatisfactorio: string = 'Satisfactorio';
  form: FormGroup;
  editar: boolean = false;
  textoBoton: string = "Editar Registro";
  page = 1;
  pageSize = 10;
  bibliotecaDocumentos: BibliotecaDocumento[] = [];
  BIBLIOTECADOCUMENTOS: BibliotecaDocumento[] = [];
  collectionSize = this.bibliotecaDocumentos.length;

  constructor(
    private bibliotecaService: BibliotecaService,
    private fb: FormBuilder,
    private logicaGuard: LogicaGuardService,
    private toastr: ToastrService
  ) {
    this.refreshDocuments();
  }

  ngOnInit(): void {
    this.listar();
  }

  refreshDocuments() {
    this.bibliotecaDocumentos = this.BIBLIOTECADOCUMENTOS
      .map((bibliotecaDocumento, i) => ({ id: i + 1, ...bibliotecaDocumento }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  listar() {
    this.bibliotecaService.getBibliotecaDocumento().subscribe(data => {
      this.bibliotecaDocumentos = data;
      this.BIBLIOTECADOCUMENTOS = data;
      this.collectionSize = this.bibliotecaDocumentos.length;
    })
  }

  eliminar(id: number) {
    Swal.fire({
      title: 'Estás seguro?',
      text: "No Podras Revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.bibliotecaService.eliminar(id).subscribe(data => {
          this.toastr.success(this.mensajeSatisfactorio);
          this.listar();

        }, err => this.mensajeError(err));
      }
    })
  }

  private mensajeError(err: any) {
    console.log(err);
    this.toastr.error('Ha Ocurrido un Problema');
  }

  clickEvent(id: number, nombre: string) {
    const nombreSeparado: string[] = nombre.toLowerCase().split('.');
    this.bibliotecaService.getPDF(id).subscribe((response) => {
      if (nombreSeparado[nombreSeparado.length - 1] === 'pdf') {
        let file = new Blob([response], { type: 'application/pdf' });
        console.log(file);

        var fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      } else {
        let file = new Blob([response], { type: 'octet/stream' });

        var fileURL = URL.createObjectURL(file);
        var archivo = document.createElement("a");
        archivo.download = nombre;
        archivo.href = fileURL;
        archivo.click();
      }
    })
  }


  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    if (filtro == "") {
      this.listar();
    } else {
      this.bibliotecaService.listarPorCliente(filtro).subscribe(data => {
        this.bibliotecaDocumentos = data
        this.BIBLIOTECADOCUMENTOS = data
        this.collectionSize = this.bibliotecaDocumentos.length
      });
    }
  }

}





