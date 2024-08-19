import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appMaxLength]'
})
export class MaxLengthDirective {
  @Input() appMaxLength!: number;

  constructor(private el: ElementRef, private control: NgControl) {}

  @HostListener('input', ['$event']) onInputChange(event: any) {
    const input = event.target as HTMLInputElement;

    if (input.value.length > this.appMaxLength) {
      const trimmedValue = input.value.slice(0, this.appMaxLength);
      input.value = trimmedValue;

      this.control.control?.setValue(trimmedValue);
    }
  }
}