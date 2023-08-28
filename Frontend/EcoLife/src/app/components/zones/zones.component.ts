import { Component } from '@angular/core';
import { ZoneModel } from '../../models/zone-model';
import { ZoneService } from '../../services/zone/zone.service';
import { ModalConfirmationService } from '../../services/modal-confirmation/modal-confirmation.service';
import { ConfirmationModalData } from '../../models/confirmation-modal-data';
import { MatDialog } from '@angular/material/dialog';
import { ZonesFormModalComponent } from './zones-form-modal/zones-form-modal.component';

@Component({
  selector: 'app-zones',
  templateUrl: './zones.component.html',
  styleUrls: ['./zones.component.scss']
})
export class ZonesComponent {
  public zones: ZoneModel[];
  public displayedColumns : string[] = ["description", "maximumHours", "options"];
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

  private listZones(): void { 
    this.zoneService.getAll()
    .subscribe(
      (response) => {
        this.zones = response;
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
