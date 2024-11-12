import { UpdateTratamientoModel } from "./update-tratamiento.model";

export interface NuevoTratamientoModel extends UpdateTratamientoModel{
    estudianteID : number;
    psicologoID : number;
}