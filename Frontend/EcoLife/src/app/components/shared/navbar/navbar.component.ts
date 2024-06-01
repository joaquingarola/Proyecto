import { Component } from '@angular/core';
import { StorageService } from '../../../services';
import { MenuItem } from 'primeng/api';
import { EmployeeModel } from '../../../models';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  items: MenuItem[] = [
    {
      label: 'Novedades',
      routerLink: '/news'
    },
    {
      label: 'Empleados',
      routerLink: '/employees'
    },
    {
      label: 'Vehículos',
      items: [
        {
          label: 'Listado de vehículos',
          routerLink: '/vehicles'
        },
        {
          label: 'Mantenimientos',
          routerLink: '/maintenances'
        }
      ]
    },
    {
      label: 'Centros',
      items: [
        {
          label: 'Centros de vehículos',
          routerLink: '/vehicle-centers'
        },
        {
          label: 'Centros de residuos',
          routerLink: '/waste-centers'
        }
      ]
    },
    {
      label: 'Recolecciones',
      items: [
        {
          label: 'Contenedores',
          routerLink: '/containers'
        },
        {
          label: 'Rutas',
          routerLink: '/routes'
        },
        {
          label: 'Listado recolecciones',
          routerLink: '/recolections'
        }
      ]
    }
  ];
  user: EmployeeModel;

  constructor(private storageService: StorageService) { }

  ngOnInit() {
    this.user = this.storageService.getUser();
  }

  logOut(): void{
    this.storageService.logOut();
  }
}
