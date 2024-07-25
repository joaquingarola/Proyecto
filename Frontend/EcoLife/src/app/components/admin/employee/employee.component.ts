import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { ConfirmationModalData, EmployeeModel, SnackbarType } from '../../../models';
import { EmployeeService, ModalConfirmationService, SnackbarNotificationService } from '../../../services';
import { EmployeeFormModalComponent } from './employee-form-modal/employee-form-modal.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ["dni", "name", "surName", "email", "phoneNumber", "birthdate", "admissionDate", "role", "options"];
  employees: MatTableDataSource<EmployeeModel> = new MatTableDataSource();
  isLoading: boolean;

  private confirmationData: ConfirmationModalData = {
    message: 'Estás seguro de eliminar a este empleado?',
    confirmCaption: 'Si',
    cancelCaption: 'No'
  }

  constructor(
    private employeeService: EmployeeService,
    private modalConfirmationService: ModalConfirmationService,
    private snackbarNotificationService: SnackbarNotificationService,
    private dialog: MatDialog){ }
  
  ngOnInit(): void {
    this.listEmployee();
  }

  private initialize(): void{
    this.employees.paginator = this.paginator;
    this.employees.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.employees.filter = filterValue.trim().toLowerCase();

    if (this.employees.paginator) {
      this.employees.paginator.firstPage();
    }
  }

  private listEmployee(): void { 
    this.isLoading = true;
    this.employeeService.getAll()
    .subscribe(
      (response) => {
        this.employees = new MatTableDataSource(response);
        this.initialize();
        this.isLoading = false;
      });
  }

  public deleteEmployee(id: number): void {
    this.modalConfirmationService.open(this.confirmationData)
      .subscribe(response => {
        if(response){
          this.employeeService.deleteEmployee(id)
            .subscribe({
              next: () => {
                this.listEmployee();
                this.snackbarNotificationService.open({ text: 'Empleado eliminado con éxito.', type: SnackbarType.Success });
              },
              error: () => {
                this.snackbarNotificationService.open({ text: 'Ocurrió un error al intentar eliminar el empleado.', type: SnackbarType.Error });
              }
            })
        }
    });
  }

  public editEmployee(data: EmployeeModel): void {
    const dialogRef = this.dialog.open(EmployeeFormModalComponent, { data });

    dialogRef.afterClosed()
      .subscribe((res: boolean) => {
        if(res) {
          this.listEmployee();
          this.snackbarNotificationService.open({ text: 'Empleado actualizado con éxito.', type: SnackbarType.Success });
        }
      });
  }

  public addEmployee(): void {
    const dialogRef = this.dialog.open(EmployeeFormModalComponent);
    dialogRef.afterClosed()
      .subscribe((res: boolean) => {
        if(res) {
          this.listEmployee();
          this.snackbarNotificationService.open({ text: 'Empleado agregado con éxito.', type: SnackbarType.Success });
        }
      });
  }
}
