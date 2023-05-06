import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TipoTarea } from '../models/tipo-tarea';


@Injectable({
  providedIn: 'root'
})
export class TipoTareaService {

  private URL: string = `${environment.apiUrl}/tipo-tarea`;

  constructor(private http: HttpClient) { }

  getTipoTarea(): Observable<TipoTarea[]> {
    return this.http.get<TipoTarea[]>(this.URL);
  }
  crear(tipoTarea: TipoTarea): Observable<void> {
    return this.http.post<void>(`${this.URL}`, tipoTarea);
  }
  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${id}`);
  }
  modificar(tipoTarea: TipoTarea): Observable<TipoTarea[]> {
    return this.http.put<TipoTarea[]>(this.URL, tipoTarea);
  }
} 