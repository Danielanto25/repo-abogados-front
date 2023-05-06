import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { TipoContrato } from "../models/tipo-contrato";


@Injectable({
    providedIn: 'root'
})
export class TipoContratoService {

    private URL: string = `${environment.apiUrl}/tipo-contrato`;

    constructor(private http: HttpClient) { }

    getTipoContrato(): Observable<TipoContrato[]> {
        return this.http.get<TipoContrato[]>(this.URL);
    }
}
