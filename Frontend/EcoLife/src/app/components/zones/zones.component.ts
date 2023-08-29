import { Component, ViewChild } from '@angular/core';
import { ZoneModel } from '../../models/zone-model';
import { ZoneService } from '../../services/zone/zone.service';
import { ModalConfirmationService } from '../../services/modal-confirmation/modal-confirmation.service';
import { ConfirmationModalData } from '../../models/confirmation-modal-data';
import { MatDialog } from '@angular/material/dialog';
import { ZonesFormModalComponent } from './zones-form-modal/zones-form-modal.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-zones',
  templateUrl: './zones.component.html',
  styleUrls: ['./zones.component.scss']
})
export class ZonesComponent {
  public zones: ZoneModel[];
  public displayedColumns : string[] = ["description", "maximumHours", "options"];
  public Zones: MatTableDataSource<ZoneModel>;
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

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.listZones();
  }

  ngAfterViewInit() {
    this.Zones = new MatTableDataSource(this.zones)
    this.Zones.paginator = this.paginator;
    this.Zones.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = 'Items por pagina';

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.Zones.filter = filterValue.trim().toLowerCase();

    if (this.Zones.paginator) {
      this.Zones.paginator.firstPage();
    }
  }

  private listZones(): void { 
    this.zoneService.getAll()
    .subscribe(
      (response) => {
        this.zones = response;
        this.Zones.data = this.zones;
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
      next: (res) => this.listZones()
    });
  }

  public addZone(): void {
    const dialogRef = this.dialog.open(ZonesFormModalComponent);
    dialogRef.afterClosed().subscribe({
      next: (res) => this.listZones()
    });
  }
}
