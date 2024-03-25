import { Component, Input } from '@angular/core';
import { IShadow, ShadowServiceService } from '@share/services/shadow/shadow-service.service';
import { toClipboard } from '@share/utils';

@Component({
  selector: 'app-shadow-control',
  standalone: true,
  imports: [],
  templateUrl: './shadow-control.component.html',
})

export class ShadowControlComponent {
  @Input() shadow: IShadow;

  constructor(private shadowService: ShadowServiceService) {
    shadowService.shadow$.subscribe(shadow => {
      this.shadow = shadow
    })
  }

  handleInputChange(type: string, event: Event) {
    const inputValue = Number((event.target as HTMLInputElement).value)
    switch (type) {
      case 'x':
        this.shadow.horizontalOffset = inputValue
        break
      case 'y':
        this.shadow.verticalOffset = inputValue
        break
      case 'blur':
        this.shadow.blur = inputValue
        break
      case 'spread':
        this.shadow.spread = inputValue
        break
      case 'radius':
        this.shadow.shapeRadius = inputValue
        break
    }
    console.log("handle input change", this.shadow)
    this.shadowService.updateShadow(this.shadow)
  }
  handleChangeColor(type: string, event: Event) {
    const inputValue = ((event.target as HTMLInputElement).value)
    switch (type) {
      case 'bg':
        this.shadow.bgColor = `${inputValue}`
        break
      case 'shadow':
        this.shadow.shadowColor = `${inputValue}`
        break
    }
    this.shadowService.updateShadow(this.shadow)
  }
  get shadowString() {
    return `box-shadow: ${this.shadow.horizontalOffset}px ${this.shadow.verticalOffset}px ${this.shadow.blur}px ${this.shadow.spread}px ${this.shadow.shadowColor}`
  }
  async copyShadow() {
    const copied = await toClipboard(this.shadowString)
    console.log("copied")
  }

}
