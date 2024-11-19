import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../shared/models/menu-item.model';
import { Role } from '../../enums/roles.enum';
import { LoginService } from '../../shared/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  userRole : string = '';
  menuItems : MenuItem[] ;
  userId:number;
  constructor(private authService: LoginService, private router : Router) {
    this.userId=authService.getUserFromToken().sub;
    this.menuItems= [
      { label: 'Listar Estudiantes', path: '/autorizado/listar-estudiantes', role: 'Psicologo', icon: 'pi pi-users' },
      { label: 'Listar Hijos', path: '/autorizado/listar-hijos', role: 'Padre', icon: 'pi pi-user-plus' },
      { label: 'Listar Historia Clinica', path: '/autorizado/history-component/'+this.userId, role: 'Estudiante', icon: 'pi pi-book' },
      { label: 'Citas Programadas', path: '/autorizado/citas-programadas', role: 'Psicologo', icon: 'pi pi-calendar' },
      { label: 'Citas Programadas', path: '/autorizado/citas-programadas', role: 'Estudiante', icon: 'pi pi-calendar' },
     // { label: 'Recomendaciones', path: '/autorizado/recomendaciones', role: 'Psicologo', icon: 'pi pi-flag' },
      { label: 'Listar Estudiantes', path: '/autorizado/listar-estudiantes', role: 'Docente', icon: 'pi pi-users' },
    //  { label: 'Recomendaciones', path: '/autorizado/recomendaciones', role: 'Docente', icon: 'pi pi-lightbulb' },
      { label: 'Sesiones', path: '/autorizado/sesiones', role: 'Psicologo', icon: 'pi pi-video' },
      { label: 'Sesiones', path: '/autorizado/sesiones', role: 'Estudiante', icon: 'pi pi-video' }

    ];
  }

  ngOnInit(): void {
    this.userRole = this.authService.getUserFromToken().RolNombre; 
  }


  isVisible(role: string): boolean {
    return this.userRole === role;
  }
  logout(): void {
    this.authService.logout(); 
    this.router.navigate(['/login']);
  }
}
