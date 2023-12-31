import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SettingsService, StorageService } from '../../../../services';
import { HttpErrorResponse } from '@angular/common/http';

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
          next: () => {
              this.router.navigate(['/']);
          },
          error: (response: HttpErrorResponse) => {
            this.error = response.error;
          }
        }).add(() => this.isLoading = false);
    }
  }

  public validatePassword(): boolean {
    return this.firstEntryForm.value.password === this.firstEntryForm.value.repeatedPassword;
  }
}
