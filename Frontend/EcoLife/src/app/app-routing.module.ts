import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ZonesComponent } from './components/admin/zones/zones.component';
import { VehiclesComponent } from './components/admin/vehicles/vehicles.component';
import { MaintenanceComponent } from './components/admin/maintenance/maintenance.component';
import { EmployeeComponent } from './components/admin/employee/employee.component';
import { LoginComponent } from './components/shared/login/login.component';
import { authGuard } from './guards/auth.guard';
import { FirstEntryComponent } from './components/shared/login/first-entry/first-entry.component';
import { StartingPageComponent } from './components/collector/starting-page/starting-page.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AboutUsComponent } from './components/homepage/about-us/about-us.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'zones', component: ZonesComponent, canActivate: [authGuard]},
  {path: 'vehicles', component: VehiclesComponent, canActivate: [authGuard]},
  {path: 'maintenances', component: MaintenanceComponent, canActivate: [authGuard]}, 
  {path: 'employees', component: EmployeeComponent/* , canActivate: [authGuard] */},
  {path: 'first-entry', component: FirstEntryComponent, canActivate: [authGuard]},
  {path: 'collector', component: StartingPageComponent},
  {path: 'homepage', component: HomepageComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: '', redirectTo: 'zones', pathMatch: 'full'},
  {path: '**', redirectTo: 'zones'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
