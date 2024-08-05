import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel, UserResponseModel } from '../../models';
import { environment } from 'src/app/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = `${environment.apiUrl}api/auth`;

  constructor(private http: HttpClient) { }

  login(login: LoginModel): Observable<UserResponseModel> {
    return this.http.post<UserResponseModel>(`${this.API_URL}/login`, login);
  }

  resetPassword(email: string): Observable<Object> {
    return this.http.post(`${this.API_URL}/reset-password`, email);
  }
}
