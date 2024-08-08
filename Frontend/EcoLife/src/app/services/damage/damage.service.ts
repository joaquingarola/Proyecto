import { Component, Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { DamageStatsModel } from '../../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DamageService {
  private readonly API_URL = `${environment.apiUrl}api/damages`;

  constructor(private http: HttpClient) { }

  public getByType(type: string): Observable<DamageStatsModel> {
    return this.http.get<DamageStatsModel>(`${this.API_URL}/${type}`);
  }
}
