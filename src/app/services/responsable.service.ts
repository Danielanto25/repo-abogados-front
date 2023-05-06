import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Responsable } from '../models/responsable';

@Injectable({
  providedIn: 'root'
})
export class ResponsableService {

  private URL: string = `${environment.apiUrl}/responsable`;

  constructor(private http: HttpClient) { }

  getProceso(): Observable<Responsable[]> {
    return this.http.get<Responsable[]>(this.URL);
  }

  crear(responsable: Responsable): Observable<void> {
    return this.http.post<void>(`${this.URL}`, responsable);
  }

  listarPorId(id: number): Observable<Responsable[]> {
    return this.http.get<Responsable[]>(`${this.URL}/${id}`)
  }
}
