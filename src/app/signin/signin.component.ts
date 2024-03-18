import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SupabaseService } from '../services/superbase.service';
import { CardComponent } from '../card/card.component';


@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, CardComponent],
  templateUrl: './signin.component.html',
})
export class SigninComponent {
  loading = false
  signinForm = new FormGroup({
    emailFormControl: new FormControl(''),
    passwordFromControl: new FormControl('')
  })

  session

  constructor(
    private supabase: SupabaseService,
  ) {
    this.session = supabase.session
  }

  async handleSignin() {
    try {
      console.log("handle signin")
      this.loading = true
      await this.supabase.signInUser({
        email: this.signinForm.value.emailFormControl!,
        password: this.signinForm.value.passwordFromControl!
      })
    } catch (error) {
      if (error instanceof Error) {
      }
    } finally {
      this.loading = false
    }
  }
}
