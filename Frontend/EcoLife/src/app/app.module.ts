import { NgModule } from '@angular/core';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
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
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatListModule } from '@angular/material/list';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ZonesComponent } from './components/admin/zones/zones.component';
import { VehiclesComponent } from './components/admin/vehicles/vehicles.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { ConfirmationModalComponent } from './components/shared/confirmation-modal/confirmation-modal.component';
import { ZonesFormModalComponent } from './components/admin/zones/zones-form-modal/zones-form-modal.component';
import { VehiclesFormModalComponent } from './components/admin/vehicles/vehicles-form-modal/vehicles-form-modal.component';
import { NotifyMaintenanceFormModalComponent } from './components/admin/vehicles/notify-maintenance-form-modal/notify-maintenance-form-modal.component';
import { MaintenanceComponent } from './components/admin/maintenance/maintenance.component';
import { FinishMaintenanceFormModalComponent } from './components/admin/maintenance/finish-maintenance-form-modal/finish-maintenance-form-modal.component';
import { ProgressBarComponent } from './components/shared/progress-bar/progress-bar.component';
import { CustomPaginator } from './custom-classes/custom-paginator/custom-paginator';
import { EditMaintenanceFormModalComponent } from './components/admin/maintenance/edit-maintenance-form-modal/edit-maintenance-form-modal.component';
import { EmployeeComponent } from './components/admin/employee/employee.component';
import { EmployeeFormModalComponent } from './components/admin/employee/employee-form-modal/employee-form-modal.component';
import { MatSelectModule } from '@angular/material/select';
import { LoginComponent } from './components/shared/login/login.component';
import { httpInterceptorProviders } from './interceptors/auth.interceptor';
import { StartingPageComponent } from './components/collector/starting-page/starting-page.component';
import { FirstEntryComponent } from './components/shared/login/first-entry/first-entry.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ContactUsComponent } from './components/homepage/contact-us/contact-us.component';
import { AboutUsComponent } from './components/homepage/about-us/about-us.component';
import { FooterComponent } from './components/homepage/footer/footer.component';


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
    FinishMaintenanceFormModalComponent,
    ProgressBarComponent,
    EditMaintenanceFormModalComponent,
    EmployeeComponent,
    EmployeeFormModalComponent,
    LoginComponent,
    StartingPageComponent,
    FirstEntryComponent,
    HomepageComponent,
    ContactUsComponent,
    AboutUsComponent,
    FooterComponent
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
    MatProgressBarModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatListModule
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: CustomPaginator }, httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
