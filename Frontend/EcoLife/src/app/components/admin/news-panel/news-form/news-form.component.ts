import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewsService } from '../../../../services';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NewModel } from '../../../../models';

@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.scss']
})
export class NewsFormComponent {
  @Output() coorectlySaved = new EventEmitter<boolean>();
  public error =  "";
  public newsForm: FormGroup;
  public isLoading = false;

  constructor(
    private fb: FormBuilder,
    private newService: NewsService,
    private _dialogRef: MatDialogRef<NewsFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NewModel
  ) { }

  ngOnInit(): void {
    this.newsForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
    this.newsForm.patchValue(this.data);
  }

  onFormSubmit(): void {
    if (this.newsForm.valid) {
      this.isLoading = true;
      if (this.data) {
        this.newService
          .updateNew(this.data.id!, this.newsForm.value, this.data.date)
          .subscribe({
            next: () => this._dialogRef.close(true),
            error: () => {
              this.error = 'Ocurrió un error. Por favor intentelo más tarde.';
            },
          }).add(() => this.isLoading = false);
      } else {
        this.newService.addNews(this.newsForm.value).subscribe({
          next: () => this._dialogRef.close(true),
          error: () => {
            this.error = 'Ocurrió un error. Por favor intentelo más tarde.';
          },
        }).add(() => this.isLoading = false);
      }
    }
  };
}
