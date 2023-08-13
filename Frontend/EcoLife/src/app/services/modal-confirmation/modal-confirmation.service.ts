import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmationModalData } from '../../models/confirmation-modal-data';
import { ConfirmationModalComponent } from '../../components/shared/confirmation-modal/confirmation-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalConfirmationService {

  constructor(private dialog: MatDialog) { }

  open(data: ConfirmationModalData): Observable<boolean> {
    return this.dialog
      .open(ConfirmationModalComponent, { data, autoFocus: false })
      .afterClosed();
  }
}
