import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ZonesComponent } from './components/zones/zones.component';
import { VehiclesComponent } from './components/vehicles/vehicles.component';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';
import { EmployeeComponent } from './components/employee/employee.component';

const routes: Routes = [
  {path: 'zones', component: ZonesComponent},
  {path: 'vehicles', component: VehiclesComponent},
  {path: 'maintenances', component: MaintenanceComponent}, 
  {path: 'employees', component: EmployeeComponent},
  {path: '', redirectTo: 'zones', pathMatch: 'full'},
  {path: '**', redirectTo: 'zones'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
