import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarNotificationService {
  public config: MatSnackBarConfig = {
    duration: 4000,
    horizontalPosition: 'right'
  }

  constructor(private _snackBar: MatSnackBar) { }

  public open(data: string): void {
    this._snackBar.open(data, '' , this.config)
  }
}
