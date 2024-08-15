import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewsService, SnackbarNotificationService } from '../../../services';
import { SnackbarType } from '../../../models';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {
  contactForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private snackbarNotificationService: SnackbarNotificationService,
    private newService: NewsService
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      city: ['', [Validators.required]],
      address: ['', [Validators.required]],
      comment: ['', [Validators.required]],
    });
  }

  onFormSubmit(): void {
    if (this.contactForm.valid) {
      this.isLoading = true;
      this.newService.addCitizenComment(this.contactForm.value).subscribe({
        next: () => { 
          this.snackbarNotificationService.open({ text: 'Comentario enviado con éxito.', type: SnackbarType.Success });
          this.contactForm.reset();
          this.contactForm.markAsPristine();
          this.contactForm.markAsUntouched();
          Object.keys(this.contactForm.controls).forEach(key => {
            this.contactForm.get(key)?.setErrors(null);
          });
        },
        error: () => this.snackbarNotificationService.open({ text: 'Ocurrió un error al enviar el comentario. Intentelo de nuevo más tarde.', type: SnackbarType.Error }),
      }).add(() => this.isLoading = false);
    }
  };
}
