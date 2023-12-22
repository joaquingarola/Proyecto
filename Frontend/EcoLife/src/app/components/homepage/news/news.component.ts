import { Component } from '@angular/core';
import { NewsService } from '../../../services';
import { NewModel } from '../../../models';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent {
  public newsList: NewModel[];
  
  constructor(
    private newsService: NewsService
  ) { }

  ngOnInit(): void {
    this.listNews();
  }

  private listNews(): void { 
    this.newsService.getAll()
    .subscribe(
      (response) => {
        this.newsList = response;
      });
  }
}
