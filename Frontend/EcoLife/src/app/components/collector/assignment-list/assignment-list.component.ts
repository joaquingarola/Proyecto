import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { ModalConfirmationService, RecolectionService, SnackbarNotificationService, StorageService } from '../../../services';
import { ConfirmationModalData, EmployeeModel, RecolectionModel, SnackbarType } from '../../../models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-assignment-list',
  templateUrl: './assignment-list.component.html',
  styleUrl: './assignment-list.component.scss'
})
export class AssignmentListComponent {
  recolections: MatTableDataSource<RecolectionModel> = new MatTableDataSource();
  type: string = 'Hoy';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ["description","date","status","vehicle","vehicleCenter","wasteCenter","options"];
  inProgressRecolection: boolean;
  user: EmployeeModel;
  isLoading: boolean;

  constructor(
    private recolectionService: RecolectionService,
    private route: ActivatedRoute,
    private modalConfirmationService: ModalConfirmationService,
    private snackbarNotificationService: SnackbarNotificationService,
    private router: Router,
    private storageService: StorageService) { }

  ngOnInit(): void {
    this.user = this.storageService.getUser();
    this.recolectionService.validateInProgressRecolection(this.user.id!).subscribe(res => {
      this.inProgressRecolection = res;
    })
    this.route.url.subscribe(url => {
      if(url.length > 1 && url[1].path === 'finalizadas') {
        this.type = 'Finalizada';
        this.displayedColumns = ["description","date","status","vehicle","vehicleCenter","wasteCenter"];
      }

      if(url.length > 1 && url[1].path === 'planificadas') {
        this.type = 'Planificada';
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
    this.isLoading = true;
    const user = this.storageService.getUser();
    this.recolectionService.getByEmployeeId(user.id!, this.type)
      .subscribe(
        (response) => {
          this.recolections = new MatTableDataSource(response);
          this.initialize();
          this.isLoading = false;
        });
  }

  public startRecolection(recolection: RecolectionModel): void {
    const confirmationData: ConfirmationModalData = {
      message: `¿Estás seguro de iniciar la recolección ${recolection.description}?`,
      confirmCaption: 'Comenzar',
      cancelCaption: 'Cancelar'
    }
    this.modalConfirmationService.open(confirmationData)
      .subscribe(response => {
        if(response){
          this.recolectionService.startRecolection(recolection.id!)
            .subscribe({
              next: () => {
                this.router.navigate(['/collector/en-curso']);
              },
              error: () => {
                this.snackbarNotificationService.open({ text: 'Ocurrió un error al intentar iniciar la recolección.', type: SnackbarType.Error });
              }
            })
          }
      });
  }

  public view(): void {
    this.router.navigate(['/collector/en-curso']);
  }

  isInitDisabled(recolection: RecolectionModel): boolean {
    if(this.inProgressRecolection) {
      return true;
    }

    if(recolection.status != 'Planificada') {
      return true;
    }

    if(this.stripTime(new Date(recolection.estimatedStartDate!)) <= this.stripTime(new Date())) {
      return false;
    }

    return true;
  }

  stripTime(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }
}
