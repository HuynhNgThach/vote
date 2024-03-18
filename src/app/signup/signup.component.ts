import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SupabaseService } from '../services/superbase.service';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CardComponent],
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  loading = false

  signupForm = new FormGroup({
    emailFormControl: new FormControl(''),
    passwordFromControl: new FormControl('')
  })


  constructor(
    private supabase: SupabaseService
  ) {

  }

  handleSignup() {
    try {
      this.loading = true
      this.supabase.signUpNewUser({
        email: this.signupForm.value.emailFormControl!,
        password: this.signupForm.value.passwordFromControl!
      })
    } catch (error) {
      console.log(error)
    } finally {
      this.loading = false
    }
  }
}
