import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { ZoneModel, ConfirmationModalData } from '../../models';
import { ZoneService, ModalConfirmationService } from '../../services';
import { ZonesFormModalComponent } from './zones-form-modal/zones-form-modal.component';

@Component({
  selector: 'app-zones',
  templateUrl: './zones.component.html',
  styleUrls: ['./zones.component.scss']
})
export class ZonesComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public displayedColumns : string[] = ["description", "maximumHours", "options"];
  public zones: MatTableDataSource<ZoneModel>;
  private confirmationData: ConfirmationModalData = {
    message: 'Estás seguro de eliminar esta zona?',
    confirmCaption: 'Eliminar',
    cancelCaption: 'Cancelar'
  }

  constructor(
    private zoneService: ZoneService, 
    private modalConfirmationService: ModalConfirmationService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.listZones();
  }

  private initialize(): void{
    this.zones.paginator = this.paginator;
    this.zones.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.zones.filter = filterValue.trim().toLowerCase();

    if (this.zones.paginator) {
      this.zones.paginator.firstPage();
    }
  }

  private listZones(): void { 
    this.zoneService.getAll()
    .subscribe(
      (response) => {
        this.zones = new MatTableDataSource(response);
        this.initialize();
      });
  }

  public deleteZone(id: number): void {
    this.modalConfirmationService.open(this.confirmationData)
      .subscribe(response => {
        if(response){
          this.zoneService.deleteZone(id)
            .subscribe(res => this.listZones())
        }
      });
  }

  public editZone(data: ZoneModel): void {
    const dialogRef = this.dialog.open(ZonesFormModalComponent, { data });

    dialogRef.afterClosed().subscribe({
      next: () => this.listZones()
    });
  }

  public addZone(): void {
    const dialogRef = this.dialog.open(ZonesFormModalComponent);
    dialogRef.afterClosed().subscribe({
      next: () => this.listZones()
    });
  }
}
