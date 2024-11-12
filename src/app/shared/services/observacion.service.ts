import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObservacionModel } from '../models/observacion.model';
import { Observable } from 'rxjs';
import { Rutas } from '../../enviroment/enviroment.urls';
import { SaveObservacionesModel } from '../models/save-observacion.model';

@Injectable({
  providedIn: 'root'
})
export class ObservacionService {

  constructor(private http: HttpClient) { }

  getObservaciones(estudianteId:number): Observable<ObservacionModel[]>{
    return this.http.get<ObservacionModel[]>(`${Rutas.UrlApi}/api/Observaciones/observaciones/${estudianteId}`);
  } 
  createObservaciones(saveObservaciones: SaveObservacionesModel):Observable<number>{
    return this.http.post<number>(`${Rutas.UrlApi}/api/Observaciones/observaciones`,saveObservaciones);
  }
}
