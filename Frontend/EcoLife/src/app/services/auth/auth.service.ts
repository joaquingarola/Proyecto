import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel, UserResponseModel } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'https://localhost:7202/api/auth';

  constructor(private http: HttpClient) { }

  public login(login: LoginModel): Observable<UserResponseModel> {
    return this.http.post<UserResponseModel>(`${this.API_URL}/login`, login);
  }
}
