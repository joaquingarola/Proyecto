import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehiclesComponent } from './components/admin/vehicles/vehicles.component';
import { MaintenanceComponent } from './components/admin/maintenance/maintenance.component';
import { EmployeeComponent } from './components/admin/employee/employee.component';
import { LoginComponent } from './components/shared/login/login.component';
import { authGuard } from './guards/auth.guard';
import { FirstEntryComponent } from './components/shared/login/first-entry/first-entry.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NewsPanelComponent } from './components/admin/news-panel/news-panel.component';
import { ReportsComponent } from './components/admin/reports/reports.component';
import { ContainerComponent } from './components/admin/container/container.component';
import { RoutesComponent } from './components/admin/routes/routes.component';
import { VehicleCentersComponent } from './components/admin/vehicle-centers/vehicle-centers.component';
import { WasteCentersComponent } from './components/admin/waste-centers/waste-centers.component';
import { RecolectionsComponent } from './components/admin/recolections/recolections.component';
import { AssignmentListComponent } from './components/collector/assignment-list/assignment-list.component';
import { CurrentCollectionComponent } from './components/collector/current-collection/current-collection.component';
import { ResetPasswordComponent } from './components/shared/reset-password/reset-password.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'new-password', component: ResetPasswordComponent},
  {path: 'vehicles', component: VehiclesComponent, canActivate: [authGuard], data: { roles: ['Administrador'] }},
  {path: 'maintenances', component: MaintenanceComponent, canActivate: [authGuard], data: { roles: ['Administrador'] }}, 
  {path: 'employees', component: EmployeeComponent, canActivate: [authGuard], data: { roles: ['Administrador'] }},
  {path: 'first-entry', component: FirstEntryComponent, canActivate: [authGuard], data: { roles: ['Recolector', 'Administrador'] } },
  {path: 'collector', component: AssignmentListComponent, canActivate: [authGuard], data: { roles: ['Recolector'] }},
  {path: 'collector/finalizadas', component: AssignmentListComponent, canActivate: [authGuard], data: { roles: ['Recolector'] }},
  {path: 'collector/planificadas', component: AssignmentListComponent, canActivate: [authGuard], data: { roles: ['Recolector'] }},
  {path: 'collector/en-curso', component: CurrentCollectionComponent, canActivate: [authGuard], data: { roles: ['Recolector'] }},
  {path: 'reports', component: ReportsComponent, canActivate: [authGuard], data: { roles: ['Administrador'] }},
  {path: 'homepage', component: HomepageComponent},
  {path: 'news', component: NewsPanelComponent, canActivate: [authGuard], data: { roles: ['Administrador'] }},
  {path: 'containers', component: ContainerComponent, canActivate: [authGuard], data: { roles: ['Administrador'] }},
  {path: 'routes', component: RoutesComponent, canActivate: [authGuard], data: { roles: ['Administrador'] }},
  {path: 'vehicle-centers', component: VehicleCentersComponent, canActivate: [authGuard], data: { roles: ['Administrador'] }},
  {path: 'waste-centers', component: WasteCentersComponent, canActivate: [authGuard], data: { roles: ['Administrador'] }},
  {path: 'recolections', component: RecolectionsComponent, canActivate: [authGuard], data: { roles: ['Administrador'] }},
  {path: '', redirectTo: 'news', pathMatch: 'full'},
  {path: '**', redirectTo: 'news'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
