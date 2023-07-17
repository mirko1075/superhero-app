import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appUppercase]',
})
export class UppercaseDirective {
  lastValue = '';

  constructor(public ref: ElementRef) {}

  @HostListener('input', ['$event']) onInput($event: {
    target: {
      selectionStart: any;
      selectionEnd: any;
      value: string;
      setSelectionRange: (arg0: any, arg1: any) => void;
    };
    preventDefault: () => void;
  }) {
    const start = $event.target.selectionStart;
    const end = $event.target.selectionEnd;
    $event.target.value = $event.target.value.toUpperCase();
    $event.target.setSelectionRange(start, end);
    $event.preventDefault();

    if (
      !this.lastValue ||
      (this.lastValue &&
        $event.target.value.length > 0 &&
        this.lastValue !== $event.target.value)
    ) {
      this.lastValue = this.ref.nativeElement.value = $event.target.value;
      // Propagation
      const evt = document.createEvent('HTMLEvents');
      evt.initEvent('input', false, true);
      if (event) event.target?.dispatchEvent(evt);
    }
  }
}
