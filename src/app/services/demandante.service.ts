import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Demandante } from '../models/demandante';

@Injectable({
  providedIn: 'root'
})
export class DemandanteService {
  private URL: string = `${environment.apiUrl}/demandante`;

  constructor(private http: HttpClient) { }

  getDemandante(): Observable<Demandante[]> {
    return this.http.get<Demandante[]>(this.URL);
  }

  crear(demandante: Demandante): Observable<void> {
    return this.http.post<void>(`${this.URL}`, demandante);
  }

  modificar(demandante: Demandante): Observable<Demandante[]> {
    return this.http.put<Demandante[]>(this.URL, demandante);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${id}`);
  }

  listarPorId(id: number): Observable<Demandante> {
    return this.http.get<Demandante>(`${this.URL}/${id}`)
  }

  listarProcesoDemandante(id: number): Observable<Demandante[]> {
    return this.http.get<Demandante[]>(`${this.URL}/listarProceso/${id}`)
  }
}
