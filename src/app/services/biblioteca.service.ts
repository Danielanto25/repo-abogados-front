import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BibliotecaDocumento } from '../models/bibliotecaDocumento';

@Injectable({
  providedIn: 'root'
})
export class BibliotecaService {

  private URL: string = `${environment.apiUrl}/biblioteca-documento`;

  constructor(private http: HttpClient) { }

  getBibliotecaDocumento(): Observable<BibliotecaDocumento[]> {
    return this.http.get<BibliotecaDocumento[]>(this.URL);
  }
  listarClienteId(id: number): Observable<BibliotecaDocumento> {
    return this.http.get<BibliotecaDocumento>(`${this.URL}/${id}`)
  }

  listarPorCliente(cliente: string): Observable<BibliotecaDocumento[]> {
    return this.http.get<BibliotecaDocumento[]>(`${this.URL}/cliente/${cliente}`)
  }

  crear(json: BibliotecaDocumento, archivoLlegada: File): Observable<void> {
    let formData: FormData = new FormData();
    formData.set('json', JSON.stringify(json));
    formData.set('archivoLlegada', archivoLlegada);
    return this.http.post<void>(`${this.URL}`, formData);
  }
  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${id}`);
  }
  modificar(json: BibliotecaDocumento, archivoLlegada: File): Observable<void> {
    let formData: FormData = new FormData();
    formData.set('json', JSON.stringify(json));
    formData.set('archivoLlegada', archivoLlegada);
    return this.http.put<void>(this.URL, formData);
  }

  modificarSinArchivo(json: BibliotecaDocumento): Observable<void> {
    let formData: FormData = new FormData();
    formData.set('json', JSON.stringify(json));
    return this.http.put<void>(`${this.URL}/null`, formData);
  }

  getPDF(id: number) {
    return this.http.get<Blob>(`${this.URL}/archivo/${id}`, { responseType: 'blob' as 'json' })

  }
}
