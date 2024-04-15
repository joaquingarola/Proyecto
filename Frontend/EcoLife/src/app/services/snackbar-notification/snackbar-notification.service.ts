import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SnackbarModel, SnackbarType } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class SnackbarNotificationService {

  constructor(private _snackBar: MatSnackBar) { }

  public open(data: SnackbarModel): void {
    const config: MatSnackBarConfig = {
      duration: data.type == SnackbarType.Success ? 3000 : 4500,
      horizontalPosition: 'right',
      panelClass: [ data.type == SnackbarType.Success ? 'green-snackbar' : 'red-snackbar' ]
    }

    this._snackBar.open(data.text, '' , config)
  }
}
