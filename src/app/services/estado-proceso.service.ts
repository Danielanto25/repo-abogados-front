import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Estado } from "../models/estado";
import { EstadoProceso } from "../models/estadoProceso";


@Injectable({
    providedIn: 'root'
})
export class EstadoProcesoService {

    private URL: string = `${environment.apiUrl}/estado-proceso`;

    constructor(private http: HttpClient) { }

    getEstado(): Observable<EstadoProceso[]> {
        return this.http.get<EstadoProceso[]>(this.URL);
    }
}