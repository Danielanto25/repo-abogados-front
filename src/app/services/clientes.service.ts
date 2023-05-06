import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private URL: string = `${environment.apiUrl}/cliente`;
  constructor(private http: HttpClient) { }

  getCliente(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.URL);
  }
  crear(json: Cliente, archivoLlegada: File): Observable<void> {
    let formData: FormData = new FormData();
    formData.set('json', JSON.stringify(json));
    formData.set('archivoLlegada', archivoLlegada);
    return this.http.post<void>(`${this.URL}`, formData);
  }
  listarPorId(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.URL}/${id}`)
  }
  listarPorCliente(cliente: string): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.URL}/cliente/${cliente}`)
  }
  listarCliente(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.URL);

  }
  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${id}`);
  }
  modificar(json: Cliente, archivoLlegada: File): Observable<Cliente[]> {
    let formData: FormData = new FormData();
    formData.set('json', JSON.stringify(json));
    formData.set('archivoLlegada', archivoLlegada);
    return this.http.put<Cliente[]>(this.URL, formData);
  }
  modificarSinArchivo(json: Cliente): Observable<void> {
    let formData: FormData = new FormData();
    formData.set('json', JSON.stringify(json));
    return this.http.put<void>(`${this.URL}/null`, formData);
  }
  getPDF(id: number) {
    return this.http.get<Blob>(`${this.URL}/archivo/${id}`, { responseType: 'blob' as 'json' })

  }

}
