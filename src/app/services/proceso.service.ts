import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProcesoDto } from '../models/dtos/proceso-dto';
import { Proceso } from '../models/proceso';

@Injectable({
  providedIn: 'root'
})
export class ProcesoService {
  private URL: string = `${environment.apiUrl}/proceso`;

  constructor(private http: HttpClient) { }

  getProceso(): Observable<Proceso[]> {
    return this.http.get<Proceso[]>(this.URL);
  }

  getDto(): Observable<ProcesoDto[]> {
    return this.http.get<ProcesoDto[]>(`${this.URL}/dto`);
  }

  getProcesoCliente(): Observable<ProcesoDto[]> {
    return this.http.get<ProcesoDto[]>(`${this.URL}/cliente/`);
  }

  crear(proceso: ProcesoDto): Observable<void> {
    return this.http.post<void>(`${this.URL}`, proceso);
  }

  modificar(proceso: ProcesoDto): Observable<void> {
    return this.http.put<void>(this.URL, proceso);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${id}`);
  }

  listarPorId(id: number): Observable<ProcesoDto> {
    return this.http.get<ProcesoDto>(`${this.URL}/${id}`)
  }

  listarPorNumeroRadicado(radicado: string): Observable<ProcesoDto[]> {
    return this.http.get<ProcesoDto[]>(`${this.URL}/radicado/${radicado}`)
  }
  listarPorDespacho(despacho: string): Observable<ProcesoDto[]> {
    return this.http.get<ProcesoDto[]>(`${this.URL}/despacho/${despacho}`)
  }
  listarPorDemandante(demandante: string): Observable<ProcesoDto[]> {
    return this.http.get<ProcesoDto[]>(`${this.URL}/demandante/${demandante}`)
  }
  listarPorDemandado(demandado: string): Observable<ProcesoDto[]> {
    return this.http.get<ProcesoDto[]>(`${this.URL}/demandado/${demandado}`)
  }

}
