import { Component } from '@angular/core';
import { LoginService } from '../../shared/services/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
    nombreUsuario : string;
    rolUsuario :string;

    public constructor(private loginService:LoginService){
      this.nombreUsuario = "";
      this.rolUsuario =" ";
    }
    ngOnInit(){
      var usuario = this.loginService.getUserFromToken();
      this.nombreUsuario = usuario.Nombre + " "+usuario.Apellido;
      this.rolUsuario = usuario.RolNombre;
    }
}
