import { Component, OnInit } from '@angular/core';
import { ModalConfirmationService, NewsService, SnackbarNotificationService } from '../../../services';
import { ConfirmationModalData, ItemListModel, NewModel, SnackbarType } from '../../../models';
import { MatDialog } from '@angular/material/dialog';
import { NewsFormComponent } from './news-form/news-form.component';

@Component({
  selector: 'app-news-panel',
  templateUrl: './news-panel.component.html',
  styleUrls: ['./news-panel.component.scss']
})
export class NewsPanelComponent implements OnInit {
  itemList: ItemListModel[];
  newList: NewModel[];

  private confirmationData: ConfirmationModalData = {
    message: 'Estás seguro de eliminar esta noticia?',
    confirmCaption: 'Si',
    cancelCaption: 'No'
  }

  constructor(
    private newsService: NewsService,
    private modalConfirmationService: ModalConfirmationService,
    private snackbarNotificationService: SnackbarNotificationService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.listNews();
  }

  private listNews(): void { 
    this.newsService.getAll()
    .subscribe(
      (response) => {
        this.newList = response;
        this.itemList = response.map(x => { return {id: x.id, title: x.title, date: x.date, description: x.description} });
      });
  }

  public deleteNew(id: number): void {
    this.modalConfirmationService.open(this.confirmationData)
      .subscribe(response => {
        if(response){
          this.newsService.deleteNew(id)
            .subscribe({
              next: () => {
                this.listNews();
                this.snackbarNotificationService.open({ text: 'Novedad eliminada con éxito.', type: SnackbarType.Success });
              },
              error: () => {
                this.snackbarNotificationService.open({ text: 'Ocurrió un error al intentar eliminar la novedad.', type: SnackbarType.Error });
              }
            })
        }
    });
  }

  public editNew(id: number): void {
    const data = this.newList.find(x => x.id == id);
    const dialogRef = this.dialog.open(NewsFormComponent, { data });

    dialogRef.afterClosed()
      .subscribe((res: boolean) => {
        if(res) {
          this.listNews();
          this.snackbarNotificationService.open({ text: 'Novedad actualizada con éxito.', type: SnackbarType.Success });
        }
      });
  }

  public addNew(): void {
    const dialogRef = this.dialog.open(NewsFormComponent);
    dialogRef.afterClosed()
      .subscribe((res: boolean) => {
        if(res) {
          this.listNews();
          this.snackbarNotificationService.open({ text: 'Novedad agregada con éxito.', type: SnackbarType.Success });
        }
      });
  }
}
