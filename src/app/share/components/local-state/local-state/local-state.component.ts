import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-local-state',
  standalone: true,
  imports: [],
  templateUrl: './local-state.component.html',
  styleUrl: './local-state.component.scss'
})
export class LocalStateComponent {
  @Input() color: string;
  @Output() updateColor = new EventEmitter<string>()

  changeColor(color: Event) {
    const inputEle = color.target as HTMLInputElement
    this.color = inputEle.value
    this.updateColor.emit(inputEle.value)
  }
}
