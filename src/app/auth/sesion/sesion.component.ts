import { Component } from '@angular/core';
import { MessageService } from '../../shared/services/message.service';
import { ConfirmationService } from 'primeng/api';
import { Sesion } from '../../shared/models/sesion.mode';
import { SesionService } from '../../shared/services/sesion.service';
import { LoginService } from '../../shared/services/login.service';
import { EstudianteService } from '../../shared/services/estudiante.service';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { SaveSesiones } from '../../shared/models/save-sesion.model';

@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.component.html',
  styleUrl: './sesion.component.scss'
})
export class SesionComponent {
  sesionDialog: boolean = false;

  sesions!: Sesion[];

  sesion!: Sesion;

  selectedsesions!: Sesion[] | null;

  submitted: boolean = false;

  statuses!: any[];
  user:any;
  psicologos:any[]=[];
  filterPsicologos:any[]=[];
  estudiantes:any[]=[];
  filterEstudiantes:any[]=[];
  constructor(private estudianteService:EstudianteService,private loginService:LoginService, private sesionService: SesionService, private messageService: MessageService, private confirmationService: ConfirmationService) {}

  ngOnInit() {
    this.estudianteService.getEstudiantes().subscribe(
      (data)=>{
        this.estudiantes=data
      }
    );
    this.estudianteService.getPsicologos().subscribe(
      (data)=>{
        this.psicologos=data
      }
    )

    
    this.user=this.loginService.getUserFromToken()
      if(this.loginService.getUserFromToken().RolId==1){
        this.sesionService.getByPsicologId(this.loginService.getUserFromToken().sub).subscribe(
          (data)=>{
            this.sesions=data
          }
        )

      }else if(this.loginService.getUserFromToken().RolId==3){
        this.sesionService.getByEstudianteId(this.loginService.getUserFromToken().sub).subscribe(
          (data)=>{
            this.sesions=data
          }
        )
       
      }else{
        this.messageService.addMessage({summary:"No tienes permisos sobre esta vista",severity:"error"})
      }

    
  }
  filterPsicologosMetodo(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.psicologos as any[]).length; i++) {
        let country = (this.psicologos as any[])[i];
        if (country.nombrePsicologo.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(country);
        }
    }

    this.filterPsicologos = filtered;
}
filterEstudianteMetodo(event: AutoCompleteCompleteEvent) {
  let filtered: any[] = [];
  let query = event.query;

  for (let i = 0; i < (this.estudiantes as any[]).length; i++) {
      let country = (this.estudiantes as any[])[i];
      if (country.nombreEstudiante.toLowerCase().indexOf(query.toLowerCase()) == 0) {
          filtered.push(country);
      }
  }

  this.filterEstudiantes = filtered;
}
  openNew() {
      this.sesion = <Sesion>{};
      this.submitted = false;
      this.sesionDialog = true;
  }


  editsesion(sesion: Sesion) {
    
      var nuevaSesion:SaveSesiones={aspectosAMejorar:sesion.aspectosAMejorar,descripcion:sesion.descripcion,estudianteID:sesion.estudianteID,fechaHora:new Date(),objetivoAlcanzado:sesion.objetivoAlcanzado,psicologoID:sesion.psicologoID}
      if(this.user.RolId==1){
        nuevaSesion.psicologoID=this.user.sub
      }if(this.user.RolId==3){
        nuevaSesion.estudianteID=this.user.sub
      }
      this.sesionService.updateSesion(nuevaSesion,sesion.sesionID).subscribe(
        ()=>{
          this.sesion = { ...sesion };
      this.sesionDialog = true;
      this.messageService.addMessage({summary:"Sesion actualizada con exito",severity:"success"})
        }
      )
  }

  deletesesion(sesion: Sesion) {
      this.confirmationService.confirm({
          message: '¿Deseas eliminar esta sesion?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.sesionService.eliminar(sesion.sesionID).subscribe(
                ()=>{
                  this.sesions = this.sesions.filter((val) => val.sesionID !== sesion.sesionID);
              this.sesion = <Sesion>{};
              this.messageService.addMessage({ severity: 'success', summary: 'Successful', detail: 'sesion Deleted', life: 3000 });
                }
              )
          }
      });
  }

  hideDialog() {
      this.sesionDialog = false;
      this.submitted = false;
  }

  savesesion() {
      this.submitted = true;
      var nuevaSesion:SaveSesiones={aspectosAMejorar:this.sesion.aspectosAMejorar,
        descripcion:this.sesion.descripcion,estudianteID:this.sesion.estudianteID,fechaHora:new Date(),
        objetivoAlcanzado:this.sesion.objetivoAlcanzado,psicologoID:this.sesion.psicologoID}
        if(this.user.RolId==1){
          nuevaSesion.psicologoID=this.user.sub
        }if(this.user.RolId==3){
          nuevaSesion.estudianteID=this.user.sub
        }
     this.sesionService.crearSesion(nuevaSesion).subscribe(
      (data)=>{
        this.sesion.sesionID=data.sesionID
        this.sesion.psicologoNombre=data.psicologoNombre,
        this.sesion.estudianteNombre=data.estudianteNombre,
        this.sesions.push(this.sesion);
        this.sesions = [...this.sesions];
        this.sesionDialog = false;
        this.sesion = <Sesion>{};
    
      }
     )
  }

  findIndexById(id: number): number {
      let index = -1;
      for (let i = 0; i < this.sesions.length; i++) {
          if (this.sesions[i].sesionID === id) {
              index = i;
              break;
          }
      }

      return index;
  }

}
