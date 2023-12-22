import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewModel } from '../../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private readonly API_URL = 'https://localhost:7202/api/news';

  constructor(private http: HttpClient) { }

  public getAll(): Observable<NewModel[]> {
    return this.http.get<NewModel[]>(`${this.API_URL}`);
  }

  public addNews(news: NewModel): Observable<Object> {
    return this.http.post(`${this.API_URL}`, news);
  }

  public deleteNew(id: number): Observable<Object> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }

  public updateNew(id: number, news: NewModel, date: Date): Observable<Object> {
    return this.http.put(`${this.API_URL}`, { id: id, ...news, date: date });
  }
}
