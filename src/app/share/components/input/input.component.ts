import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  @Input()
  label = ''
  @Input()
  value = ''
  @Input()
  control!: FormControl
  @Input()
  placeholder = ''
  @Input()
  hasError = false
  @Input() type = 'text'

  @Output()
  valueChange = new EventEmitter<string>()

}
