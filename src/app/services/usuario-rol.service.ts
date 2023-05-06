import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { UsuarioRol } from "../models/usuario-rol";


@Injectable({
    providedIn: 'root'
})
export class UsuarioRolService {

    private URL: string = `${environment.apiUrl}/usuario-rol`;

    constructor(private http: HttpClient) { }

    getUsuarioRol(): Observable<UsuarioRol[]> {
        return this.http.get<UsuarioRol[]>(this.URL);
    }
    eliminar(id: number): Observable<void> {
        return this.http.delete<void>(`${this.URL}/${id}`);
    }
    listarPorId(id: number): Observable<UsuarioRol> {
        return this.http.get<UsuarioRol>(`${this.URL}/${id}`)
    }
    modificar(usuarioRol: UsuarioRol): Observable<UsuarioRol> {
        return this.http.put<UsuarioRol>(this.URL, usuarioRol);
    }

}
