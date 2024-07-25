import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ConfirmationModalData, ContainerModel, ItemSelection, SnackbarType } from '../../../models';
import { ContainerService, ModalConfirmationService, SnackbarNotificationService } from '../../../services';
import { MatDialog } from '@angular/material/dialog';
import { ContainerFormModalComponent } from './container-form-modal/container-form-modal.component';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ["capacity", "wasteType", "status", "zone", "lastEmptying", "address", "options"];
  containers: MatTableDataSource<ContainerModel> = new MatTableDataSource();
  isLoading: boolean;

  private confirmationData: ConfirmationModalData = {
    message: '¿Estás seguro de eliminar a este contenedor?',
    confirmCaption: 'Si',
    cancelCaption: 'No'
  };

  constructor(
    private containerService: ContainerService,
    private modalConfirmationService: ModalConfirmationService,
    private snackbarNotificationService: SnackbarNotificationService,
    private dialog: MatDialog){ }
  
  ngOnInit(): void {
    this.listContainers();
  }

  private initialize(): void{
    this.containers.paginator = this.paginator;
    this.containers.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.containers.filter = filterValue.trim().toLowerCase();

    if (this.containers.paginator) {
      this.containers.paginator.firstPage();
    }
  }

  private listContainers(): void { 
    this.isLoading = true;

    this.containerService.getAll()
    .subscribe(
      (response) => {
        this.containers = new MatTableDataSource(response);
        this.initialize();
        this.isLoading = false;
      });
  }

  public deleteContainer(id: number): void {
    this.modalConfirmationService.open(this.confirmationData)
      .subscribe(response => {
        if(response){
          this.containerService.deleteContainer(id)
            .subscribe({
              next: () => {
                this.listContainers();
                this.snackbarNotificationService.open({ text: 'Contenedor eliminado con éxito.', type: SnackbarType.Success });
              },
              error: () => {
                this.snackbarNotificationService.open({ text: 'Ocurrió un error al intentar eliminar el contenedor.', type: SnackbarType.Error });
              }
            })
        }
    });
  }

  public editContainer(cont: ContainerModel): void {
    const otherContainers = this.containers.data.filter(x => x.id != cont.id);
    const data: ItemSelection<ContainerModel> = {selectedItem: cont, othersItems: otherContainers};
    const dialogRef = this.dialog.open(ContainerFormModalComponent, { data });

    dialogRef.afterClosed()
      .subscribe((res: boolean) => {
        if(res) {
          this.listContainers();
          this.snackbarNotificationService.open({ text: 'Contenedor actualizado con éxito.', type: SnackbarType.Success });
        }
      });
  }

  public addContainer(): void {
    const data: ItemSelection<ContainerModel> = { othersItems: this.containers?.data };
    const dialogRef = this.dialog.open(ContainerFormModalComponent, { data });
    dialogRef.afterClosed()
      .subscribe((res: boolean) => {
        if(res) {
          this.listContainers();
          this.snackbarNotificationService.open({ text: 'Contenedor agregado con éxito.', type: SnackbarType.Success });
        }
      });
  }
}
