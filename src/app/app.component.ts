import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SupabaseService } from './share/services/supabase/superbase.service';
import { AccountComponent } from './share/components/account/account.component';
import { ToastComponent } from '@share/components/toast/toast.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AccountComponent, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'voting-app';
  isAdmin = true;

  session = this.supabase.session

  constructor(private readonly supabase: SupabaseService) { }

  ngOnInit() {
    this.supabase.authChanges((_, session) => (this.session = session))
  }
}
