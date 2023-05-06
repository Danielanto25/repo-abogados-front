import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Rol } from "../models/rol";


@Injectable({
    providedIn: 'root'
})
export class RolService {

    private URL: string = `${environment.apiUrl}/rol`;

    constructor(private http: HttpClient) { }

    getRol(): Observable<Rol[]> {
        return this.http.get<Rol[]>(this.URL);
    }
}