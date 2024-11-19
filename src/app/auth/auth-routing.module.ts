import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EstudentsComponent } from './estudents/estudents.component';
import { HistoryComponent } from './history/history.component';
import { CitaComponent } from './cita/cita.component';
import { SesionComponent } from './sesion/sesion.component';



const routes: Routes = [{path: '',component: AuthComponent,children: [
        { path: '', component: DashboardComponent },
        { path: 'listar-estudiantes', component: EstudentsComponent },
        { path: 'listar-hijos', component: EstudentsComponent },
        { path: 'history-component/:estudianteId', component: HistoryComponent },
        {path:'citas-programadas',component:CitaComponent},
        {path:'sesiones',component:SesionComponent}
      ]
    }
  ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
