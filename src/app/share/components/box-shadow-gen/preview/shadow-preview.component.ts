import { Component, Input } from '@angular/core';
import { NgStyle } from '@angular/common';
import { IShadow, ShadowServiceService } from '@share/services/shadow/shadow-service.service';

@Component({
  selector: 'app-shadow-preview',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './shadow-preview.component.html',
})
export class ShadowPreviewComponent {
  shadow: IShadow;


  constructor(private shadowService: ShadowServiceService) {
    shadowService.shadow$.subscribe(shadow => {
      console.log("on subscribe")
      this.shadow = shadow
    })
  }
  get shadowString() {
    return `${this.shadow.horizontalOffset}px ${this.shadow.verticalOffset}px ${this.shadow.blur}px ${this.shadow.spread}px ${this.shadow.shadowColor}`
  }
}
