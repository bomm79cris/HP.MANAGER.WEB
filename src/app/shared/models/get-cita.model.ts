export interface GetCitaModel {
    citaId: number;
    estudianteId: number;
    nombreEstudiante: string;
    psicologoID: number;
    nombrePsicologo: string;
    fechaHora: Date;
    estadoID: number;
    nombreEstado: string;
    motivo: string;
    descripcion?: string;
    solicitadoPor: string;
    debeIrPadre: boolean;
    esCancelable: boolean;
  }
  