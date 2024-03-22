import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {

  constructor(private el: ElementRef) {
    console.log("in directive constructor")
    this.el.nativeElement.style.backgroundColor = 'yellow'
  }

}
