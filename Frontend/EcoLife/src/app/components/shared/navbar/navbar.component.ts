import { Component } from '@angular/core';
import { StorageService } from '../../../services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private storageService: StorageService) { }

  logOut(): void{
    this.storageService.logOut();
  }
}
