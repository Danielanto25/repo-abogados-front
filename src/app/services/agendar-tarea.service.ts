import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { AgendarTarea } from '../models/AgendarTarea';
import { AgendarTareaDto } from '../models/dtos/agendar-tarea-dto';

@Injectable({
  providedIn: 'root'
})
export class AgendarTareaService {
  private URL: string = `${environment.apiUrl}/agendar-tarea`;

  constructor(private http: HttpClient) { }
    getTareaEstado(): Observable<AgendarTarea[]> {
      return this.http.get<AgendarTarea[]>(`${this.URL}`);
    }

    getTareaDto(): Observable<AgendarTareaDto[]> {
      return this.http.get<AgendarTareaDto[]>(`${this.URL}/dto`);
    }

    getTareaEstadoUser(user: string): Observable<AgendarTareaDto[]> {
      return this.http.get<AgendarTareaDto[]>(`${this.URL}/listarUser/${user}`);
    }

    listarPorId(id: number): Observable<AgendarTarea> {
      return this.http.get<AgendarTarea>(`${this.URL}/${id}`)
    }

    listarPorFechaInicio(fechaInicio: string): Observable<AgendarTarea[]> {
      return this.http.get<AgendarTarea[]>(`${this.URL}/fechaInicio/${fechaInicio}`)
    }

    listarPorFechaFin(fechaFin: string): Observable<AgendarTarea[]> {
      console.log(fechaFin);

      return this.http.get<AgendarTarea[]>(`${this.URL}/fechaFin/${fechaFin}`)
    }

    listarPorProceso(proceso: string): Observable<AgendarTarea[]> {
      return this.http.get<AgendarTarea[]>(`${this.URL}/proceso/${proceso}`)
    }
}
