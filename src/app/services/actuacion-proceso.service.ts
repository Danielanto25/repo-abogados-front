import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ActuacionProceso } from "../models/actuacion-proceso";


@Injectable({
    providedIn: 'root'
})
export class ActuacionProcesoService {

    private URL: string = `${environment.apiUrl}/actuacion-proceso`;

    constructor(private http: HttpClient) { }

    getActuacionProceso(): Observable<ActuacionProceso[]> {
        return this.http.get<ActuacionProceso[]>(this.URL);
    }
    listarPorIdProceso(id: number): Observable<ActuacionProceso[]> {
        return this.http.get<ActuacionProceso[]>(`${this.URL}/actuaciones/${id}`);
    }
    listarPorNumeroProceso(numeroProceso: string): Observable<ActuacionProceso[]> {
      return this.http.get<ActuacionProceso[]>(`${this.URL}/numeroProceso/${numeroProceso}`);
  }
    crear(json: ActuacionProceso, archivoLlegada: File): Observable<void> {
        let formData: FormData = new FormData();
        formData.set('json', JSON.stringify(json));
        formData.set('archivoLlegada', archivoLlegada);
        return this.http.post<void>(`${this.URL}`, formData);
    }

    crearSinFechas(json: ActuacionProceso, archivoLlegada: File): Observable<void> {
      let formData: FormData = new FormData();
      formData.set('json', JSON.stringify(json));
      formData.set('archivoLlegada', archivoLlegada);
      return this.http.post<void>(`${this.URL}/insert`, formData);
  }

    eliminar(id: number): Observable<void> {
        return this.http.delete<void>(`${this.URL}/${id}`);
    }
    modificar(json: ActuacionProceso, archivoLlegada: File): Observable<void> {
        let formData: FormData = new FormData();
        formData.set('json', JSON.stringify(json));
        formData.set('archivoLlegada', archivoLlegada);
        return this.http.put<void>(this.URL, formData);
    }

    modificarSinArchivo(json: ActuacionProceso): Observable<void> {
        let formData: FormData = new FormData();
        formData.set('json', JSON.stringify(json));
        return this.http.put<void>(`${this.URL}/null`, formData);
    }
    listarPorId(id: number): Observable<ActuacionProceso> {
        return this.http.get<ActuacionProceso>(`${this.URL}/${id}`)
    }
    getPDF(id: number) {
      return this.http.get<Blob>(`${this.URL}/archivo/${id}`, { responseType: 'blob' as 'json' })

    }
}
