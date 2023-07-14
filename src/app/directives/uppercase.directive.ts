import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appUppercase]',
})
export class UppercaseDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input')
  onInput(): void {
    const value: string = this.el.nativeElement.value;
    this.el.nativeElement.value = value.toUpperCase();
  }
}
