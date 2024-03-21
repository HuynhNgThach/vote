import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SupabaseService } from '@share/services';
import { CardComponent } from '@share/components';
import { Router } from '@angular/router';


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
