import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rutas } from '../../enviroment/enviroment.urls';
import { GetCitaModel } from '../models/get-cita.model';
import { CreateCitaModel } from '../models/create-cita.model';
import { UpdateCitaModel } from '../models/update-cita.model';

@Injectable({
  providedIn: 'root'
})
export class CitasService {
  
  constructor(private http: HttpClient) {}

  getCitasByEstudianteId(estudianteId: number): Observable<GetCitaModel[]> {
    return this.http.get<GetCitaModel[]>(`${Rutas.UrlApi}/api/Citas/estudiante/${estudianteId}`);
  }

  getCitasByPsicologoId(psicologoId: number): Observable<GetCitaModel[]> {
    return this.http.get<GetCitaModel[]>(`${Rutas.UrlApi}/api/Citas/psicologo/${psicologoId}`);
  }

  createCita(newCita: CreateCitaModel): Observable<number> {
    return this.http.post<number>(`${Rutas.UrlApi}/api/Citas`, newCita);
  }

  updateCita(citaId: number, updateCita: UpdateCitaModel): Observable<void> {
    return this.http.put<void>(`${Rutas.UrlApi}/api/Citas/${citaId}`, updateCita);
  }

  cambiarEstadoCita(citaId: number, newEstadoId: number): Observable<void> {
    return this.http.put<void>(`${Rutas.UrlApi}/api/Citas/state-cita/${citaId}?newEstadoID=${newEstadoId}`, null);
  }

  deleteCitaById(citaId: number): Observable<void> {
    return this.http.delete<void>(`${Rutas.UrlApi}/api/Citas/${citaId}`);
  }
}
