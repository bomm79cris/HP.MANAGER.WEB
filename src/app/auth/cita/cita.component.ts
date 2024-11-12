import { ChangeDetectorRef, Component } from '@angular/core';
import { GetCitaModel } from '../../shared/models/get-cita.model';
import { LoginService } from '../../shared/services/login.service';
import { CitasService } from '../../shared/services/cita.service';
import { Role } from '../../enums/roles.enum';
import { Table } from 'primeng/table';
import { CreateCitaModel } from '../../shared/models/create-cita.model';
import { UpdateCitaModel } from '../../shared/models/update-cita.model';
import { EstudianteModel } from '../../shared/models/estudiante.model';
import { EstudianteService } from '../../shared/services/estudiante.service';
import { PsicologoModel } from '../../shared/models/psicologo.model';
import { forkJoin, Observable } from 'rxjs';
import { MessageService } from '../../shared/services/message.service';
interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}
@Component({
  selector: 'app-citas',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.scss']
})

export class CitaComponent {
  citas: GetCitaModel[] = [];
  selectedCita: GetCitaModel | null = null;
  displayModal: boolean = false;
  displayModalForm:boolean=false;
  newcitaForm:CreateCitaModel;
  updatecitaform:UpdateCitaModel;
  estudiantes: EstudianteModel[];
  suggestionsStudents:EstudianteModel[];
  psicologos:PsicologoModel[];
  suggestionPsicologo:PsicologoModel[];
  selectedPsicologo?:PsicologoModel;
  selectedEstudiante?:EstudianteModel;
  usuario:any;
  public constructor(private cdr: ChangeDetectorRef,private mensajeService:MessageService, private authService:LoginService, private citaService:CitasService,private estudianteService:EstudianteService){
    this.newcitaForm=<CreateCitaModel>{};
    this.updatecitaform=<UpdateCitaModel>{};
    this.estudiantes=<EstudianteModel[]>{};
    this.suggestionsStudents=<EstudianteModel[]>{};
    this.psicologos=<PsicologoModel[]>{};
    this.suggestionPsicologo=<PsicologoModel[]>{};
  }
  ngOnInit(): void {
    this.loadCitasByRole();
    this.usuario=this.authService.getUserFromToken()
  }
  cambiarEstado(estadoId: number) {
    const estados = [
      { idEstado: 1, nombreEstado: 'Solicitada' },
      { idEstado: 2, nombreEstado: 'Aprobada' },
      { idEstado: 3, nombreEstado: 'Rechazada' },
      { idEstado: 4, nombreEstado: 'Cancelada' }
    ];
  
    // Buscar el estado que coincide con el idEstado
    const estadoFiltrado = estados.find(estado => estado.idEstado === estadoId);
  
    if (this.selectedCita && estadoFiltrado) {
      // Cambiar el estado de la cita seleccionada
      this.selectedCita.nombreEstado = estadoFiltrado.nombreEstado;
  
      // Aquí se actualiza la cita en la lista de citas
      const index = this.citas.findIndex(cita => cita.citaId === this.selectedCita?.citaId);
      if (index !== -1) {
        this.citas[index].nombreEstado = estadoFiltrado.nombreEstado;
        this.citas[index].estadoID = estadoFiltrado.idEstado;

      }
  
      // Aquí puedes hacer la actualización en el backend si es necesario
      this.citaService.cambiarEstadoCita(this.selectedCita.citaId, estadoId).subscribe(
        (data: any) => {
          this.mensajeService.addMessage({summary:"La cita se ha actualizado correctamente",severity:"success"})
        },
        (error: any) => {
          this.mensajeService.addMessage({summary:"Error al actualizar la cita",severity:"error"})
        }
      );
    }
  }
  
