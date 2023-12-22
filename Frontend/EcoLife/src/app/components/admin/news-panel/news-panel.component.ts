import { Component, OnInit } from '@angular/core';
import { ModalConfirmationService, NewsService } from '../../../services';
import { ConfirmationModalData, NewModel } from '../../../models';
import { MatDialog } from '@angular/material/dialog';
import { NewsFormComponent } from './news-form/news-form.component';

@Component({
  selector: 'app-news-panel',
  templateUrl: './news-panel.component.html',
  styleUrls: ['./news-panel.component.scss']
})
export class NewsPanelComponent implements OnInit {
  public newsList: NewModel[];
  private confirmationData: ConfirmationModalData = {
    message: 'Estás seguro de eliminar esta noticia?',
    confirmCaption: 'Si',
    cancelCaption: 'No'
  }

  constructor(
    private newsService: NewsService,
    private modalConfirmationService: ModalConfirmationService,
    private dialog: MatDialog
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

  public deleteNew(id: number): void {
    this.modalConfirmationService.open(this.confirmationData)
      .subscribe(response => {
        if(response){
          this.newsService.deleteNew(id)
            .subscribe(() => this.listNews())
        }
    });
  }

  public editNew(data: NewModel): void {
    const dialogRef = this.dialog.open(NewsFormComponent, { data });

    dialogRef.afterClosed().subscribe({
      next: () => this.listNews()
    });
  }

  public addNew(): void {
    const dialogRef = this.dialog.open(NewsFormComponent);
    dialogRef.afterClosed().subscribe({
      next: () => this.listNews()
    });
  }
}
