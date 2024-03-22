import { Component, Input } from '@angular/core';
import { HighlightDirective } from '@share/directives/highlight.directive';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [HighlightDirective],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input()
  loading = false

  @Input()
  title = ''

}
