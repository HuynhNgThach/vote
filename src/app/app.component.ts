import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AccountComponent } from './share/components/account/account.component';
import { ToastComponent } from '@share/components/toast/toast.component';
import { register } from 'swiper/element/bundle';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AccountComponent, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'voting-app';
  isAdmin = true;
  constructor() {
    register()
  }
}
