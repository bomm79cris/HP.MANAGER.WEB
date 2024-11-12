import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetTratamientoModel } from '../models/get-tratamiento.model';
import { Rutas } from '../../enviroment/enviroment.urls';
import { NuevoTratamientoModel } from '../models/nuevo-tratamiento.model';
import { UpdateTratamientoModel } from '../models/update-tratamiento.model';

@Injectable({
  providedIn: 'root'
})
export class TratamientoService {

  constructor(private http: HttpClient) { }

  getTratamientosByEstudianteId(estudianteId:number):Observable<GetTratamientoModel[]>{
    return this.http.get<GetTratamientoModel[]>(`${Rutas.UrlApi}/api/Tratamientos/${estudianteId}`);
  }
  cambiarEstadoTratamiento(tratamientoID: number, estadoID: number): Observable<any> {
    return this.http.put<any>(`${Rutas.UrlApi}/api/Tratamientos/${tratamientoID}?estadoID=${estadoID}`,null);
  }

  crearTratamiento(tratamiento: NuevoTratamientoModel): Observable<any> {
    return this.http.post<any>(`${Rutas.UrlApi}/api/Tratamientos`, tratamiento);
  }

  editarTratamiento(tratamientoID: number, tratamiento: UpdateTratamientoModel): Observable<any> {
    return this.http.put(`${Rutas.UrlApi}/api/Tratamientos/update/${tratamientoID}`, tratamiento);
  }

  eliminarTratamiento(tratamientoID: number): Observable<any> {
    return this.http.delete(`${Rutas.UrlApi}/api/Tratamientos/${tratamientoID}`);
  }
}
