import { Component, Input } from '@angular/core';
import { GetTratamientoModel } from '../../../shared/models/get-tratamiento.model';
import { NuevoTratamientoModel } from '../../../shared/models/nuevo-tratamiento.model';
import { TratamientoService } from '../../../shared/services/tratamiento.service';
import { LoginService } from '../../../shared/services/login.service';
import { Role } from '../../../enums/roles.enum';
import { ConfirmationService } from 'primeng/api';
import { EstadoTratamientoModel } from '../../../shared/models/estadoTratamiento.model';
import { MessageService } from '../../../shared/services/message.service';

@Component({
  selector: 'app-tratamientos',
  templateUrl: './tratamientos.component.html',
  styleUrl: './tratamientos.component.scss'
})
export class TratamientosComponent {
  @Input() idEstudiante!: number;
  tratamientos!: GetTratamientoModel[];
  displayDetailModal: boolean = false;
  displayModal: boolean = false;
  newTratamiento: Partial<NuevoTratamientoModel> = {}; 
  user: any;
  selectedTratamiento: GetTratamientoModel | null = null;
  Estadotratamientos:EstadoTratamientoModel[];
  public constructor(
    private tratamientoServices: TratamientoService,
    private authService: LoginService,
    private confirmationService: ConfirmationService,
    private mensajeService:MessageService
  ) {
    this.user = this.authService.getUserFromToken();
    this.Estadotratamientos=[{estadoID:1,nombreEstado:"Pendiente"},
      {estadoID:2,nombreEstado:"Aprobado"},
      {estadoID:3,nombreEstado:"Rechazado"},
      {estadoID:4,nombreEstado:"Completado"}
    ]
  }

  ngOnInit() {
    this.getTratamientos();
  }

  getTratamientos() {
    this.tratamientoServices.getTratamientosByEstudianteId(this.idEstudiante).subscribe(
      (data: GetTratamientoModel[]) => {
        this.tratamientos = data.reverse();
      }
    );
  }

 
  openModal(tratamiento?: GetTratamientoModel) {
    if (tratamiento) {
      this.selectedTratamiento = { ...tratamiento }; 
      this.newTratamiento = { ...tratamiento };
    } else {
      this.selectedTratamiento = null; 
      this.newTratamiento = {}; 
    }
    this.displayModal = true;
  }

  closeModal() {
    this.displayModal = false;
  }

  saveTratamiento() {
    const tratamientoData: NuevoTratamientoModel = {
      titulo: this.newTratamiento.titulo || '',
      fechaInicio: this.newTratamiento.fechaInicio || new Date(),
      fechaFin: this.newTratamiento.fechaFin || new Date(),
      description: this.newTratamiento.description || '',
      psicologoID: parseInt(this.user.sub,10),
      estudianteID: this.idEstudiante
    };

    if (this.selectedTratamiento?.tratamientoID) {
   
      this.tratamientoServices.editarTratamiento(this.selectedTratamiento.tratamientoID, tratamientoData).subscribe(() => {
        const index = this.tratamientos.findIndex(t => t.tratamientoID === this.selectedTratamiento!.tratamientoID);
        if (index !== -1 && this.selectedTratamiento) {
          this.tratamientos[index] = { ...tratamientoData,tratamientoID:this.selectedTratamiento.tratamientoID,
            estadoID:this.selectedTratamiento.estadoID,
            nombreEstado:this.selectedTratamiento.nombreEstado
          };
        }
        this.mensajeService.addMessage({summary:"El tratamiento ha sido editado exitosamente",severity:"success"})
        this.closeModal();
      });
    } else {
      
      this.tratamientoServices.crearTratamiento(tratamientoData).subscribe((data: any) => {
        const newTratamiento: GetTratamientoModel = {
          ...tratamientoData,
          tratamientoID: data.tratamientoID,
          estadoID: 1,
          nombreEstado: "Pendiente"
        };
        this.tratamientos.unshift(newTratamiento);
        this.mensajeService.addMessage({summary:"El tratamiento ha sido creado exitosamente",severity:"success"})
        this.closeModal();
      });
    }
  }

  showDetail(tratamiento: GetTratamientoModel) {
    this.selectedTratamiento = tratamiento;
    this.displayDetailModal = true;
  }

  closeDetailModal() {
    this.displayDetailModal = false;
  }

  isVisible() {
    return this.user.RolNombre === Role.Psicologo;
  }
  isVisibleParents() {
    return this.user.RolNombre === Role.Padre;
  }
  cambiarEstado(estadoID:number){
    if(this.selectedTratamiento){
      this.tratamientoServices.cambiarEstadoTratamiento(this.selectedTratamiento.tratamientoID,estadoID).subscribe(
        (data:number)=>{
          const index = this.tratamientos.findIndex(t => t.tratamientoID === this.selectedTratamiento!.tratamientoID);
          if (index !== -1 && this.selectedTratamiento) {
            this.tratamientos[index].estadoID=estadoID
            this.selectedTratamiento.estadoID=estadoID
            this.tratamientos[index].nombreEstado=this.Estadotratamientos.find(estado=> estado.estadoID==estadoID)?.nombreEstado||''
            this.selectedTratamiento.nombreEstado=this.Estadotratamientos.find(estado=> estado.estadoID==estadoID)?.nombreEstado||''
        }
        this.mensajeService.addMessage({summary:"El estado del tratamiento ha sido actualizado exitosamente",severity:"success"})
        }
        
      )
    }
  }
  deleteTratamiento(tratamientoId:number) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas eliminar este tratamiento?',
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.tratamientoServices.eliminarTratamiento(tratamientoId).subscribe(() => {
          this.tratamientos = this.tratamientos.filter(t => t.tratamientoID !== tratamientoId);
          this.mensajeService.addMessage({summary:"El tratamiento ha sido eliminado exitosamente",severity:"success"})

        });
      },
      reject: () => {
      }
    });
  }
}
