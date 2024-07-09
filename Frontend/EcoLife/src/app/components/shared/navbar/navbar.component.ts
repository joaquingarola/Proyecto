import { Component } from '@angular/core';
import { StorageService } from '../../../services';
import { MenuItem } from 'primeng/api';
import { EmployeeModel } from '../../../models';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  items: MenuItem[] = [];

  itemsAdmin: MenuItem[] = [
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

  itemsRecollector: MenuItem[] = [
    {
      label: 'Recolecciones hoy',
      routerLink: '/collector'
    },
  ];
  jwtHelper = new JwtHelperService();
  user: EmployeeModel;
  rol: string;
  adminFileUrl: string = 'assets/admin_guide.pdf';

  constructor(private storageService: StorageService) { }

  ngOnInit() {
    this.rol = this.jwtHelper.decodeToken(this.storageService.getToken()!)['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    this.user = this.storageService.getUser();

    this.items = this.rol === 'Administrador' ? this.itemsAdmin : this.itemsRecollector;
  }

  logOut(): void{
    this.storageService.logOut();
  }

  downloadUserGuide(): void {
    const link = document.createElement('a');
    link.href = this.adminFileUrl;
    link.download = 'Manual de usuario (Admin).pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
