import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { ResponsablesMultiplesDto } from '../models/dtos/responsables-multiples-dto';
import { TareaDto } from '../models/dtos/tarea-dto';
import { Responsable } from '../models/responsable';
import { Tarea } from '../models/tarea';

@Injectable({
  providedIn: 'root'
})
export class TareasService {
  private URL: string = `${environment.apiUrl}/tarea`;

  constructor(private http: HttpClient) { }

  getTarea(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(this.URL);
  }

  crear(json: TareaDto, archivoLlegada: File, responsable: Responsable): Observable<void> {
    let formData: FormData = new FormData();
    formData.set('json', JSON.stringify(json));
    formData.set('archivoLlegada', archivoLlegada);
    formData.set('responsable', JSON.stringify(responsable));
    return this.http.post<void>(`${this.URL}`, formData);
  }

  crearVarios(json: ResponsablesMultiplesDto, archivoLlegada: File,responsable: Responsable): Observable<void> {
    let formData: FormData = new FormData();
    formData.set('json', JSON.stringify(json));
    formData.set('archivoLlegada', archivoLlegada);
    formData.set('responsable', JSON.stringify(responsable));
    return this.http.post<void>(`${this.URL}/varios`, formData);
  }

  pasarReporte(id: number, idReporte: number): Observable<void> {
    let formData: FormData = new FormData();
    formData.set('idReporte', JSON.stringify(idReporte));
    return this.http.put<void>(`${this.URL}/${id}`, formData);
  }

  modificar(json: TareaDto, archivoLlegada: File): Observable<void> {
    let formData: FormData = new FormData();
    formData.set('json', JSON.stringify(json));
    formData.set('archivoLlegada', archivoLlegada);
    return this.http.put<void>(`${this.URL}`, formData);
  }
  modificarSinArchivo(json: TareaDto): Observable<void> {
    let formData: FormData = new FormData();
    formData.set('json', JSON.stringify(json));
    return this.http.put<void>(`${this.URL}/null`, formData);
  }

  getPDF(id: number) {
    return this.http.get<Blob>(`${this.URL}/archivo/${id}`, { responseType: 'blob' as 'json' })

  }
}
