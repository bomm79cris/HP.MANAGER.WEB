import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sesion } from '../models/sesion.mode';
import { Rutas } from '../../enviroment/enviroment.urls';
import { SaveSesiones } from '../models/save-sesion.model';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  constructor(private http: HttpClient) { 

  }
  getByEstudianteId(idEstudiante:number):Observable<Sesion[]>{
    return this.http.get<Sesion[]>(Rutas.UrlApi+"/api/Sesion/estudiante/"+idEstudiante)
  }
  getByPsicologId(idPsicologo:number):Observable<Sesion[]>{
    return this.http.get<Sesion[]>(Rutas.UrlApi+"/api/Sesion/psicologo/"+idPsicologo)
  }
  crearSesion(nuevaSesion:SaveSesiones):Observable<any>{
    return this.http.post<any>(Rutas.UrlApi+"/api/Sesion",nuevaSesion)
  }
  eliminar(idSesion:number):Observable<any>{
    return this.http.delete<any>(Rutas.UrlApi+"/api/Sesion/"+idSesion)
  }
  updateSesion(nuevaSesion:SaveSesiones,sesionId:number):Observable<any>{
    return this.http.put<any>(Rutas.UrlApi+"/api/Sesion/"+sesionId,nuevaSesion)
  }
}
