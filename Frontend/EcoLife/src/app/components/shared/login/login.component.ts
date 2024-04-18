import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, StorageService } from '../../../services';
import { UserResponseModel } from '../../../models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loginForm: FormGroup;
  public error =  "";
  public hide = true;
  public isLoading = false;

  constructor(
    private authService: AuthService, 
    private storageService: StorageService, 
    private router: Router,
    private fb : FormBuilder,) 
    { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['',[Validators.required, Validators.email]],
      password: ['',Validators.required]
    })
  }

  changeVisibility(): void {
    this.hide = !this.hide;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.login(this.loginForm.value)
        .subscribe({
          next: (data: UserResponseModel) => {
            this.storageService.saveToken(data.token);
            this.storageService.saveUser(data.employee);
            data.isFirstEntry ?
              this.router.navigate(['/first-entry']) :
              this.router.navigate(['/zones']);
          },
          error: (response: HttpErrorResponse) => {
            if(response.status) {
              this.error = response.error;
            } else {
              this.error = "Ocurrió un error. Inténtelo más tarde."
            }
          }
        }).add(() => this.isLoading = false);
    }
  }
}
