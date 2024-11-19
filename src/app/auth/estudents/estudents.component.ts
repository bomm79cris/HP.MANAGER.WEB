import { Component, OnInit } from '@angular/core';
import { EstudianteModel } from '../../shared/models/estudiante.model';
import { EstudianteService } from '../../shared/services/estudiante.service';
import { Table } from 'primeng/table';
import { LoginService } from '../../shared/services/login.service';
import { Role } from '../../enums/roles.enum';
import { MessageService } from '../../shared/services/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estudents',
  templateUrl: './estudents.component.html',
  styleUrls: ['./estudents.component.scss'],
})
export class EstudentsComponent implements OnInit {
  estudiantes!: EstudianteModel[];   
  loading: boolean = true;  
  searchValue: string | undefined;
  constructor(private estudianteService: EstudianteService,
     private authService: LoginService,
      private mensajeService: MessageService,
      private router: Router) {}

  ngOnInit() {
      var user = this.authService.getUserFromToken();
      if(user.RolNombre==Role.Padre) {
          this.estudianteService.getEstudiantesByPadreId(user.sub).subscribe(
            (data: EstudianteModel[]) => {
              this.estudiantes = data;  
              this.loading = false;  
            },
            (error) => {
              this.mensajeService.addMessage({summary:"Error al obtener estudiantes",severity:"error"})
              this.loading = false;  
            }
          );
        }else if(user.RolNombre==Role.Psicologo ||user.RolNombre==Role.Docente  ) { 
          this.estudianteService.getEstudiantes().subscribe(
            (data: EstudianteModel[]) => {
              this.estudiantes = data;  
              this.loading = false;  
            },
            (error) => {
              this.mensajeService.addMessage({summary:"Error al obtener estudiantes",severity:"error"})
              this.loading = false;  
            }
          );
        }else { 
            this.mensajeService.addMessage({summary:"Usted no tiene permisos sobre esta vista",severity:"error" })
         }
  }

  onSearch(event: Event,table:Table) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      table.filterGlobal(inputElement.value, 'contains');
    }
  }
  navigateToDetails(estudianteId: number) {
    this.router.navigate(['autorizado/history-component/'+ estudianteId]);
  }
}
