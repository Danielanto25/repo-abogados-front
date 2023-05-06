import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Comentario } from '../models/Comentario';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  private URL: string = `${environment.apiUrl}/comentario`;

  constructor(private http: HttpClient) { }
  
  getComentarioId(id: number): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(`${this.URL}/${id}`)
  }
  crear(comentario: Comentario): Observable<void> {
    return this.http.post<void>(`${this.URL}`, comentario);
  }
}
