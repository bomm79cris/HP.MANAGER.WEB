import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EstudianteModel } from '../models/estudiante.model';
import { Rutas } from '../../enviroment/enviroment.urls';
import { Observable } from 'rxjs';
import { PsicologoModel } from '../models/psicologo.model';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  constructor(private http: HttpClient) {}

  getEstudiantes(): Observable<EstudianteModel[]> {
    return this.http.get<EstudianteModel[]>(`${Rutas.UrlApi}/api/User`);
  }
  getEstudiantesByPadreId(padreId:number): Observable<EstudianteModel[]> {
    return this.http.get<EstudianteModel[]>(`${Rutas.UrlApi}/api/User/${padreId}`);
  }
  getEstudianteById(estudianteId:number): Observable<EstudianteModel> {
    return this.http.get<EstudianteModel>(`${Rutas.UrlApi}/api/User/estudiante/${estudianteId}`);
  }
  getPsicologos(): Observable<PsicologoModel[]> {
    return this.http.get<PsicologoModel[]>(`${Rutas.UrlApi}/api/User/psicologos`);
  }
}
