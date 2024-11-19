import { HttpClient } from '@angular/common/http';
import {  Injectable } from '@angular/core';
import { CreateComportamiento } from '../models/create-comportamiento.model';
import { Observable } from 'rxjs';
import { Rutas } from '../../enviroment/enviroment.urls';
import {Comportamiento} from '../models/comportamiento.model';
@Injectable({
  providedIn: 'root'
})
export class ComportamientoService {

  constructor(private http: HttpClient) {
  }
  createComportamiento(newComportamiento :CreateComportamiento):Observable<any>{
    return this.http.post<any>(Rutas.UrlApi+"/api/Comportamiento",newComportamiento);
  }
  getComportamientoByEstudiante(estudianteId:number,userId:Number):Observable<Comportamiento[]>{
    return this.http.get<Comportamiento[]>(Rutas.UrlApi+"/api/Comportamiento/estudiante/"+estudianteId+"?userId="+userId)
  }
  updateComportamiento(comportamientoId:number,newObservacion:string):Observable<any>{
    return this.http.put<any>(Rutas.UrlApi+"/api/Comportamiento/"+comportamientoId+"?newObservation="+newObservacion,{newObservacion})
  }
  DeleteComportamiento(comportamientoId:number):Observable<any>{
    return this.http.delete<any>(Rutas.UrlApi+"/api/Comportamiento/"+comportamientoId)
  }
}
