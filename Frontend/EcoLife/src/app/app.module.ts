import { NgModule,LOCALE_ID } from '@angular/core';
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
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@Angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VehiclesComponent } from './components/admin/vehicles/vehicles.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { ConfirmationModalComponent } from './components/shared/confirmation-modal/confirmation-modal.component';
import { VehiclesFormModalComponent } from './components/admin/vehicles/vehicles-form-modal/vehicles-form-modal.component';
import { NotifyMaintenanceFormModalComponent } from './components/admin/vehicles/notify-maintenance-form-modal/notify-maintenance-form-modal.component';
import { MaintenanceComponent } from './components/admin/maintenance/maintenance.component';
import { FinishMaintenanceFormModalComponent } from './components/admin/maintenance/finish-maintenance-form-modal/finish-maintenance-form-modal.component';
import { ProgressBarComponent } from './components/shared/progress-bar/progress-bar.component';
import { CustomPaginator } from './custom-classes/custom-paginator/custom-paginator';
import { EditMaintenanceFormModalComponent } from './components/admin/maintenance/edit-maintenance-form-modal/edit-maintenance-form-modal.component';
import { EmployeeComponent } from './components/admin/employee/employee.component';
import { EmployeeFormModalComponent } from './components/admin/employee/employee-form-modal/employee-form-modal.component';
import { LoginComponent } from './components/shared/login/login.component';
import { httpInterceptorProviders } from './interceptors/auth.interceptor';
import { StartingPageComponent } from './components/collector/starting-page/starting-page.component';
import { FirstEntryComponent } from './components/shared/login/first-entry/first-entry.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ContactUsComponent } from './components/homepage/contact-us/contact-us.component';
import { AboutUsComponent } from './components/homepage/about-us/about-us.component';
import { FooterComponent } from './components/homepage/footer/footer.component';
import { HeaderComponent } from './components/homepage/header/header.component';
import { NewsComponent } from './components/homepage/news/news.component';
import { NewsPanelComponent } from './components/admin/news-panel/news-panel.component';
import { NewsFormComponent } from './components/admin/news-panel/news-form/news-form.component';
import { DatePipe } from '@angular/common';
import { ItemsListComponent } from './components/shared/items-list/items-list.component';
import { ReportsComponent } from './components/admin/reports/reports.component';
import { ContainerComponent } from './components/admin/container/container.component';
import { ContainerFormModalComponent } from './components/admin/container/container-form-modal/container-form-modal.component';
import { MapComponent } from './components/shared/map/map.component';
import { RoutesComponent } from './components/admin/routes/routes.component';
import { WasteCentersComponent } from './components/admin/waste-centers/waste-centers.component';
import { VehicleCentersComponent } from './components/admin/vehicle-centers/vehicle-centers.component';
import { VehicleCenterFormModalComponent } from './components/admin/vehicle-centers/vehicle-center-form-modal/vehicle-center-form-modal.component';
import { WasteCenterFormModalComponent } from './components/admin/waste-centers/waste-center-form-modal/waste-center-form-modal.component';
import { RoutesFormModalComponent } from './components/admin/routes/routes-form-modal/routes-form-modal.component';
import { PlanifyRecolectionComponent } from './components/admin/routes/planify-recolection/planify-recolection.component';
import { MenubarModule } from 'primeng/menubar';
import { RecolectionsComponent } from './components/admin/recolections/recolections.component';
import { ViewRecolectionComponent } from './components/admin/recolections/view-recolection/view-recolection.component';
import { RouteNotValidModalComponent } from './components/admin/routes/route-not-valid-modal/route-not-valid-modal.component';
import { FrecuentQuestionsComponent } from './components/homepage/frecuent-questions/frecuent-questions.component';

// Configura la aplicación para usar español
registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    VehiclesComponent,
    NavbarComponent,
    ConfirmationModalComponent,
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
    FrecuentQuestionsComponent,
    FooterComponent,
    HeaderComponent,
    NewsComponent,
    NewsPanelComponent,
    NewsFormComponent,
    ItemsListComponent,
    ReportsComponent,
    ContainerComponent,
    ContainerFormModalComponent,
    MapComponent,
    RoutesComponent,
    WasteCentersComponent,
    VehicleCentersComponent,
    VehicleCenterFormModalComponent,
    WasteCenterFormModalComponent,
    RoutesFormModalComponent,
    PlanifyRecolectionComponent,
    RecolectionsComponent,
    ViewRecolectionComponent,
    RouteNotValidModalComponent
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
    MatListModule,
    DatePipe,
    MatExpansionModule,
    MatCardModule,
    MenubarModule,
    MatMenuModule,
    MatProgressSpinnerModule
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: CustomPaginator }, httpInterceptorProviders, { provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
