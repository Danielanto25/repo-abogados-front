import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TipoProceso } from '../models/tipo-proceso';


@Injectable({
  providedIn: 'root'
})
export class TipoProcesoService {

  private URL: string = `${environment.apiUrl}/tipo-proceso`;


  constructor(private http: HttpClient) { }

  getTipoProceso(): Observable<TipoProceso[]> {
    return this.http.get<TipoProceso[]>(this.URL);
  }
  crear(tipoProceso: TipoProceso): Observable<void> {
    return this.http.post<void>(`${this.URL}`, tipoProceso);
  }
  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${id}`);
  }
  modificar(tipoProceso: TipoProceso): Observable<TipoProceso> {
    return this.http.put<TipoProceso>(this.URL, tipoProceso);
  }
}
