import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SupabaseService } from '../../../share/services/supabase/superbase.service';
import { CardComponent } from '../../../share/components/card/card.component';
import { Router } from '@angular/router';
import { InputComponent } from '@share/components/input/input.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CardComponent, InputComponent, CommonModule],
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  loading = false

  signupForm = new FormGroup({
    emailFormControl: new FormControl('', {
      validators: [Validators.required, Validators.email], updateOn: 'change'
    }),
    passwordFromControl: new FormControl('', {
      validators: [Validators.required, Validators.minLength(8)], updateOn: 'change'
    })
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
    this.route.navigate(['/auth/signin'])
  }
}
