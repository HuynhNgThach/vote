import { Component } from '@angular/core';
import { LocalStateComponent } from '@share/components';
import { NgStyle } from '@angular/common';
import { ShadowPreviewComponent } from '@share/components';
import { ShadowControlComponent } from '@share/components';

@Component({
  selector: 'app-state-management',
  standalone: true,
  imports: [LocalStateComponent, NgStyle, ShadowControlComponent, ShadowPreviewComponent],
  templateUrl: './state-management.component.html',
})
export class StateManagementComponent {
  bgColor = '#ff00ff'

  handleChangeBgColor(bgColor: string) {
    this.bgColor = bgColor
  }
}
