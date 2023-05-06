import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Estado } from "../models/estado";


@Injectable({
    providedIn: 'root'
})
export class EstadoService {

    private URL: string = `${environment.apiUrl}/estado`;

    constructor(private http:HttpClient){}

    getEstado(): Observable<Estado[]>{
        return this.http.get<Estado[]>(this.URL);
    }
}