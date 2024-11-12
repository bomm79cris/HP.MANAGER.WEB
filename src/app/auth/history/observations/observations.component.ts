import { Component, Input } from '@angular/core';
import { ObservacionModel } from '../../../shared/models/observacion.model';
import { ObservacionService } from '../../../shared/services/observacion.service';
import { SaveObservacionesModel } from '../../../shared/models/save-observacion.model';
import { LoginService } from '../../../shared/services/login.service';
import { Role } from '../../../enums/roles.enum';
import { MessageService } from '../../../shared/services/message.service';

@Component({
  selector: 'app-observations',
  templateUrl: './observations.component.html',
  styleUrl: './observations.component.scss'
})
export class ObservationsComponent {
    @Input() idEstudiante! :number;
    observaciones!:ObservacionModel[];
    displayModal:boolean;
    newObservation: Partial<SaveObservacionesModel> = {};
    user:any;
    public constructor(private observacionesServices: ObservacionService, private authService: LoginService,private mensajeService:MessageService){
      this.displayModal=false;
      this.user= this.authService.getUserFromToken();
    }

    ngOnInit(){
      this.getObservations();
    }

    getObservations(){
      this.observacionesServices.getObservaciones(this.idEstudiante).subscribe(
        (data:ObservacionModel[])=>{
          this.observaciones=data.reverse();
        }
      )
    }
    openModal() {
      this.displayModal = true;
      this.newObservation = {};
    }
  
    closeModal() {
      this.displayModal = false;
    }
  
    addObservation() {
      
      const nuevaObservacion: SaveObservacionesModel = {
        fecha: new Date(),                     
        descripcion: this.newObservation.descripcion || '',
        observaciones: this.newObservation.observaciones || '',
        psicologoID : parseInt(this.user.sub,10),
        estudianteID : this.idEstudiante
      }; 
      this.observacionesServices.createObservaciones(nuevaObservacion).subscribe(
        (data:number)=>{
          var observacion : ObservacionModel = {
            ...nuevaObservacion,
            nombrePsicologo : this.user.Nombre +" "+ this.user.Apellido
    
          }
          this.observaciones.unshift(observacion); 
          this.mensajeService.addMessage({summary:"la observación se ha creado exitosamente",severity:"success"})
          this.closeModal(); 
        }
      )
    }
    isVisible(){
      return this.user.RolNombre==Role.Psicologo;
    }

}
