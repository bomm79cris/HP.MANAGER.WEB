import { UpdateTratamientoModel } from "./update-tratamiento.model";

export interface GetTratamientoModel extends UpdateTratamientoModel{
    tratamientoID:number;
    estadoID: number;
    nombreEstado:string;

}