  saveForm(){
    if(this.selectedCita){
      this.updatecitaform.psicologoID=this.selectedPsicologo?.psicologoID?this.selectedPsicologo.psicologoID  :this.selectedCita.psicologoID;
      this.updatecitaform.estudianteId=this.selectedEstudiante?.estudianteId?this.selectedEstudiante.estudianteId  : this.selectedCita.estudianteId;
      const index = this.citas.findIndex(t => t.citaId === this.selectedCita!.citaId);
      if(index!==-1 && this.selectedCita){
        this.citas[index]={...this.updatecitaform,
          citaId:this.selectedCita.citaId,
          esCancelable:this.selectedCita.esCancelable,
          estadoID:this.selectedCita.estadoID,
          nombreEstudiante:this.selectedEstudiante?.nombreEstudiante?this.selectedEstudiante?.nombreEstudiante:'',
          nombrePsicologo:this.selectedPsicologo?.nombrePsicologo?this.selectedPsicologo?.nombrePsicologo:'',
          nombreEstado:this.selectedCita.nombreEstado,
          solicitadoPor:this.selectedCita.solicitadoPor
        }
        
      }
      this.citaService.updateCita(this.selectedCita.citaId,this.updatecitaform).subscribe(
       
        (data:any)=>{
          this.citas=[...this.citas];
          this.cdr.detectChanges();
          this.mensajeService.addMessage({summary:"La cita se ha editado correctamente",severity:"success"})
        }
      )
    }else{
      this.updatecitaform.psicologoID=this.selectedPsicologo?.psicologoID?this.selectedPsicologo.psicologoID  :parseInt(this.authService.getUserFromToken().sub,10);
      this.updatecitaform.estudianteId=this.selectedEstudiante?.estudianteId?this.selectedEstudiante.estudianteId  : parseInt(this.authService.getUserFromToken().sub,10);
      this.newcitaForm={...this.updatecitaform,createBy:parseInt(this.authService.getUserFromToken().sub,10)}
      const nombrePsicologo=this.psicologos.find(p=>p.psicologoID==this.newcitaForm.psicologoID);
      const nombreEstudiante=this.estudiantes.find(e=>e.estudianteId==this.newcitaForm.estudianteId);
      const nuevaCita:GetCitaModel={...this.newcitaForm,citaId:0
        ,nombreEstudiante:nombreEstudiante?nombreEstudiante.nombreEstudiante:''
        ,nombrePsicologo:nombrePsicologo?nombrePsicologo.nombrePsicologo:'',estadoID:1,nombreEstado:"Solicitada",esCancelable:true
        ,solicitadoPor:this.authService.getUserFromToken().Nombre+" "+this.authService.getUserFromToken().Apellido}
      this.citaService.createCita(this.newcitaForm).subscribe(
        (data:any)=>{
            nuevaCita.citaId=data.citaID
            console.log(nuevaCita)
            this.citas = [nuevaCita,...this.citas];
            this.mensajeService.addMessage({summary:"La cita se ha creado correctamente",severity:"success"})
        }
      )
    }
    
    this.closeModalForm()
    this.closeModal()
  }
  getEstudiantes(): Observable<EstudianteModel[]> {
    return this.estudianteService.getEstudiantes();
  }
  
  getPsicologos(): Observable<PsicologoModel[]> {
    return this.estudianteService.getPsicologos();
  }
  

  filterPsicologos(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.psicologos as any[]).length; i++) {
        let psicologo = (this.psicologos as any[])[i];
        if (psicologo.nombrePsicologo.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(psicologo);
        }
    }

    this.suggestionPsicologo = filtered;
}
  filterStudents(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.estudiantes as any[]).length; i++) {
        let estudiante = (this.estudiantes as any[])[i];
        if (estudiante.nombreEstudiante.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(estudiante);
        }
    }

    this.suggestionsStudents = filtered;
}
  onSearch(event: Event,table:Table) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      table.filterGlobal(inputElement.value, 'contains');
    }
  }
  loadCitasByRole(): void {
    const user= this.authService.getUserFromToken()
    const userRole = user.RolNombre
    const userId = user.sub

    if (userRole === Role.Estudiante) {
      this.citaService.getCitasByEstudianteId(userId).subscribe(
        (citas) => {
          this.citas = citas.reverse();
        },
        (error) => {
          this.mensajeService.addMessage({summary:'Error al obtener citas para el estudiante:', severity:"error"});
        }
      );
    } else if (userRole === Role.Psicologo) {
      this.citaService.getCitasByPsicologoId(userId).subscribe(
        (citas) => {
          this.citas = citas.reverse();
        },
        (error) => {
          console.error('Error al obtener citas para el psicólogo:', error);
        }
      );
    } else {
      console.error('Rol desconocido:', userRole);
    }
  }
  showCitaDetail(cita: GetCitaModel): void {
    this.selectedCita = cita;
    this.displayModal = true;
  }

  closeModal(): void {
    this.displayModal = false;
    this.selectedCita = null;
  }

  getSeverity(estado: string): "success" | "secondary" | "info" | "warning" | "danger" | "contrast" | undefined {
    switch (estado.toLowerCase()) {
      case "Aprobada":
        return "success";
      case "Cancelada":
        return "warning";
      case "Rechazada":
        return "danger";
      case "Solicitada":
        return "info";
      default:
        return "info"; // valor por defecto si no coincide con ningún estado
    }
  }
  showForm() {
    this.displayModalForm = true;
  
    forkJoin({
      estudiantes: this.getEstudiantes(),
      psicologos: this.getPsicologos()
    }).subscribe({
      next: ({ estudiantes, psicologos }) => {
        // Asignar los datos obtenidos a las variables
        this.estudiantes = estudiantes;
        this.psicologos = psicologos;
  
        // Verificar si la cita seleccionada existe
        if (this.selectedCita) {
          this.updatecitaform={...this.selectedCita}
          // Buscar el estudiante y el psicólogo correspondientes
          const estudiante = this.estudiantes.find(e => e.estudianteId === this.selectedCita?.estudianteId);
          const psicologo = this.psicologos.find(p => p.psicologoID === this.selectedCita?.psicologoID);
          
          // Asignar el estudiante y psicólogo encontrados
          this.selectedEstudiante = estudiante ? estudiante : <EstudianteModel>{};
          this.selectedPsicologo = psicologo ? psicologo : <PsicologoModel>{};
        }
      },
      error: (err) => {
        this.mensajeService.addMessage({summary:"Error al obtener los datos de psicologos y estudiantes",severity:"error"})
      }
    });
  }
  
  closeModalForm(): void {
    this.displayModalForm = false;
    this.newcitaForm=<CreateCitaModel>{};
    this.updatecitaform=<UpdateCitaModel>{};
    this.selectedPsicologo=undefined;
    this.selectedEstudiante=undefined;
  }
}
