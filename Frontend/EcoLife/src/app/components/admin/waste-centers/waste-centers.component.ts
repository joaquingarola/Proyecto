import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ConfirmationModalData, WasteCenterModel, ItemSelection } from '../../../models';
import { WasteCenterService, ModalConfirmationService } from '../../../services';
import { MatDialog } from '@angular/material/dialog';
import { WasteCenterFormModalComponent } from './waste-center-form-modal/waste-center-form-modal.component';

@Component({
  selector: 'app-waste-centers',
  templateUrl: './waste-centers.component.html',
  styleUrls: ['./waste-centers.component.scss']
})
export class WasteCentersComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public displayedColumns = ["description", "wasteType", "address", "options"];
  public wasteCenters: MatTableDataSource<WasteCenterModel>;

  private confirmationData: ConfirmationModalData = {
    message: '¿Estás seguro de eliminar a este centro de residuos?',
    confirmCaption: 'Si',
    cancelCaption: 'No'
  };

  constructor(
    private wasteCenterService: WasteCenterService,
    private modalConfirmationService: ModalConfirmationService,
    private dialog: MatDialog){ }
  
  ngOnInit(): void {
    this.listWasteCenters();
  }

  private initialize(): void{
    this.wasteCenters.paginator = this.paginator;
    this.wasteCenters.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.wasteCenters.filter = filterValue.trim().toLowerCase();

    if (this.wasteCenters.paginator) {
      this.wasteCenters.paginator.firstPage();
    }
  }

  private listWasteCenters(): void { 
    this.wasteCenterService.getAll()
    .subscribe(
      (response) => {
        this.wasteCenters = new MatTableDataSource(response);
        this.initialize();
      });
  }

  public deleteWasteCenter(id: number): void {
    this.modalConfirmationService.open(this.confirmationData)
      .subscribe(response => {
        if(response){
          this.wasteCenterService.deleteWasteCenter(id)
            .subscribe(() => this.listWasteCenters())
        }
    });
  }

  public editWasteCenter(wasteCenter: WasteCenterModel): void {
    let otherWasteCenter = this.wasteCenters.data.filter(x => x.id != wasteCenter.id);
    let data: ItemSelection<WasteCenterModel> = {selectedItem: wasteCenter, othersItems: otherWasteCenter};
    const dialogRef = this.dialog.open(WasteCenterFormModalComponent, { data });

    dialogRef.afterClosed().subscribe({
      next: () => this.listWasteCenters()
    });
  }

  public addWasteCenter(): void {
    let data: ItemSelection<WasteCenterModel> = { othersItems: this.wasteCenters.data };
    const dialogRef = this.dialog.open(WasteCenterFormModalComponent, { data });
    dialogRef.afterClosed().subscribe({
      next: () => this.listWasteCenters()
    });
  }
}
