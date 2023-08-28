import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [],
  imports: [
    MatSnackBarModule
  ],
  exports:[
    MatSnackBarModule,
  ]   
    
})
export class SnackBarModule { }
