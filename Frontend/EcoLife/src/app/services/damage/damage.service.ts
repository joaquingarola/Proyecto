import { Component, Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { StatsModel } from '../../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DamageService {
  private readonly API_URL = `${environment.apiUrl}api/damages`;

  constructor(private http: HttpClient) { }

  public getByType(type: string): Observable<StatsModel> {
    return this.http.get<StatsModel>(`${this.API_URL}/${type}`);
  }
}
