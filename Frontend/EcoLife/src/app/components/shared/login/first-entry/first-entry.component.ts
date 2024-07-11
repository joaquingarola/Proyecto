import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SettingsService, StorageService } from '../../../../services';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangePasswordResponseModel } from '../../../../models/change-password-response-model';

@Component({
  selector: 'app-first-entry',
  templateUrl: './first-entry.component.html',
  styleUrls: ['./first-entry.component.scss']
})
export class FirstEntryComponent {
  public firstEntryForm: FormGroup;
  public error =  "";
  public hidePassword = true;
  public hideRepeatedPassword = true;
  public isLoading = false;

  constructor(
    private router: Router,
    private fb : FormBuilder,
    private settingsService: SettingsService,
    private storageService: StorageService) 
    { }

  ngOnInit() {
    this.firstEntryForm = this.fb.group({
      password: ['', [ Validators.required, Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/) ]],
      repeatedPassword: ['', Validators.required]
    })
  }

  changeVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  changeRepeatedVisibility(): void {
    this.hideRepeatedPassword = !this.hideRepeatedPassword;
  }

  onSubmit(): void {
    if(!this.validatePassword()){
      this.error = "Las contraseñas no coinciden";
      return;
    }
    if (this.firstEntryForm.valid) {
      const user = this.storageService.getUser();
      this.isLoading = true;
      this.settingsService.firstEntry(this.firstEntryForm.value.password, user)
        .subscribe({
          next: (response: ChangePasswordResponseModel) => {
              if (response.success) {
                this.router.navigate(['/']);
              } else {
                this.error = response.message!;
              }
          },
          error: () => {
            this.error = 'Ocurrió un error. Por favor intentelo más tarde.';
          }
        }).add(() => this.isLoading = false);
    }
  }

  public validatePassword(): boolean {
    return this.firstEntryForm.value.password === this.firstEntryForm.value.repeatedPassword;
  }
}
