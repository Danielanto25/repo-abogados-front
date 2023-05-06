import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { TipoDocumento } from "../models/tipo-documento";


@Injectable({
    providedIn: 'root'
})
export class TipoDocumentoService {

    private URL: string = `${environment.apiUrl}/tipo-documento`;

    constructor(private http: HttpClient) { }

    getTipoDocumento(): Observable<TipoDocumento[]> {
        return this.http.get<TipoDocumento[]>(this.URL);
    }
}
