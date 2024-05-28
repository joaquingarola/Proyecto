import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { ModalConfirmationService, RecolectionService, SnackbarNotificationService } from '../../../services';
import { ConfirmationModalData, NewRecolectionModel, RecolectionModel, RecolectionView, SnackbarType } from '../../../models';
import { MatDialog } from '@angular/material/dialog';
import { ViewRecolectionComponent } from './view-recolection/view-recolection.component';
import { PlanifyRecolectionComponent } from '../routes/planify-recolection/planify-recolection.component';

@Component({
  selector: 'app-recolections',
  templateUrl: './recolections.component.html',
  styleUrl: './recolections.component.scss'
})
export class RecolectionsComponent {
  public recolections: MatTableDataSource<RecolectionModel>
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public displayedColumns = ["description","date","status","vehicle","vehicleCenter","wasteCenter","employee","options"];
  private confirmationData: ConfirmationModalData = {
    message: 'Estás seguro de eliminar esta recolección?',
    confirmCaption: 'Eliminar',
    cancelCaption: 'Cancelar'
  }

  constructor(
    private dialog: MatDialog,
    private recolectionService: RecolectionService,
    private modalConfirmationService: ModalConfirmationService,
    private snackbarNotificationService: SnackbarNotificationService) { }

  ngOnInit(): void {
    this.listRecolections();
  }

  private initialize(): void{
    this.recolections.paginator = this.paginator;
    this.recolections.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.recolections.filter = filterValue.trim().toLowerCase();

    if (this.recolections.paginator) {
      this.recolections.paginator.firstPage();
    }
  }

  private listRecolections(): void { 
    this.recolectionService.getAll()
      .subscribe(
        (response) => {
          this.recolections = new MatTableDataSource(response);
          this.initialize();
        });
  }

  public deleteRecolection(id: number): void {
    this.modalConfirmationService.open(this.confirmationData)
      .subscribe(response => {
        if(response){
          this.recolectionService.delete(id)
            .subscribe({
              next: () => {
                this.snackbarNotificationService.open({ text: 'Recolección eliminada con éxito.', type: SnackbarType.Success });
                this.listRecolections();
              },
              error: () => {
                this.snackbarNotificationService.open({ text: 'Ocurrió un error al intentar eliminar la recolección.', type: SnackbarType.Error });
              }
            })
          }
      });
  }

  public view(recolection: RecolectionModel): void {
    const data: RecolectionView = { vehicleCenter: recolection.vehicleCenter, wasteCenter: recolection.wasteCenter, routeId: recolection.routeId };
    this.dialog.open(ViewRecolectionComponent, { data } );
  }

  public editRoute(recolection: RecolectionModel): void {
    const data: NewRecolectionModel = { routeId: recolection.routeId, recolection: recolection };
    const dialogRef = this.dialog.open(PlanifyRecolectionComponent, { data });

    dialogRef.afterClosed()
      .subscribe((res: boolean) => {
        if(res) {
          this.listRecolections();
          this.snackbarNotificationService.open({ text: 'Recolección actualizada con éxito.', type: SnackbarType.Success });
        }
      });
  }
}
