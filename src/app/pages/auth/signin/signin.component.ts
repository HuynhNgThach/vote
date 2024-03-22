import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SupabaseService } from '@share/services';
import { CardComponent } from '@share/components';
import { Router } from '@angular/router';
import { InputComponent } from '@share/components/input/input.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, CardComponent, InputComponent, CommonModule],
  templateUrl: './signin.component.html',
})
export class SigninComponent {
  loading = false
  signinForm = new FormGroup({
    emailFormControl: new FormControl('', { validators: [Validators.required, Validators.email], updateOn: 'change' }),
    passwordFromControl: new FormControl('', { validators: [Validators.required, Validators.minLength(8)], updateOn: 'change' }),
  })

  session

  get email() {
    return this.signinForm.get('emailFormControl')
  }
  get password() {
    return this.signinForm.get('passwordFromControl')
  }

  constructor(
    private supabase: SupabaseService,
    private router: Router
  ) {
    this.session = supabase.session
  }

  async handleSignin() {
    try {
      this.loading = true
      await this.supabase.signInUser({
        email: this.signinForm.value.emailFormControl!,
        password: this.signinForm.value.passwordFromControl!
      })
      this.router.navigate(['/'])
    } catch (error) {
      if (error instanceof Error) {
        console.log("handleSignin", error.message)
      }
    } finally {
      this.loading = false
    }
  }
  handleNavigateSignup() {
    this.router.navigate(['/auth/signup'])
  }
}
