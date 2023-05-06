import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TipoAccionJudicial } from '../models/tipo-accion-judicial';


@Injectable({
  providedIn: 'root'
})
export class TipoAccionJudicialService {

    private URL: string = `${environment.apiUrl}/tipo-proceso`;

  constructor(private http: HttpClient) {}

  getTipoAccionJudicial(): Observable<TipoAccionJudicial[]>{
    return this.http.get<TipoAccionJudicial[]>(this.URL);
  }
}