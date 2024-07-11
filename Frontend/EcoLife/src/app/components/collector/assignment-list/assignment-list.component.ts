import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

import { ModalConfirmationService, RecolectionService, SnackbarNotificationService, StorageService } from '../../../services';
import { RecolectionModel } from '../../../models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-assignment-list',
  templateUrl: './assignment-list.component.html',
  styleUrl: './assignment-list.component.scss'
})
export class AssignmentListComponent {
  public recolections: MatTableDataSource<RecolectionModel>
  public type: string = 'Hoy';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public displayedColumns = ["description","date","status","vehicle","vehicleCenter","wasteCenter","options"];

  constructor(
    private recolectionService: RecolectionService,
    private route: ActivatedRoute,
    private storageService: StorageService) { }

  ngOnInit(): void {
    this.route.url.subscribe(url => {
      if(url.length > 1 && url[1].path === 'finalizadas') {
        this.type = 'Finalizadas';
        this.displayedColumns = ["description","date","status","vehicle","vehicleCenter","wasteCenter"];
      }

      if(url.length > 1 && url[1].path === 'planificadas') {
        this.type = 'Planificadas';
      }
      
      this.listRecolections();
    });
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
    const user = this.storageService.getUser();

    this.recolectionService.getByEmployeeId(user.id!, this.type)
      .subscribe(
        (response) => {
          this.recolections = new MatTableDataSource(response);
          console.log(this.recolections);
          this.initialize();
        });
  }

  public view(recolection: RecolectionModel): void {
    console.log(recolection)
  }

  isInitDisabled(recolection: RecolectionModel): boolean {
    if(new Date(recolection.estimatedStartDate!).getDate() <= new Date().getDate()) {
      return false;
    }

    return true;
  }
}
