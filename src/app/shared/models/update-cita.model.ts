export interface UpdateCitaModel {
    fechaHora: Date;
    motivo: string;
    psicologoID: number;
    estudianteId: number;
    descripcion?: string;
    debeIrPadre: boolean;
  }
  