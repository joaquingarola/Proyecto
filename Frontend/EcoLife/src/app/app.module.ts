import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from "@angular/material/table";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ZonesComponent } from './components/zones/zones.component';
import { VehiclesComponent } from './components/vehicles/vehicles.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { ConfirmationModalComponent } from './components/shared/confirmation-modal/confirmation-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ZonesFormModalComponent } from './components/zones/zones-form-modal/zones-form-modal.component';
import { VehiclesFormModalComponent } from './components/vehicles/vehicles-form-modal/vehicles-form-modal.component';
import { MatNativeDateModule } from '@angular/material/core';
import { NotifyMaintenanceFormModalComponent } from './components/vehicles/notify-maintenance-form-modal/notify-maintenance-form-modal.component';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';



@NgModule({
  declarations: [
    AppComponent,
    ZonesComponent,
    VehiclesComponent,
    NavbarComponent,
    ConfirmationModalComponent,
    ZonesFormModalComponent,
    VehiclesFormModalComponent,
    NotifyMaintenanceFormModalComponent,
    MaintenanceComponent,

   
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    TextFieldModule,
    MatSnackBarModule,

   
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
