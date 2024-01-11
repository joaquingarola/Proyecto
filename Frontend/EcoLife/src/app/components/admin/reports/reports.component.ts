import { Component } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {
  zones: string[] = ['Zona A', 'Zona B', 'Zona C'];
  selectedZone: string = '';
  dateDesde: Date;
  dateHasta: Date;
  showResults: boolean = false;
  collectedContainers: string[] = [];
  filteredData: any[] = [];

  drivers: string[] = ['Conductor 1', 'Conductor 2', 'Conductor 3'];
  selectedDriver: string = '';
  dateDriverDesde: Date;
  dateDriverHasta: Date;
  showDriverResults: boolean = false;
  driverResults: any[] = [];

  selectedVehicle: string = '';
  vehicles: string[] = ['Vehículo 1', 'Vehículo 2', 'Vehículo 3'];

  generateReport() {
    this.filteredData = [
      { fechaDesde: this.dateDesde, fechaHasta: this.dateHasta, cantidadContenedores: 20 },
      { fechaDesde: new Date('2024-01-15'), fechaHasta: new Date('2024-01-20'), cantidadContenedores: 15 },
    ];

    this.showResults = true;
  }

  generateDriverReport() {
    this.driverResults = [
      { conductor: this.selectedDriver, vehiculo: this.selectedVehicle, cantidadViajes: 10 },
      { conductor: this.selectedDriver, vehiculo: this.selectedVehicle, cantidadViajes: 17 },
    ];

    this.showDriverResults = true;
  }
}
