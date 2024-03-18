import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SupabaseService } from '../services/superbase.service';
import { CardComponent } from '../card/card.component';
import { Router } from '@angular/router';

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
    private supabase: SupabaseService,
    private route: Router
  ) {

  }

  async handleSignup() {
    try {
      this.loading = true
      await this.supabase.signUpNewUser({
        email: this.signupForm.value.emailFormControl!,
        password: this.signupForm.value.passwordFromControl!
      })
    } catch (error) {
      console.log(error)
    } finally {
      this.loading = false
    }
  }
  handleNavigateSignin() {
    this.route.navigate(['/signin'])
  }
}
