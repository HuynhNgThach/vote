import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {
  @Input() color: string
  constructor(private el: ElementRef) {
    this.el.nativeElement.style.transition = "all 0.5s"
  }
  @HostListener('mouseenter') onMouseEnter() {
    this.highLight(this.color)
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.highLight('')
  }

  highLight(color: string) {
    this.el.nativeElement.style.backgroundColor = color
  }
}
