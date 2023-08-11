import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ZonesComponent } from './components/zones/zones.component';
import { VehiclesComponent } from './components/vehicles/vehicles.component';

const routes: Routes = [
  {path: 'zones', component: ZonesComponent},
  {path: 'vehicles', component: VehiclesComponent},
  {path: '', redirectTo: 'zones', pathMatch: 'full'},
  {path: '**', redirectTo: 'zones'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
