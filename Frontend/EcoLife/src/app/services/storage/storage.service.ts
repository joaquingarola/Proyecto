import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeModel } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private USER_KEY = 'user-key';
  private USER = 'user'

  constructor(private router: Router) { }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(this.USER_KEY);
    window.sessionStorage.setItem(this.USER_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(this.USER_KEY);
  }

  public saveUser(employee: EmployeeModel): void {
    window.sessionStorage.removeItem(this.USER);
    window.sessionStorage.setItem(this.USER, JSON.stringify(employee));
  }

  public getUser(): EmployeeModel {
    const user = window.sessionStorage.getItem(this.USER);
    return JSON.parse(user!);
  }

  public isLoggedIn(): boolean {
    const token = window.sessionStorage.getItem(this.USER_KEY);
    if (token) {
      return true;
    }
    return false;
  }

  public logOut(): void {
    window.sessionStorage.clear();
    this.router.navigate(['/homepage']);
  }
}
