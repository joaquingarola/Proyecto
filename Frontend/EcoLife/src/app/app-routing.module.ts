import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehiclesComponent } from './components/admin/vehicles/vehicles.component';
import { MaintenanceComponent } from './components/admin/maintenance/maintenance.component';
import { EmployeeComponent } from './components/admin/employee/employee.component';
import { LoginComponent } from './components/shared/login/login.component';
import { authGuard } from './guards/auth.guard';
import { FirstEntryComponent } from './components/shared/login/first-entry/first-entry.component';
import { StartingPageComponent } from './components/collector/starting-page/starting-page.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NewsPanelComponent } from './components/admin/news-panel/news-panel.component';
import { ReportsComponent } from './components/admin/reports/reports.component';
import { ContainerComponent } from './components/admin/container/container.component';
import { RoutesComponent } from './components/admin/routes/routes.component';
import { VehicleCentersComponent } from './components/admin/vehicle-centers/vehicle-centers.component';
import { WasteCentersComponent } from './components/admin/waste-centers/waste-centers.component';
import { RecolectionsComponent } from './components/admin/recolections/recolections.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'vehicles', component: VehiclesComponent, canActivate: [authGuard]},
  {path: 'maintenances', component: MaintenanceComponent, canActivate: [authGuard]}, 
  {path: 'employees', component: EmployeeComponent, canActivate: [authGuard] },
  {path: 'first-entry', component: FirstEntryComponent, canActivate: [authGuard] },
  {path: 'collector', component: StartingPageComponent},
  {path: 'reports', component: ReportsComponent},
  {path: 'homepage', component: HomepageComponent},
  {path: 'news', component: NewsPanelComponent, canActivate: [authGuard]},
  {path: 'containers', component: ContainerComponent, canActivate: [authGuard]},
  {path: 'routes', component: RoutesComponent, canActivate: [authGuard]},
  {path: 'vehicle-centers', component: VehicleCentersComponent, canActivate: [authGuard]},
  {path: 'waste-centers', component: WasteCentersComponent, canActivate: [authGuard]},
  {path: 'recolections', component: RecolectionsComponent, canActivate: [authGuard]},
  {path: '', redirectTo: 'news', pathMatch: 'full'},
  {path: '**', redirectTo: 'news'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
