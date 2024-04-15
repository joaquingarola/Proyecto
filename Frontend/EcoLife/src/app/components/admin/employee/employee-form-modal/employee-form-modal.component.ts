import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { EmployeeService, RoleService } from '../../../../services';
import { EmployeeModel, RoleModel } from '../../../../models';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-employee-form-modal',
  templateUrl: './employee-form-modal.component.html',
  styleUrls: ['./employee-form-modal.component.scss']
})
export class EmployeeFormModalComponent implements OnInit {
  public error =  "";
  public employeeForm: FormGroup;
  public roles: RoleModel[];
  public selectedRole: number;
  public isLoading = false;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private roleService: RoleService,
    private _dialogRef: MatDialogRef<EmployeeFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EmployeeModel
  ) { }

  ngOnInit(): void {
    this.getRoles();
    this.employeeForm = this.fb.group({
      dni: ['', [Validators.required]],
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      admissionDate: ['', [Validators.required]],
      roleId: ['', [Validators.required]]
    });
    this.employeeForm.patchValue(this.data);
  }

  private getRoles(): void{
    this.roleService.getAll()
      .subscribe(
        (response) => { 
          this.roles = response;
          this.selectedRole = this.data?.roleId;
        }
      );
  }

  onFormSubmit(): void {
    if (this.employeeForm.valid) {
      this.isLoading = true;
      if (this.data) {
        this.employeeService
          .updateEmployee(this.data.id!, this.employeeForm.value)
          .subscribe({
            next: () => this._dialogRef.close(true),
            error: () => {
              this.error = 'Ocurrió un error. Por favor intentelo más tarde.';
            },
          }).add(() => this.isLoading = false);
      } else {
        this.employeeService.add(this.employeeForm.value).subscribe({
          next: () => this._dialogRef.close(true),
          error: () => {
            this.error = 'Ocurrió un error. Por favor intentelo más tarde.';
          },
        }).add(() => this.isLoading = false);
      }
    }
  };
}
