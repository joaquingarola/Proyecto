import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;
  error = "";
  isLoading = false;
  success = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb : FormBuilder) { }

  ngOnInit() {
    this.resetPasswordForm = this.fb.group({
      username: ['',[Validators.required, Validators.email]]
    })
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid) {
      this.isLoading = true;
      this.authService.resetPassword(this.resetPasswordForm.value)
        .subscribe({
          next: () => {
            this.success = true;
          },
          error: () => {
            this.error = "Ocurrió un error. Inténtelo más tarde."
          }
        }).add(() => this.isLoading = false);
    }
  }

  login(): void{
    this.router.navigate(['/login']);
  }
}
