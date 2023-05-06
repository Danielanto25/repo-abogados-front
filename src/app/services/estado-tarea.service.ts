import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Estado } from "../models/estado";
import { EstadoTarea } from "../models/estadoTarea";


@Injectable({
    providedIn: 'root'
})
export class EstadoTareaService {

    private URL: string = `${environment.apiUrl}/estado-tarea`;

    constructor(private http: HttpClient) { }

    getEstado(): Observable<EstadoTarea[]> {
        return this.http.get<EstadoTarea[]>(this.URL);
    }
}
