import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { EmployeeModel } from '../../models';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private readonly API_URL = `${environment.apiUrl}api/settings`;

  constructor(private http: HttpClient) { }

  public firstEntry(password: string, employee: EmployeeModel){
    const changePasswordModel = { user: employee.email, newPassword: password };
    return this.http.post(`${this.API_URL}/change-password`, changePasswordModel);
  }
}
