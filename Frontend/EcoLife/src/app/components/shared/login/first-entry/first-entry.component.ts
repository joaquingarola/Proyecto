import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, SettingsService, StorageService } from '../../../../services';
import { ChangePasswordResponseModel } from '../../../../models/change-password-response-model';
import { LoginModel, UserResponseModel } from '../../../../models';

@Component({
  selector: 'app-first-entry',
  templateUrl: './first-entry.component.html',
  styleUrls: ['./first-entry.component.scss']
})
export class FirstEntryComponent {
  firstEntryForm: FormGroup;
  error =  "";
  hidePassword = true;
  hideRepeatedPassword = true;
  isLoading = false;

  constructor(
    private router: Router,
    private fb : FormBuilder,
    private settingsService: SettingsService,
    private storageService: StorageService,
    private authService: AuthService) 
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
                this.login();
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

  private login(): void {
    const login: LoginModel = { username: this.storageService.getUser().email, password: this.firstEntryForm.value.password };
    this.authService.login(login)
        .subscribe({
          next: (data: UserResponseModel) => {
            if(data.success) {
              this.storageService.saveToken(data.token);
              this.storageService.saveUser(data.employee);

              data.employee.roleId == 1 ?
                this.router.navigate(['/news']) :
                this.router.navigate(['/collector']);

            }
          },
          error: () => {
            this.error = "Ocurrió un error. Inténtelo más tarde."
          }
        }).add(() => this.isLoading = false);
  }
}
