import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SupabaseService } from './services/superbase.service';
import { AccountComponent } from './account/account.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AccountComponent],
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
