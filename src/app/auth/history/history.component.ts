import { Component, OnInit } from '@angular/core';
import { EstudianteModel } from '../../shared/models/estudiante.model';
import { EstudianteService } from '../../shared/services/estudiante.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../../shared/services/message.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  estudiante: EstudianteModel;
  idEstudiante: number;
  constructor(
    private estudianteService: EstudianteService,
    private route: ActivatedRoute,
    private mensajeService:MessageService
  ) {
    this.estudiante = <EstudianteModel>{};
    this.idEstudiante = Number(this.route.snapshot.paramMap.get('estudianteId'));
  }

  ngOnInit(): void {
    this.getEstudiante();
  }

  getEstudiante(): void {

    if (this.idEstudiante) {
      // Llama al servicio para obtener la información del estudiante
      this.estudianteService.getEstudianteById(this.idEstudiante).subscribe(
        (data: EstudianteModel) => {
          this.estudiante = data;
        },
        (error) => {
          this.mensajeService.addMessage({summary:"Error al obtener al estudiante",severity:"error"})
        }
      );
    } else {
      this.mensajeService.addMessage({summary:"ID del estudiante no encontrado en la ruta",severity:"error"})
    }
  }
}
