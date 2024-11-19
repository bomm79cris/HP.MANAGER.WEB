import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth-routing.module';
import { TooltipModule } from 'primeng/tooltip';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { EstudentsComponent } from './estudents/estudents.component'; 
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { HttpClientModule } from '@angular/common/http';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { SliderModule } from 'primeng/slider';
import { ProgressBarModule } from 'primeng/progressbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HistoryComponent } from './history/history.component';
import { ObservationsComponent } from './history/observations/observations.component';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TratamientosComponent } from './history/tratamientos/tratamientos.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CitaComponent } from './cita/cita.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { ComportamientoComponent } from './comportamiento/comportamiento.component';
import { RecomendacionesComponent } from './recomendaciones/recomendaciones.component';
import { SesionComponent } from './sesion/sesion.component';
import { PanelModule } from 'primeng/panel';
import { AvatarModule } from 'primeng/avatar';
import {MenuModule} from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { InputNumberModule } from 'primeng/inputnumber';
@NgModule({
  declarations: [
    MenuComponent,
    DashboardComponent,
    FooterComponent,
    EstudentsComponent,
    HistoryComponent,
    ObservationsComponent,
    TratamientosComponent,
    CitaComponent,
    ComportamientoComponent,
    RecomendacionesComponent,
    SesionComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AuthRoutingModule,
    TooltipModule,
    TableModule, 
    TagModule, 
    ButtonModule,
    IconFieldModule,
    InputIconModule, 
    HttpClientModule, 
    CommonModule, 
    MultiSelectModule,
    InputTextModule,
    DropdownModule,
    SliderModule, 
    ProgressBarModule ,
    FormsModule,
    DialogModule,
    InputTextareaModule,
    ConfirmDialogModule,
    ReactiveFormsModule,
     AutoCompleteModule,
     CalendarModule,
     CheckboxModule,
     PanelModule,
     AvatarModule,
     MenuModule,
     RippleModule,
     ToastModule,
     ToolbarModule,
     FileUploadModule,
     RadioButtonModule,
     RatingModule,
     InputNumberModule
     
  ],
  exports: [MenuComponent,FooterComponent],
  providers: [ConfirmationService,MessageService ]
})
export class AuthModule { }
