import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { ComportamientoService } from '../../shared/services/comportamiento.service';
import { MessageService } from '../../shared/services/message.service';
import { CreateComportamiento } from '../../shared/models/create-comportamiento.model';
import { LoginService } from '../../shared/services/login.service';
import { MenuItem } from 'primeng/api';
import { Comportamiento } from '../../shared/models/comportamiento.model';

@Component({
  selector: 'app-comportamiento',
  templateUrl: './comportamiento.component.html',
  styleUrl: './comportamiento.component.scss'
})
export class ComportamientoComponent {
  comportamientos: Comportamiento[] = [];
  comportamientoSubscription!: Subscription;
  comportamientoActual: Comportamiento = this.crearNuevoComportamiento();
  dialogoVisible: boolean = false;
  esEdicion: boolean = false;
  RolId:number;
  @Input() idEstudiante!: number;
  
  constructor(private comportamientoService: ComportamientoService ,private messageService:MessageService,private loginService:LoginService) {
    this.RolId=this.loginService.getUserFromToken().RolId
  }

  ngOnInit(): void {
    this.comportamientoSubscription = this.comportamientoService
      .getComportamientoByEstudiante(this.idEstudiante,this.loginService.getUserFromToken().sub) 
      .subscribe((data) => {
        this.comportamientos = data;
      });
  }
  abrirDialogoCrear(): void {
    this.comportamientoActual = this.crearNuevoComportamiento();
    this.esEdicion = false;
    this.dialogoVisible = true;
  }
// Crear dinámicamente los elementos del menú
crearItemsMenu(comportamiento: Comportamiento): MenuItem[] {
  return [
    {
      label: 'Editar',
      icon: 'pi pi-pencil',
      command: () => this.abrirDialogoEditar(comportamiento),
    },
    {
      label: 'Eliminar',
      icon: 'pi pi-trash',
      command: () => this.eliminarComportamiento(comportamiento),
    },
  ];
}
  abrirDialogoEditar(comportamiento: Comportamiento): void {
    this.comportamientoActual = { ...comportamiento };
    this.esEdicion = true;
    this.dialogoVisible = true;
  }
  crearNuevoComportamiento(): Comportamiento {
    return {
      comportamientoID: 0,
      docenteID: 0,
      docenteFullName: '',
      fecha: new Date().toISOString(),
      observaciones: '',
      createdAt: new Date().toISOString(),
      soyElCreador: true,
    };
  }
  cerrarDialogo(): void {
    this.dialogoVisible = false;
    this.comportamientoActual = this.crearNuevoComportamiento();
  }
  guardarComportamiento(): void {
    if (this.esEdicion) {
      this.comportamientoService.updateComportamiento(this.comportamientoActual.comportamientoID,this.comportamientoActual.observaciones).subscribe(
        (data)=>{
          const index = this.comportamientos.findIndex(
            (c) => c.comportamientoID === this.comportamientoActual.comportamientoID
          );
          if (index !== -1) {
            this.comportamientos[index] = { ...this.comportamientoActual };
          }
          this.messageService.addMessage({summary:"Actualizado correctamente",severity:"success"})
        }
      )
      
    } else {
      const nuevoComportamiento:CreateComportamiento={
        createAt:new Date(),
        docenteId:this.loginService.getUserFromToken().sub,
        estudianteId:this.idEstudiante,
        fecha:new Date(),
        observaciones:this.comportamientoActual.observaciones

      }
      this.comportamientoService.createComportamiento(nuevoComportamiento).subscribe(
        (data)=>{
          this.comportamientoActual.comportamientoID = data.comportamientoID
          this.comportamientoActual.docenteFullName=this.loginService.getUserFromToken().Nombre+" "+this.loginService.getUserFromToken().Apellido
          this.comportamientoActual.docenteID=this.loginService.getUserFromToken().sub,
          this.comportamientoActual.createdAt = new Date().toISOString();
          this.comportamientos.push({ ...this.comportamientoActual });
        }
      )
   
    }
    this.cerrarDialogo();
  }

  eliminarComportamiento(comportamiento: Comportamiento): void {
    this.comportamientoService.DeleteComportamiento(comportamiento.comportamientoID).subscribe(
      ()=>{
        this.comportamientos = this.comportamientos.filter(
          (c) => c.comportamientoID !== comportamiento.comportamientoID
        );
        this.messageService.addMessage({summary:"Comportamiento eliminado correctamente",severity:"success"})
      }
    )
   
  }

  ngOnDestroy(): void {
    if (this.comportamientoSubscription) {
      this.comportamientoSubscription.unsubscribe();
    }
  }
}
