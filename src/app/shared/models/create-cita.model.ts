import { UpdateCitaModel } from "./update-cita.model";

export interface CreateCitaModel extends UpdateCitaModel{
    createBy: number;
}