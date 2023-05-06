import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Demandado } from '../models/demandado';

@Injectable({
  providedIn: 'root'
})
export class DemandadoService {
  private URL: string = `${environment.apiUrl}/demandado`;

  constructor(private http: HttpClient) { }

  getDemandado(): Observable<Demandado[]> {
    return this.http.get<Demandado[]>(this.URL);
  }


  crear(demandado: Demandado): Observable<void> {
    return this.http.post<void>(`${this.URL}`, demandado);
  }

  modificar(demandado: Demandado): Observable<Demandado[]> {
    return this.http.put<Demandado[]>(this.URL, demandado);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${id}`);
  }

  listarPorId(id: number): Observable<Demandado> {
    return this.http.get<Demandado>(`${this.URL}/${id}`)
  }

  listarProcesoDemandado(id: number): Observable<Demandado[]> {
    return this.http.get<Demandado[]>(`${this.URL}/listarProceso/${id}`)
  }
}
