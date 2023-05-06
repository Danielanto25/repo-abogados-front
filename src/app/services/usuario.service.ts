import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Usuario } from "../models/usuario";
import { UsuarioRol } from "../models/usuario-rol";


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private URL: string = `${environment.apiUrl}/usuario`;

  constructor(private http: HttpClient) { }

  getUsuario(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.URL);
  }

  crear(usuarioRol: UsuarioRol): Observable<void> {
    return this.http.post<void>(`${this.URL}`, usuarioRol);
  }

  crearUsuarioCliente(usuarioRol: UsuarioRol): Observable<void> {
    return this.http.post<void>(`${this.URL}/UsuarioCliente`, usuarioRol);
  }

  modificar(usuarioRol: UsuarioRol): Observable<UsuarioRol[]> {
    return this.http.put<UsuarioRol[]>(this.URL, usuarioRol);
  }
  listarId(id: number): Observable<UsuarioRol> {
    return this.http.get<UsuarioRol>(`${this.URL}/${id}`);
  }

  info(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.URL}/info`);
  }
}
