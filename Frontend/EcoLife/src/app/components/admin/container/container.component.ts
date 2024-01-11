import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ConfirmationModalData, ContainerModel, ContainerSelection } from '../../../models';
import { ContainerService, ModalConfirmationService } from '../../../services';
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
  public displayedColumns = ["capacity", "wasteType", "status", "zone", "lastEmptying", "latitude", "longitude", "options"];
  public containers: MatTableDataSource<ContainerModel>;

  private confirmationData: ConfirmationModalData = {
    message: '¿Estás seguro de eliminar a este contenedor?',
    confirmCaption: 'Si',
    cancelCaption: 'No'
  };

  constructor(
    private containerService: ContainerService,
    private modalConfirmationService: ModalConfirmationService,
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
    this.containerService.getAll()
    .subscribe(
      (response) => {
        this.containers = new MatTableDataSource(response);
        this.initialize();
      });
  }

  public deleteContainer(id: number): void {
    this.modalConfirmationService.open(this.confirmationData)
      .subscribe(response => {
        if(response){
          this.containerService.deleteContainer(id)
            .subscribe(() => this.listContainers())
        }
    });
  }

  public editContainer(cont: ContainerModel): void {
    let otherContainers = this.containers.data.filter(x => x.id != cont.id);
    let data: ContainerSelection = {selectedContainer: cont, othersContainers: otherContainers};
    const dialogRef = this.dialog.open(ContainerFormModalComponent, { data });

    dialogRef.afterClosed().subscribe({
      next: () => this.listContainers()
    });
  }

  public addContainer(): void {
    let data: ContainerSelection = { othersContainers: this.containers.data };
    const dialogRef = this.dialog.open(ContainerFormModalComponent, { data });
    dialogRef.afterClosed().subscribe({
      next: () => this.listContainers()
    });
  }
}
