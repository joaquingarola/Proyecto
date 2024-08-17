import { Component } from '@angular/core';
import { CitizenCommentModel, ConfirmationModalData, ItemListModel, SnackbarType } from '../../../models';
import { ModalConfirmationService, NewsService, SnackbarNotificationService } from '../../../services';

@Component({
  selector: 'app-citizen-comments',
  templateUrl: './citizen-comments.component.html',
  styleUrl: './citizen-comments.component.scss'
})
export class CitizenCommentsComponent {
  itemList: ItemListModel[];
  commentList: CitizenCommentModel[];

  private confirmationData: ConfirmationModalData = {
    message: '¿Estás seguro de eliminar esta comentario?',
    confirmCaption: 'Si',
    cancelCaption: 'No'
  }

  constructor(
    private newsService: NewsService,
    private modalConfirmationService: ModalConfirmationService,
    private snackbarNotificationService: SnackbarNotificationService
  ) { }

  ngOnInit(): void {
    this.listComments();
  }

  private listComments(): void { 
    this.newsService.getAllComments()
    .subscribe(
      (response) => {
        this.commentList = response;
        this.itemList = response.map(x => { 
          return {
            id: x.id, 
            title: `${x.address} - ${x.city}`, 
            subtitle: `${x.name} - ${x.email}`, 
            date: x.date!, 
            description: x.comment
          }
        });
      });
  }

  public deleteComment(id: number): void {
    this.modalConfirmationService.open(this.confirmationData)
      .subscribe(response => {
        if(response){
          this.newsService.deleteComment(id)
            .subscribe({
              next: () => {
                this.listComments();
                this.snackbarNotificationService.open({ text: 'Reclamo eliminado con éxito.', type: SnackbarType.Success });
              },
              error: () => {
                this.snackbarNotificationService.open({ text: 'Ocurrió un error al intentar eliminar el reclamo.', type: SnackbarType.Error });
              }
            })
        }
    });
  }
}
