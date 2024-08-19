import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appMaxLength]'
})
export class MaxLengthDirective {
  @Input() appMaxLength!: number;

  @HostListener('input', ['$event']) onInputChange(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.value.length > this.appMaxLength) {
      input.value = input.value.slice(0, this.appMaxLength);
    }
  }
}