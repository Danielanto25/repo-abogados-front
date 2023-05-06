import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LogicaGuardService } from 'src/app/guard/logica-guard.service';
import { Cliente } from 'src/app/models/cliente';
import { TipoContrato } from 'src/app/models/tipo-contrato';
import { TipoDocumento } from 'src/app/models/tipo-documento';
import { ClientesService } from 'src/app/services/clientes.service';
import { role } from 'src/app/shared/role';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrls: ['./listar-cliente.component.css']
})
export class ListarClienteComponent implements OnInit {

  superAdmin: boolean = this.logicaGuard.permisoValido([role.superAdmin]);
  page = 1;
  pageSize = 10;
  mensajeSatisfactorio: string = 'Satisfactorio';
  clientes: Cliente[] = [];
  CLIENTES: Cliente[] = [];
  editar: boolean = false;
  form: FormGroup;
  textoBoton: string = "Editar Registro";
  collectionSize = this.clientes.length;

  constructor(private clientesService: ClientesService, private fb: FormBuilder, private toastr: ToastrService,private logicaGuard: LogicaGuardService) {
    this.refreshClients();
  }

  ngOnInit(): void {
    this.listar();
  }

  refreshClients() {
    this.clientes = this.CLIENTES
      .map((cliente, i) => ({ id: i + 1, ...cliente }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  listar() {
    this.clientesService.getCliente().subscribe(data => {
      this.clientes = data;
      this.CLIENTES = data;
      this.collectionSize = this.clientes.length;
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
        this.clientesService.eliminar(id).subscribe(data => {
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
    this.clientesService.getPDF(id).subscribe((response) => {
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
    if(filtro == ""){
      this.listar();
    }else{
      this.clientesService.listarPorCliente(filtro).subscribe(data=>{
        this.clientes = data
        this.CLIENTES = data
        this.collectionSize = this.clientes.length;
      });
    }
  }
}
